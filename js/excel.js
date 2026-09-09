// 엑셀 파일을 읽어 현장 마스터/점검계획 데이터로 변환하고, 반대로 일정을 엑셀로 내보내는 기능
const Excel = (() => {

  // 조마다 컬럼명이 조금씩 다를 수 있어(점검일자/점검날짜/일자 등) 후보군으로 매칭한다.
  const FIELD_SYNONYMS = {
    cwsId: ['CWS공사ID', 'CWSID', 'CWS번호', '공사ID'],
    inspectionType: ['점검구분', '구분', '점검유형', '점검종류'],
    inspectionDate: ['점검일자', '점검날짜', '점검일', '방문일자', '실시일자', '일자', '날짜'],
    team: ['점검조', '담당조', '조'],
    siteName: ['공사명', '현장명', '사업명', '공사명칭'],
    address: ['현장소재지', '소재지', '주소', '현장주소'],
    workType: ['공종'],
    workDetail: ['세부공종'],
    contractDate: ['계약일자', '계약일'],
    startDate: ['금차년도착공년월일', '최초착공년월일', '착공년월일', '착공일자', '착공일'],
    endDate: ['금차년도준공예정일', '준공예정일', '준공일자', '준공일'],
    contractAmount: ['도급금액', '계약금액'],
    contractor: ['시공자', '시공사'],
    bizNo: ['사업자등록번호(시공자)', '사업자등록번호'],
    phone: ['전화번호(현장번호)', '전화번호', '현장번호', '연락처'],
    progressRate: ['공정률', '진행률'],
  };

  function excelSerialToISO(v, ctx) {
    if (v instanceof Date) {
      return v.toISOString().slice(0, 10);
    }
    if (typeof v === 'number') {
      // 그럴듯한 엑셀 날짜 일련번호 범위(대략 1990~2100년)만 날짜로 인정한다.
      if (v < 32874 || v > 73050) return null;
      const ms = Math.round((v - 25569) * 86400 * 1000);
      return new Date(ms).toISOString().slice(0, 10);
    }
    if (typeof v === 'string') {
      const s = v.trim();
      // 2026-09-08 / 2026.9.8 / 2026년 9월 8일
      let m = s.match(/^(\d{4})\s*[-./년]\s*(\d{1,2})\s*[-./월]\s*(\d{1,2})/);
      if (m) return isoDate(m[1], m[2], m[3]);
      // 9/8, 09.08, 9월 8일 (연도 없음 - 시트 이름에서 유추한 연도 사용)
      m = s.match(/^(\d{1,2})\s*[-./월]\s*(\d{1,2})\s*일?\s*$/);
      if (m && ctx && ctx.year) return isoDate(ctx.year, m[1], m[2]);
    }
    return null;
  }

  function isoDate(y, mo, d) {
    y = Number(y); mo = Number(mo); d = Number(d);
    if (!y || !mo || !d || mo < 1 || mo > 12 || d < 1 || d > 31) return null;
    return `${String(y).padStart(4, '0')}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  }

  // 시트 이름에서 "9월", "2026년" 같은 힌트를 뽑아 연도 없는 날짜를 보완한다.
  function sheetDateContext(sheetName) {
    const y = sheetName.match(/(\d{4})\s*년/);
    const m = sheetName.match(/(\d{1,2})\s*월/);
    return {
      year: y ? Number(y[1]) : new Date().getFullYear(),
      month: m ? Number(m[1]) : null,
    };
  }

  function pick(row, keys) {
    for (const k of keys) {
      if (row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== '') return row[k];
    }
    return null;
  }

  // 한글(한컴오피스)로 만든 엑셀은 sharedStrings.xml에 <mc:AlternateContent>로
  // hs: 확장 서식을 끼워 넣는데, SheetJS가 이걸 파싱하다 시트 전체를 비워버린다.
  // AlternateContent 블록만 제거하고(텍스트는 항상 그 뒤 <x:t>에 있어 안전) 다시 압축한다.
  function repairBuffer(arrayBuffer) {
    if (typeof fflate === 'undefined') return null;
    let files;
    try {
      files = fflate.unzipSync(new Uint8Array(arrayBuffer));
    } catch (e) {
      return null;
    }
    const key = Object.keys(files).find((k) => /sharedStrings\.xml$/i.test(k));
    if (!key) return null;
    const text = new TextDecoder('utf-8').decode(files[key]);
    if (!text.includes('AlternateContent')) return null;
    const fixed = text.replace(/<mc:AlternateContent[\s\S]*?<\/mc:AlternateContent>/g, '');
    files[key] = new TextEncoder().encode(fixed);
    return fflate.zipSync(files, { level: 0 });
  }

  function readWorkbook(arrayBuffer) {
    // cellDates:true는 일부 현장 엑셀(스타일 테이블이 손상된 파일)에서 시트 파싱을
    // 통째로 실패시키는 경우가 있어 사용하지 않는다 - 날짜는 엑셀 일련번호로 받아
    // excelSerialToISO()에서 직접 변환한다.
    const wb = XLSX.read(arrayBuffer, { type: 'array' });
    const broken = wb.SheetNames.length > 0 && wb.SheetNames.some((n) => !wb.Sheets[n]);
    if (!broken) return wb;
    const repaired = repairBuffer(arrayBuffer);
    if (!repaired) return wb;
    try {
      return XLSX.read(repaired, { type: 'array' });
    } catch (e) {
      return wb;
    }
  }

  // 헤더 셀에 줄바꿈·공백이 섞여 있는 경우가 많아 공백/개행을 제거해 비교한다.
  function normalizeHeader(h) {
    return h == null ? '' : String(h).replace(/\s+/g, '');
  }

  function sheetToObjects(ws) {
    const matrix = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true, defval: null });
    if (!matrix.length) return { headers: [], rows: [], headerRow: 0 };

    // 보고서 제목·결재란·빈 줄이 위에 있어도 첫 20줄에서 실제 헤더를 찾는다.
    let headerIndex = 0;
    let bestScore = -1;
    for (let i = 0; i < Math.min(20, matrix.length); i++) {
      const candidate = (matrix[i] || []).map(normalizeHeader);
      const map = resolveFieldMap(candidate);
      const kind = classifyByFieldMap(map);
      const score = Object.keys(map).length + (kind ? 20 : 0);
      if (score > bestScore) {
        bestScore = score;
        headerIndex = i;
      }
    }

    const headers = (matrix[headerIndex] || []).map(normalizeHeader);
    const data = matrix.slice(headerIndex + 1)
      .map((row, offset) => ({ row, excelRow: headerIndex + offset + 2 }))
      .filter(({ row }) => row.some((v) => v !== null && String(v).trim() !== ''))
      .map(({ row, excelRow }) => {
        const obj = {};
        headers.forEach((h, i) => { if (h) obj[h] = row[i]; });
        obj.__excelRow = excelRow;
        return obj;
      });
    return { headers, rows: data, headerRow: headerIndex + 1 };
  }

  // 헤더 문자열들을 의미별 필드(cwsId, inspectionDate, ...)로 매칭한다.
  // 정확히 일치하는 후보명을 먼저 찾고, 없으면 포함관계로 느슨하게 찾는다.
  function resolveFieldMap(headers) {
    const uniqueHeaders = [...new Set(headers.filter(Boolean))];
    const claimed = new Set();
    const map = {};

    for (const [field, syns] of Object.entries(FIELD_SYNONYMS)) {
      const exact = uniqueHeaders.find((h) => !claimed.has(h) && syns.includes(h));
      if (exact) { map[field] = exact; claimed.add(exact); }
    }
    // 느슨한 포함관계 매칭은 길이가 짧은(2자 이하) 후보명은 쓰지 않는다.
    // "일자", "구분", "조" 같은 짧은 말은 "총공사계약일자", "발주자구분" 같은
    // 전혀 다른 컬럼 안에도 우연히 들어있어 오매칭을 일으키기 쉽다.
    for (const [field, syns] of Object.entries(FIELD_SYNONYMS)) {
      if (map[field]) continue;
      let best = null, bestScore = 0;
      for (const h of uniqueHeaders) {
        if (claimed.has(h)) continue;
        for (const syn of syns) {
          if (syn.length < 3) continue;
          if (h.includes(syn) || syn.includes(h)) {
            const score = Math.min(h.length, syn.length);
            if (score > bestScore) { bestScore = score; best = h; }
          }
        }
      }
      if (best) { map[field] = best; claimed.add(best); }
    }
    return map;
  }

  // 필드맵을 적용해 원래 헤더 키를 의미있는 필드명으로 바꾼 새 row 객체를 만든다.
  function remap(row, fieldMap) {
    const out = {};
    for (const [field, header] of Object.entries(fieldMap)) {
      out[field] = row[header];
    }
    return out;
  }

  // FIELD_SYNONYMS에 매칭되지 않은 나머지 헤더/값을 원본 제목 그대로 보존한다.
  function extractExtra(row, claimedHeaders) {
    const extra = {};
    for (const h of Object.keys(row)) {
      if (h.startsWith('__') || claimedHeaders.has(h)) continue;
      const v = row[h];
      if (v !== null && v !== undefined && String(v).trim() !== '') extra[h] = v;
    }
    return extra;
  }

  function classifyByFieldMap(fieldMap) {
    if (fieldMap.inspectionDate && fieldMap.inspectionType) return 'schedule';
    if (fieldMap.siteName && (fieldMap.cwsId || fieldMap.contractor)) return 'master';
    return null;
  }

  function analyze(workbook) {
    const result = { scheduleRows: [], masterRows: [], sheets: [] };
    workbook.SheetNames.forEach((name) => {
      const ws = workbook.Sheets[name];
      if (!ws) return;
      const { headers, rows, headerRow } = sheetToObjects(ws);
      if (!rows.length) return;
      const fieldMap = resolveFieldMap(headers);
      const kind = classifyByFieldMap(fieldMap);
      const claimedHeaders = new Set(Object.values(fieldMap));
      const ctx = sheetDateContext(name);
      const mapped = rows.map((r) => Object.assign(remap(r, fieldMap), {
        __ctx: ctx,
        __sheet: name,
        __excelRow: r.__excelRow,
        __extra: extractExtra(r, claimedHeaders),
      }));
      if (kind === 'schedule') {
        result.scheduleRows.push(...mapped);
        result.sheets.push({ name, kind, rows: rows.length, headerRow });
      } else if (kind === 'master') {
        result.masterRows.push(...mapped);
        result.sheets.push({ name, kind, rows: rows.length, headerRow });
      } else {
        result.sheets.push({ name, kind: null, rows: rows.length, headerRow });
      }
    });
    return result;
  }

  function generatedSiteId(row) {
    const name = String(pick(row, ['siteName']) || '').trim();
    if (!name) return null;
    // 일정 시트에는 주소·시공자가 빠지는 경우가 많으므로 현장명만으로 같은 임시 ID를 만든다.
    const seed = name.replace(/\s+/g, '').toLowerCase();
    let hash = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      hash ^= seed.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `LOCAL-${(hash >>> 0).toString(36).toUpperCase()}`;
  }

  function siteIdOf(row) {
    const cwsId = pick(row, ['cwsId']);
    return cwsId ? String(cwsId).trim() : generatedSiteId(row);
  }

  function mapMasterRow(row) {
    const cwsId = siteIdOf(row);
    if (!cwsId) return null;
    return {
      cwsId,
      generatedId: !pick(row, ['cwsId']),
      name: pick(row, ['siteName']) || '',
      address: pick(row, ['address']) || '',
      contractor: pick(row, ['contractor']) || '',
      bizNo: pick(row, ['bizNo']) || '',
      workType: pick(row, ['workType']) || '',
      workDetail: pick(row, ['workDetail']) || '',
      contractDate: excelSerialToISO(pick(row, ['contractDate']), row.__ctx),
      startDate: excelSerialToISO(pick(row, ['startDate']), row.__ctx),
      endDate: excelSerialToISO(pick(row, ['endDate']), row.__ctx),
      contractAmount: pick(row, ['contractAmount']) || null,
      phone: pick(row, ['phone']) || '',
    };
  }

  function mapScheduleRow(row, sourceFile) {
    const cwsId = siteIdOf(row);
    const name = pick(row, ['siteName']) || '';
    const date = excelSerialToISO(pick(row, ['inspectionDate']), row.__ctx);
    if (!date) return null;
    const progressRaw = pick(row, ['progressRate']);
    const progressRate = progressRaw != null ? Number(progressRaw) : null;
    return {
      siteId: cwsId || null,
      tempSiteName: cwsId ? null : name,
      date,
      time: null,
      inspectionType: pick(row, ['inspectionType']) || '일반',
      team: pick(row, ['team']) || null,
      memo: '',
      progressRate: Number.isFinite(progressRate) ? progressRate : null,
      extra: row.__extra || {},
      status: '예정',
      source: 'EXCEL',
      sourceFile,
      sourceSheet: row.__sheet,
      sourceRow: row.__excelRow,
      // 마스터에 없는 현장이라도 최소 정보는 함께 들어오므로 site upsert용으로 보관
      _siteHint: cwsId ? {
        cwsId,
        generatedId: !pick(row, ['cwsId']),
        name,
        address: pick(row, ['address']) || '',
        contractor: pick(row, ['contractor']) || '',
        bizNo: pick(row, ['bizNo']) || '',
        workType: pick(row, ['workType']) || '',
        workDetail: pick(row, ['workDetail']) || '',
        contractDate: excelSerialToISO(pick(row, ['contractDate']), row.__ctx),
        startDate: excelSerialToISO(pick(row, ['startDate']), row.__ctx),
        endDate: excelSerialToISO(pick(row, ['endDate']), row.__ctx),
        contractAmount: pick(row, ['contractAmount']) || null,
        phone: pick(row, ['phone']) || '',
      } : null,
    };
  }

  async function importFile(file) {
    const buf = await file.arrayBuffer();
    const wb = readWorkbook(buf);
    const analyzed = analyze(wb);

    const masterRows = analyzed.masterRows.map(mapMasterRow).filter(Boolean);
    const scheduleRows = analyzed.scheduleRows.map((r) => mapScheduleRow(r, file.name)).filter(Boolean);
    const masterSkipped = analyzed.masterRows.length - masterRows.length;
    const scheduleSkipped = analyzed.scheduleRows.length - scheduleRows.length;
    const ignoredRows = analyzed.sheets
      .filter((sheet) => !sheet.kind)
      .reduce((sum, sheet) => sum + sheet.rows, 0);
    const totalDetectedRows = analyzed.sheets.reduce((sum, sheet) => sum + sheet.rows, 0);

    let masterUpserted = 0;
    for (const m of masterRows) {
      await DB.upsertSite(m, { preserveExisting: true });
      masterUpserted++;
    }

    let scheduleNew = 0, scheduleUpdated = 0;
    const importedItems = [];
    for (const s of scheduleRows) {
      if (s._siteHint) await DB.upsertSite(s._siteHint, { preserveExisting: true });
      const { _siteHint, ...clean } = s;
      const { record, isNew } = await DB.upsertScheduleFromExcel(clean);
      if (isNew) scheduleNew++; else scheduleUpdated++;
      importedItems.push({
        id: record.id,
        name: (_siteHint && _siteHint.name) || clean.tempSiteName || '',
        date: record.date,
        inspectionType: record.inspectionType,
        isNew,
      });
    }
    importedItems.sort((a, b) => a.date.localeCompare(b.date));

    return {
      sheets: analyzed.sheets,
      masterUpserted,
      scheduleNew,
      scheduleUpdated,
      totalScheduleRows: scheduleRows.length,
      totalDetectedRows,
      skippedRows: masterSkipped + scheduleSkipped + ignoredRows,
      importedItems,
    };
  }

  async function exportRange(startStr, endStr, opts = {}) {
    const items = await DB.scheduleInRange(startStr, endStr);
    items.sort((a, b) => (a.date + (a.time || '')).localeCompare(b.date + (b.time || '')));
    const sites = await DB.allSites();
    const siteMap = new Map(sites.map((s) => [s.cwsId, s]));

    const rows = items.map((it) => {
      const site = it.siteId ? siteMap.get(it.siteId) : null;
      const base = {
        '점검일자': it.date,
        '점검구분': it.inspectionType,
        '현장명': site ? site.name : (it.tempSiteName || ''),
        '상태': it.status,
        '비고': it.memo || '',
      };
      if (opts.includeMaster) {
        Object.assign(base, {
          'CWS공사ID': it.siteId || '',
          '현장소재지': site ? site.address : '',
          '시공자': site ? site.contractor : '',
          '공종': site ? site.workType : '',
          '도급금액': site ? site.contractAmount : '',
          '준공예정일': site ? site.endDate : '',
        });
      }
      return base;
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '점검일정');
    const filename = `점검일정_${startStr}_${endStr}.xlsx`;
    XLSX.writeFile(wb, filename);
    return { filename, count: rows.length };
  }

  // 회사 현장 등록 양식(건설현장.xlsx)과 같은 컬럼 순서로 저장된 현장 마스터를 내보낸다.
  // 이 양식에만 있고 우리 데이터모델엔 없는 항목(법인등록번호, 총공사계약일자, 발주자 관련 등)은 공란으로 둔다.
  async function exportSitesTemplate() {
    const sites = await DB.allSites();
    sites.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ko'));

    const rows = sites.map((s) => ({
      'CWS공사ID': s.cwsId || '',
      '시공자': s.contractor || '',
      '사업자등록번호(시공자)': s.bizNo || '',
      '법인등록번호(시공자)': '',
      '공사명': s.name || '',
      '현장소재지': s.address || '',
      '공종': s.workType || '',
      '세부공종': s.workDetail || '',
      '계약일자': s.contractDate || '',
      '금차년도착공년월일': s.startDate || '',
      '금차년도준공예정일': s.endDate || '',
      '도급금액': s.contractAmount || '',
      '총공사계약일자': '',
      '최초착공년월일': '',
      '최초준공예정일': '',
      '총공사금액': '',
      '발주자구분': '',
      '발주자명': '',
      '사업자등록번호(발주자)': '',
      '법인등록번호(발주자)': '',
      '업종': '',
      '사고발생 여부(시공자)': '',
      '사고발생 여부(발주자)': '',
      '전화번호(현장번호)': s.phone || '',
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '현장마스터');
    const filename = `현장마스터_${todayStr()}.xlsx`;
    XLSX.writeFile(wb, filename);
    return { filename, count: rows.length };
  }

  return { importFile, exportRange, exportSitesTemplate };
})();
