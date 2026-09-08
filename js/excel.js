// 엑셀 파일을 읽어 현장 마스터/점검계획 데이터로 변환하고, 반대로 일정을 엑셀로 내보내는 기능
const Excel = (() => {

  function excelSerialToISO(v) {
    if (v instanceof Date) {
      return v.toISOString().slice(0, 10);
    }
    if (typeof v === 'number') {
      // Excel 날짜 일련번호(1899-12-30 기준) -> YYYY-MM-DD
      const ms = Math.round((v - 25569) * 86400 * 1000);
      const d = new Date(ms);
      return d.toISOString().slice(0, 10);
    }
    if (typeof v === 'string') {
      const s = v.trim();
      const m = s.match(/^(\d{4})[-./](\d{1,2})[-./](\d{1,2})/);
      if (m) return `${m[1]}-${String(m[2]).padStart(2, '0')}-${String(m[3]).padStart(2, '0')}`;
    }
    return null;
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

  // 실제 현장 엑셀은 헤더 셀에 줄바꿈·공백이 섞여 있는 경우가 많아,
  // sheet_to_json의 기본 헤더 매칭 대신 공백/개행을 제거한 헤더로 직접 매핑한다.
  function normalizeHeader(h) {
    return h == null ? '' : String(h).replace(/\s+/g, '');
  }

  function sheetToObjects(ws) {
    const rows = XLSX.utils.sheet_to_json(ws, { header: 1, raw: true, defval: null });
    if (!rows.length) return [];
    const headers = rows[0].map(normalizeHeader);
    return rows.slice(1)
      .filter((r) => r.some((v) => v !== null && v !== ''))
      .map((r) => {
        const obj = {};
        headers.forEach((h, i) => { if (h) obj[h] = r[i]; });
        return obj;
      });
  }

  // 시트를 훑어서 "점검계획(세부일정)" 또는 "현장마스터" 형식인지 판별
  function classifySheet(headerRow) {
    const has = (name) => headerRow.includes(name);
    if (has('CWS공사ID') && has('점검일자') && has('점검구분')) return 'schedule';
    if (has('CWS공사ID') && has('공사명') && (has('시공자') || has('사업자등록번호(시공자)'))) return 'master';
    return null;
  }

  function analyze(workbook) {
    const result = { scheduleRows: [], masterRows: [], sheets: [] };
    workbook.SheetNames.forEach((name) => {
      const ws = workbook.Sheets[name];
      if (!ws) return;
      const json = sheetToObjects(ws);
      if (!json.length) return;
      const headerRow = Object.keys(json[0]);
      const kind = classifySheet(headerRow);
      if (kind === 'schedule') {
        result.scheduleRows.push(...json);
        result.sheets.push({ name, kind, rows: json.length });
      } else if (kind === 'master') {
        result.masterRows.push(...json);
        result.sheets.push({ name, kind, rows: json.length });
      } else {
        result.sheets.push({ name, kind: null, rows: json.length });
      }
    });
    return result;
  }

  function mapMasterRow(row) {
    const cwsId = pick(row, ['CWS공사ID']);
    if (!cwsId) return null;
    return {
      cwsId: String(cwsId),
      name: pick(row, ['공사명']) || '',
      address: pick(row, ['현장소재지']) || '',
      contractor: pick(row, ['시공자']) || '',
      bizNo: pick(row, ['사업자등록번호(시공자)', '사업자등록번호']) || '',
      workType: pick(row, ['공종']) || '',
      workDetail: pick(row, ['세부공종']) || '',
      contractDate: excelSerialToISO(pick(row, ['계약일자'])),
      startDate: excelSerialToISO(pick(row, ['금차년도착공년월일', '최초착공년월일'])),
      endDate: excelSerialToISO(pick(row, ['금차년도준공예정일'])),
      contractAmount: pick(row, ['도급금액']) || null,
      phone: pick(row, ['전화번호\n(현장번호)', '전화번호(현장번호)', '전화번호']) || '',
    };
  }

  function mapScheduleRow(row, sourceFile) {
    const cwsId = pick(row, ['CWS공사ID']);
    const name = pick(row, ['공사명']) || '';
    const date = excelSerialToISO(pick(row, ['점검일자']));
    if (!date) return null;
    const progressRaw = pick(row, ['공정률']);
    const progressRate = progressRaw != null ? Number(progressRaw) : null;
    return {
      siteId: cwsId ? String(cwsId) : null,
      tempSiteName: cwsId ? null : name,
      date,
      time: null,
      inspectionType: pick(row, ['점검구분']) || '일반',
      team: pick(row, ['점검조']) || null,
      region: pick(row, ['지역']) || null,
      district: pick(row, ['지역구']) || null,
      memo: '',
      progressRate: Number.isFinite(progressRate) ? progressRate : null,
      status: '예정',
      source: 'EXCEL',
      sourceFile,
      // 마스터에 없는 현장이라도 최소 정보는 함께 들어오므로 site upsert용으로 보관
      _siteHint: cwsId ? {
        cwsId: String(cwsId),
        name,
        address: pick(row, ['현장소재지']) || '',
        contractor: pick(row, ['시공자']) || '',
        bizNo: pick(row, ['사업자등록번호']) || '',
        workType: pick(row, ['공종']) || '',
        workDetail: pick(row, ['세부공종']) || '',
        contractDate: excelSerialToISO(pick(row, ['계약일자'])),
        startDate: excelSerialToISO(pick(row, ['금차년도착공년월일'])),
        endDate: excelSerialToISO(pick(row, ['금차년도준공예정일'])),
        contractAmount: pick(row, ['도급금액']) || null,
        phone: pick(row, ['전화번호\n(현장번호)', '전화번호(현장번호)', '전화번호']) || '',
      } : null,
    };
  }

  async function importFile(file) {
    const buf = await file.arrayBuffer();
    const wb = readWorkbook(buf);
    const analyzed = analyze(wb);

    const masterRows = analyzed.masterRows.map(mapMasterRow).filter(Boolean);
    const scheduleRows = analyzed.scheduleRows.map((r) => mapScheduleRow(r, file.name)).filter(Boolean);

    let masterUpserted = 0;
    for (const m of masterRows) {
      await DB.upsertSite(m);
      masterUpserted++;
    }

    let scheduleNew = 0, scheduleUpdated = 0;
    for (const s of scheduleRows) {
      if (s._siteHint) await DB.upsertSite(s._siteHint);
      const { _siteHint, ...clean } = s;
      const { isNew } = await DB.upsertScheduleFromExcel(clean);
      if (isNew) scheduleNew++; else scheduleUpdated++;
    }

    return {
      sheets: analyzed.sheets,
      masterUpserted,
      scheduleNew,
      scheduleUpdated,
      totalScheduleRows: scheduleRows.length,
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

  return { importFile, exportRange };
})();
