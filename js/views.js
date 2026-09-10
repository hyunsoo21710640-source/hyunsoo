// 화면별 HTML을 만드는 렌더 함수 모음
const ICONS = {
  back: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevronL: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevronR: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  upload: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15V6a2 2 0 0 0-2-2H9"/><path d="M3 9v9a2 2 0 0 0 2 2h9"/><path d="m3 9 6-6"/></svg>',
  download: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  plusSmall: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  trash: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>',
  site: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16"/><path d="M6 20V10l6-5 6 5v10"/><path d="M10 20v-5h4v5"/></svg>',
  today: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4M16 2v4M3 10h18"/><circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>',
  settings: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.5 1A8 8 0 0 0 15 6.3L14.6 4h-5.2L9 6.3a8 8 0 0 0-1.4.8l-2.5-1-2 3.4 2 1.5A7 7 0 0 0 5 12c0 .3 0 .7.1 1l-2 1.5 2 3.4 2.5-1a8 8 0 0 0 1.4.8l.4 2.3h5.2l.4-2.3a8 8 0 0 0 1.4-.8l2.5 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z"/></svg>',
  database: '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5"/><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>',
  warn: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 2.6 17a1.7 1.7 0 0 0 1.5 2.6h15.8a1.7 1.7 0 0 0 1.5-2.6L13.7 3.9a1.7 1.7 0 0 0-3.4 0Z"/><path d="M12 9v4"/><circle cx="12" cy="16.3" r=".4" fill="currentColor" stroke="none"/></svg>',
  building: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="10" height="18"/><path d="M14 8h6v13"/><path d="M8 7h.01M8 11h.01M8 15h.01"/></svg>',
  calendarRange: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2.4"/><path d="M8 2.5v4M16 2.5v4M3 9.5h18"/></svg>',
  etc: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
};

const ADD_BTN = `<button class="icon-btn icon-btn-accent" data-action="open-add-choice" style="background:var(--blue);">${ICONS.plusSmall}</button>`;

function pillHtml(label, color, extra = '') {
  return `<span class="pill" style="background:${color.bg};color:${color.fg};${extra}">${escapeHtml(label)}</span>`;
}
function countPill(n, color = { bg: 'var(--blue-bg)', fg: 'var(--blue-dark)' }) {
  return pillHtml(`${n}건`, color);
}
function overdueBadge(item) {
  const tier = overdueTier(item);
  if (!tier) return '';
  const danger = tier === 'danger';
  return pillHtml(`⚠ ${danger ? '경고' : '주의'} ${overdueDays(item)}일`, danger ? { bg: 'var(--red-bg)', fg: 'var(--red)' } : { bg: 'var(--orange-bg)', fg: 'var(--orange)' });
}
// 날짜가 없는(예비/준공/미정) 일정을 표시용 문자열로 바꾼다. 원본 사유(dateNote)가 있으면 함께 보여준다.
function dateLabel(it) {
  if (it.date) return escapeHtml(it.date);
  return it.dateNote ? `미배정 · ${escapeHtml(it.dateNote)}` : '미배정';
}
function copyLink(value, action = 'copy') {
  if (!value) return '';
  return `<span data-action="${action}" data-value="${escapeHtml(value)}" style="color:var(--blue);font-weight:700;font-size:11.5px;cursor:pointer;">복사</span>`;
}

// 캘린더/현장 화면의 점검조 선택 칩 목록. 조마다 고유 색으로 구분하고 건수를 보여준다.
// 여러 조를 동시에 체크할 수 있다(선택된 조 중 하나라도 해당하면 노출). 저장된 team 값이 하나도 없으면 숨긴다.
async function teamChipsHtml(activeTeams, scopeItems) {
  const teams = await DB.allTeams();
  if (!teams.length) return '';
  const countOf = (team) => scopeItems.filter((it) => normalizeTeam(it.team) === team).length;
  const noneSelected = !activeTeams || !activeTeams.length;
  const chip = (label, value, hue, selected) => `
      <div class="team-chip" data-action="${value ? 'toggle-team-filter' : 'clear-team-filter'}" data-team="${escapeHtml(value)}"
        style="background:${selected ? hue : hue + '18'};color:${selected ? '#fff' : hue};border-color:${selected ? hue : hue + '33'};">
        <span class="team-chip-dot" style="background:${selected ? '#fff' : hue};"></span>${escapeHtml(label)}${value ? `<span class="team-chip-count" style="opacity:${selected ? '.85' : '.75'};">${countOf(value)}</span>` : ''}
      </div>`;
  return `
    <div class="field-label" style="margin-bottom:8px;">점검조 필터 <span style="font-weight:500;">(여러 개 선택 가능)</span></div>
    <div class="team-chip-row">${chip('전체', '', '#17796f', noneSelected)}${teams.map((t) => chip(t, t, hueForTeam(t), (activeTeams || []).includes(t))).join('')}</div>`;
}

// 현장 탭의 기간 필터. 빠른 선택(전체/이번 주/이번 달) + 직접 입력.
function periodFilterHtml(start, end, q) {
  const today = todayStr();
  const wkStart = startOfWeek(today);
  const wkEnd = addDays(wkStart, 6);
  const mr = monthRange(new Date().getFullYear(), new Date().getMonth());
  const qParam = q ? `&q=${encodeURIComponent(q)}` : '';
  const isAll = !start && !end;
  const isWeek = start === wkStart && end === wkEnd;
  const isMonth = start === mr.start && end === mr.end;
  const chip = (label, href, active) => `<div class="chip ${active ? 'selected' : ''}" data-href="${href}" style="flex-shrink:0;">${label}</div>`;
  return `
    <div class="field-label" style="margin-bottom:8px;">기간 필터</div>
    <div style="display:flex;gap:8px;overflow-x:auto;margin-bottom:8px;padding-bottom:2px;">
      ${chip('전체 기간', `/sites?${qParam.replace(/^&/, '')}`, isAll)}
      ${chip('이번 주', `/sites?start=${wkStart}&end=${wkEnd}${qParam}`, isWeek)}
      ${chip('이번 달', `/sites?start=${mr.start}&end=${mr.end}${qParam}`, isMonth)}
    </div>
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
      <input id="sites-start" type="date" value="${start}" class="field-box" style="flex:1;min-width:0;font-size:12.5px;padding:0 8px;">
      <span style="color:var(--text-soft);flex-shrink:0;">~</span>
      <input id="sites-end" type="date" value="${end}" class="field-box" style="flex:1;min-width:0;font-size:12.5px;padding:0 8px;">
    </div>
    <button class="btn-secondary" data-action="apply-sites-period" style="width:100%;height:38px;margin-bottom:14px;">기간 적용</button>`;
}

// 점검조 필터가 걸려 있을 때 다른 화면에서 조용히 줄어든 건수를 알아채도록 보여주는 배지. 탭하면 전체 해제.
function teamFilterBadge(activeTeams) {
  if (!activeTeams || !activeTeams.length) return '';
  const label = activeTeams.length === 1 ? activeTeams[0] : `${activeTeams.length}개 조`;
  return `<div data-action="clear-team-filter" style="display:inline-flex;align-items:center;gap:6px;background:var(--blue-bg);color:var(--blue-dark);border-radius:999px;padding:5px 10px 5px 12px;font-size:12px;font-weight:700;cursor:pointer;margin-bottom:12px;">점검조 필터 · ${escapeHtml(label)} <span style="font-size:14px;line-height:1;">×</span></div>`;
}

async function siteNameOf(item) {
  if (item.siteId) {
    const s = await DB.getSite(item.siteId);
    return s ? s.name : (item.tempSiteName || '(현장명 없음)');
  }
  return item.tempSiteName || '(현장명 없음)';
}

// 엑셀 헤더 중 정식 필드로 매칭되지 않은 나머지 항목(schedule.extra)을
// 일정 상세에서 기본으로 보여줄지 설정하는 체크박스 목록.
async function extraFieldSettingsHtml() {
  const keys = await DB.allExtraFieldKeys();
  if (!keys.length) return '';
  keys.sort((a, b) => a.localeCompare(b, 'ko'));
  const visible = new Set(await DB.getSetting('visibleExtraFields', DEFAULT_VISIBLE_EXTRA_FIELDS));
  const checkRow = (key) => `<label style="display:flex;align-items:center;gap:10px;padding:11px 15px;cursor:pointer;">
      <input type="checkbox" data-action="toggle-extra-field" data-field="${escapeHtml(key)}" ${visible.has(key) ? 'checked' : ''} style="width:18px;height:18px;">
      <span style="font-size:14px;">${escapeHtml(key)}</span>
    </label>`;
  return `
    <div style="font-size:12px;font-weight:700;color:var(--text-soft);text-transform:uppercase;margin:0 4px 6px;">일정 상세에 표시할 엑셀 항목</div>
    <div class="card" style="overflow:hidden;margin-bottom:20px;">
      ${keys.map(checkRow).join('<div style="height:1px;background:var(--border);margin:0 15px;"></div>')}
    </div>`;
}

// 일정 상세의 현장 정보 박스(시공자/공종/계약일자 등)에서 기본으로 보여줄 필드를 고르는 체크박스 목록.
async function siteFieldSettingsHtml() {
  const visible = new Set(await DB.getSetting('visibleSiteFields', DEFAULT_VISIBLE_SITE_FIELDS));
  const checkRow = (def) => `<label style="display:flex;align-items:center;gap:10px;padding:11px 15px;cursor:pointer;">
      <input type="checkbox" data-action="toggle-site-field" data-field="${escapeHtml(def.key)}" ${visible.has(def.key) ? 'checked' : ''} style="width:18px;height:18px;">
      <span style="font-size:14px;">${escapeHtml(def.label)}</span>
    </label>`;
  return `
    <div style="font-size:12px;font-weight:700;color:var(--text-soft);text-transform:uppercase;margin:0 4px 6px;">일정 상세 현장 정보 박스에 표시할 항목</div>
    <div class="card" style="overflow:hidden;margin-bottom:20px;">
      ${SITE_FIELD_DEFS.map(checkRow).join('<div style="height:1px;background:var(--border);margin:0 15px;"></div>')}
    </div>`;
}

// 일정 상세의 현장 정보 박스. 라벨(위)·값(아래) 2열 그리드로 기본 항목을 보여주고,
// 나머지는 "더보기"에 접어 넣는다.
async function siteInfoGridHtml(site) {
  if (!site) return '';
  const visible = await DB.getSetting('visibleSiteFields', DEFAULT_VISIBLE_SITE_FIELDS);
  const valueOf = (def) => {
    const raw = site[def.key];
    if (raw == null || raw === '') return null;
    return def.format ? def.format(raw) : raw;
  };
  const cell = (def, val) => `<div><div class="info-label">${escapeHtml(def.label)}</div><div class="info-value">${escapeHtml(String(val))}</div></div>`;
  const visibleCells = SITE_FIELD_DEFS.filter((d) => visible.includes(d.key)).map((d) => { const v = valueOf(d); return v != null ? cell(d, v) : ''; }).filter(Boolean);
  const moreCells = SITE_FIELD_DEFS.filter((d) => !visible.includes(d.key)).map((d) => { const v = valueOf(d); return v != null ? cell(d, v) : ''; }).filter(Boolean);
  if (!visibleCells.length && !moreCells.length) return '';
  return `
    <div class="info-grid-box">
      <div class="info-grid">${visibleCells.join('')}</div>
      ${moreCells.length ? `
      <details style="margin-top:12px;">
        <summary style="cursor:pointer;font-size:12.5px;font-weight:700;color:var(--blue);">더보기 (${moreCells.length})</summary>
        <div class="info-grid" style="margin-top:12px;">${moreCells.join('')}</div>
      </details>` : ''}
    </div>`;
}

// schedule.extra를 의미별로 묶어 보여주기 위한 그룹 정의.
// 매핑에 없는 키(회사가 컬럼명을 새로 바꾼 경우)는 자동으로 "기타" 그룹에 떨어지므로
// 새 엑셀 헤더가 와도 화면이 깨지지 않는다 (범용 bag 정책 유지).
const EXTRA_GROUPS = [
  { label: '안전 · 위험', icon: ICONS.warn, color: 'var(--orange)', keys: ['위험성', '발생가능사고종류', '안전관리계획서수립대상', '품질'] },
  { label: '발주 정보', icon: ICONS.building, color: 'var(--blue-dark)', keys: ['지역', '지역구', '발주자', '발주자명', '인허가기관(담당부서)'] },
  { label: '담당 · 일정', icon: ICONS.calendarRange, color: 'var(--indigo)', keys: ['조사자', '기존조사자', '우선순위', '유효점검기간', '현장대리인연락처', '시공사대표메일', '공사규모', '빅토리예측공정률', '비고'] },
];
const EXTRA_LABEL_OVERRIDE = { '인허가기관(담당부서)': '인허가기관' };

function riskLevel(n) {
  if (!Number.isFinite(n)) return null;
  if (n >= 6) return { label: '높음', fg: 'var(--red)', bg: 'var(--red-bg)' };
  if (n >= 2) return { label: '주의', fg: 'var(--orange)', bg: 'var(--orange-bg)' };
  return { label: '낮음', fg: 'var(--green)', bg: 'var(--green-bg)' };
}
function markKind(raw) {
  const v = String(raw ?? '').trim();
  if (['O', 'o', '○', 'Ο'].includes(v)) return 'yes';
  if (['X', 'x', '×'].includes(v)) return 'no';
  return null;
}

// 필드별 값 표시를 담당. 어떤 스타일이든 항상 .extra-field-input 입력창을 반환해
// app.js의 save-extra가 값을 그대로 수집·저장할 수 있게 한다(편집 가능 유지).
function extraValueInput(key, rawValue) {
  if (key === '안전관리계획서수립대상' || key === '품질') {
    const mark = markKind(rawValue);
    if (mark) {
      const yes = mark === 'yes';
      return `<input type="text" class="extra-field-input" data-field="${escapeHtml(key)}" value="${yes ? 'O' : 'X'}"
        style="width:22px;height:22px;padding:0;border:none;border-radius:999px;text-align:center;font-size:11px;font-weight:800;background:${yes ? 'var(--green-bg)' : 'var(--red-bg)'};color:${yes ? 'var(--green)' : 'var(--red)'};">`;
    }
  }
  if (key === '위험성') {
    const n = Number(rawValue);
    const level = riskLevel(n);
    const display = Number.isFinite(n) ? n.toFixed(1) : (rawValue ?? '');
    return `<span style="display:inline-flex;align-items:baseline;gap:5px;">
      <input type="text" class="extra-field-input" data-field="${escapeHtml(key)}" value="${escapeHtml(display)}"
        style="width:38px;border:none;background:transparent;padding:0;font-size:14.5px;font-weight:800;color:${level ? level.fg : 'var(--text)'};">${level ? `<span style="font-size:9.5px;font-weight:700;color:${level.fg};background:${level.bg};padding:1px 6px;border-radius:999px;">${level.label}</span>` : ''}</span>`;
  }
  if (key === '발생가능사고종류' && rawValue) {
    return `<input type="text" class="extra-field-input" data-field="${escapeHtml(key)}" value="${escapeHtml(rawValue)}"
      style="height:22px;padding:0 8px;border:none;border-radius:999px;font-size:11.5px;font-weight:700;background:var(--red-bg);color:var(--red);">`;
  }
  if (key === '우선순위') {
    const n = Number(rawValue);
    const display = Number.isFinite(n) ? n.toLocaleString('ko-KR') : (rawValue ?? '');
    return `<input type="text" class="extra-field-input" data-field="${escapeHtml(key)}" value="${escapeHtml(display)}"
      style="width:100%;border:none;background:transparent;padding:0;font-size:12.5px;font-weight:700;color:var(--text);">`;
  }
  return `<input type="text" class="extra-field-input" data-field="${escapeHtml(key)}" value="${escapeHtml(rawValue ?? '')}"
    style="width:100%;border:none;background:transparent;padding:0;font-size:12.5px;font-weight:700;color:var(--text);">`;
}

function extraRowsGrid(keys, extra) {
  return `<div style="display:grid;grid-template-columns:92px 1fr;row-gap:10px;align-items:center;">
    ${keys.map((k) => `<span style="font-size:12px;color:var(--text-soft);">${escapeHtml(EXTRA_LABEL_OVERRIDE[k] || k)}</span><div>${extraValueInput(k, extra[k])}</div>`).join('')}
  </div>`;
}

// 일정 상세에 보여줄 schedule.extra 블록. 기본 표시 항목은 값이 없어도 공란으로 노출하고,
// 나머지는 <details>(더보기)에 모아 전부 볼 수 있게 한다. 모든 값은 입력창으로 바로 수정 가능.
async function extraFieldsDetailHtml(item) {
  const extra = item.extra || {};
  const visibleFields = await DB.getSetting('visibleExtraFields', DEFAULT_VISIBLE_EXTRA_FIELDS);
  const moreKeys = Object.keys(extra).filter((k) => !visibleFields.includes(k));
  if (!visibleFields.length && !moreKeys.length) return '';

  const sections = EXTRA_GROUPS
    .map((g) => ({ ...g, keys: g.keys.filter((k) => visibleFields.includes(k)) }))
    .filter((g) => g.keys.length);
  const groupedKeys = new Set(sections.flatMap((g) => g.keys));
  const etcKeys = visibleFields.filter((k) => !groupedKeys.has(k));
  if (etcKeys.length) sections.push({ label: '기타', icon: ICONS.etc, color: 'var(--text-soft)', keys: etcKeys });

  const sectionHtml = (g) => `
    <div style="padding:14px 16px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px;">
        <span style="display:inline-flex;color:${g.color};">${g.icon}</span>
        <span style="font-size:11.5px;font-weight:800;color:${g.color};letter-spacing:.01em;">${g.label}</span>
      </div>
      ${extraRowsGrid(g.keys, extra)}
    </div>`;

  return `
    <div style="font-size:12px;font-weight:700;color:var(--text-soft);margin-bottom:7px;">추가 정보</div>
    <div class="card" style="overflow:hidden;margin-bottom:14px;">
      ${sections.map(sectionHtml).join('<div style="height:1px;background:var(--border-soft);"></div>')}
      ${moreKeys.length ? `
      <div style="padding:${sections.length ? '0' : '14px'} 16px 15px;">
        <details>
          <summary style="cursor:pointer;font-size:13px;font-weight:700;color:var(--blue);margin:${sections.length ? '4' : '0'}px 0 10px;">더보기 (${moreKeys.length})</summary>
          ${extraRowsGrid(moreKeys, extra)}
        </details>
      </div>` : ''}
    </div>
    <button class="btn-secondary" style="width:100%;margin-bottom:14px;" data-action="save-extra" data-id="${item.id}">추가 정보 저장</button>`;
}

function progressPercent(rate) {
  if (rate == null || !Number.isFinite(rate)) return null;
  const p = rate <= 1 ? rate * 100 : rate;
  return Math.max(0, Math.min(100, Math.round(p)));
}

async function siteLatestProgress(cwsId) {
  const items = (await DB.scheduleBySite(cwsId)).filter((it) => it.progressRate != null);
  if (!items.length) return null;
  items.sort((a, b) => b.date.localeCompare(a.date));
  return progressPercent(items[0].progressRate);
}

function itemRow(item, name, opts = {}) {
  const timeLabel = item.time ? `${item.time} · ` : '';
  return `
    <div class="card" data-href="/item/${item.id}" style="display:flex;align-items:center;gap:11px;padding:13px 14px;cursor:pointer;${opts.done ? 'opacity:.55;' : ''}">
      ${pillHtml(item.inspectionType, typeColor(item.inspectionType))}
      ${overdueBadge(item)}
      <div style="min-width:0;flex:1;">
        <div style="font-size:15px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(name)}</div>
        <div style="font-size:11px;color:var(--text-soft);">${timeLabel}${escapeHtml(item.status)}</div>
      </div>
    </div>`;
}

const Views = {
  async afterRender(path) {
    if (path === '/add' || path.startsWith('/item/')) Views._wireAddEdit();
  },

  // ---------- 업무 현황 ----------
  async renderToday() {
    const today = todayStr();
    const weekEnd = addDays(today, 6);
    const activeTeams = await DB.getSetting('activeTeams', []);
    const items = filterByTeam(await DB.allSchedule(), activeTeams);
    const sites = await DB.allSites();
    const upcoming = items.filter((it) => it.date >= today && it.date <= weekEnd && !['완료', '미실시', '조치완료'].includes(it.status));
    const followups = items.filter((it) => ['진행중', '조치중'].includes(it.status));
    const delayed = items.filter(isOverdue);
    const excelItems = items.filter((it) => it.source === 'EXCEL');
    const latest = excelItems.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))[0];

    const statusLine = latest
      ? `<div style="font-size:14px;font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(latest.sourceFile || '엑셀 파일')}</div>
         <div style="font-size:12px;color:var(--text-soft);margin-top:3px;">엑셀 일정 ${excelItems.length}건이 저장되어 있습니다</div>`
      : `<div style="font-size:14px;font-weight:800;">아직 가져온 엑셀이 없습니다</div>
         <div style="font-size:12px;color:var(--text-soft);margin-top:3px;">파일을 넣으면 저장된 내용을 바로 확인할 수 있습니다</div>`;

    return `
      <div class="topbar">
        <div class="topbar-row">
          <div>
            <div class="topbar-sub brand-label">FIELD NOTES · 점검수첩</div>
            <h1 class="topbar-title-lg">업무 현황<span class="title-dot">.</span></h1>
          </div>
          <button class="icon-btn" style="margin-left:auto;" data-href="/settings" aria-label="설정">${ICONS.settings}</button>
        </div>
      </div>

      <section class="dashboard-hero">
        <div class="hero-date">${ICONS.today} ${formatKoreanDate(today)}</div>
        <h2>안전한 현장,<br>차곡차곡 쌓이는 기록.</h2>
        <p>오늘도 빈틈없이, 이번 주 점검을 확인하세요.</p>
        <button class="hero-link" data-href="/calendar">이번 주 일정 보기 ${ICONS.chevronR}</button>
        <svg class="hero-art" aria-hidden="true" viewBox="0 0 120 150" fill="none"><rect x="24" y="22" width="77" height="109" rx="13" stroke="currentColor" stroke-width="2"/><rect x="43" y="15" width="39" height="15" rx="6" fill="#234d51" stroke="currentColor" stroke-width="2"/><path d="m39 52 4 4 8-9M59 52h26m-46 24 4 4 8-9m8 5h26m-46 24 4 4 8-9m8 5h18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="95" cy="119" r="22" fill="#bde7d5"/><path d="m84 119 7 7 14-15" stroke="#234d51" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </section>

      ${teamFilterBadge(activeTeams)}
      <div class="section-title summary-heading"><span>한눈에 보는 현황</span><span class="section-caption">오늘 기준</span></div>
      <div class="summary-grid">
        <div class="summary-card" data-href="/calendar" style="cursor:pointer;">
          <div class="label"><span class="metric-icon">${ICONS.today}</span>7일 안에 예정</div><div class="value" style="color:var(--blue);">${upcoming.length}<small>건</small></div>
        </div>
        <div class="summary-card" data-href="/data?kind=all" style="cursor:pointer;">
          <div class="label"><span class="metric-icon">${ICONS.clock}</span>진행·조치 중</div><div class="value" style="color:var(--orange);">${followups.length}<small>건</small></div>
        </div>
        <div class="summary-card" data-href="/data?kind=all&q=${encodeURIComponent('조치중')}" style="cursor:pointer;">
          <div class="label"><span class="metric-icon">${ICONS.clock}</span>조치 지연</div><div class="value" style="color:var(--red);">${delayed.length}<small>건</small></div>
        </div>
        <div class="summary-card" data-href="/sites" style="cursor:pointer;">
          <div class="label"><span class="metric-icon">${ICONS.site}</span>등록 현장</div><div class="value">${sites.length}<small>곳</small></div>
        </div>
      </div>

      <div class="section-title">${ICONS.database}<span>최근 가져온 데이터</span></div>
      <div class="card" data-href="/data" style="padding:15px;margin-bottom:16px;display:flex;align-items:center;gap:12px;cursor:pointer;">
        <span style="width:42px;height:42px;border-radius:12px;background:var(--green-bg);color:var(--green);display:flex;align-items:center;justify-content:center;flex-shrink:0;">${ICONS.download}</span>
        <div style="min-width:0;flex:1;">${statusLine}</div>
        <span style="font-size:22px;color:var(--text-mute);">›</span>
      </div>

      <div class="section-title"><span>빠른 작업</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <button class="btn-primary" data-href="/upload">${ICONS.upload} 엑셀 넣기</button>
        <button class="btn-secondary" style="height:48px;" data-href="/export">${ICONS.download} 내보내기</button>
      </div>`;
  },

  // 예전 오늘 일정 화면은 내부 호환용으로 유지한다.
  async renderTodayAgenda() {
    const date = todayStr();
    const items = (await DB.scheduleByDate(date)).sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99'));
    const named = await Promise.all(items.map(async (it) => ({ it, name: await siteNameOf(it) })));

    const header = `
      <div class="topbar">
        <div class="topbar-row">
          <div>
            <div class="topbar-sub">${formatKoreanDate(date)}</div>
            <h1 class="topbar-title-lg">오늘 할 일</h1>
          </div>
          <div style="margin-left:auto;display:flex;gap:8px;">
            ${ADD_BTN}
            <button class="icon-btn" data-href="/calendar">${ICONS.today}</button>
          </div>
        </div>
      </div>`;

    if (!named.length) {
      return header + `
        <div class="empty-state">
          ${ICONS.today}
          <h3>오늘 예정된 점검이 없습니다</h3>
          <p>엑셀로 이번 주 계획을 넣거나,<br>직접 일정을 추가해보세요.</p>
          <div style="display:flex;gap:8px;justify-content:center;">
            <button class="btn-secondary" style="padding:0 16px;" data-href="/upload">엑셀로 넣기</button>
            <button class="btn-primary" style="padding:0 16px;height:44px;" data-action="open-add-choice">${ICONS.plus} 직접 추가</button>
          </div>
        </div>`;
    }

    const next = named.find((n) => n.it.status !== '완료' && n.it.status !== '미실시');
    const hero = next ? `
      <div style="border-radius:18px;padding:18px;margin-bottom:18px;border:1.5px solid var(--blue);background:rgba(0,136,255,.08);cursor:pointer;" data-href="/item/${next.it.id}">
        <div style="font-size:12px;font-weight:700;color:var(--blue-dark);margin-bottom:8px;">${next.it.status === '진행중' ? '진행중인 점검' : '다음 점검' + (next.it.time ? ' · ' + next.it.time : '')}</div>
        <div style="color:var(--text);font-size:19px;font-weight:800;margin-bottom:4px;">${escapeHtml(next.name)}</div>
        <div style="color:var(--text-soft);font-size:13px;">${escapeHtml(next.it.inspectionType)}${next.it.time ? ' · ' + next.it.time : ''} ${escapeHtml(next.it.status)}</div>
      </div>` : `
      <div class="card" style="padding:16px;margin-bottom:18px;display:flex;align-items:center;gap:10px;">
        <span style="color:var(--green);">${ICONS.check}</span>
        <span style="font-size:14px;font-weight:700;">오늘 일정을 모두 마쳤습니다</span>
      </div>`;

    const list = named.map(({ it, name }) => itemRow(it, name, { done: it.status === '완료' || it.status === '미실시' })).join('');

    return header + `
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
        <span style="font-size:15px;font-weight:800;">오늘의 일정</span>
        ${countPill(named.length)}
      </div>
      ${hero}
      <div style="display:flex;flex-direction:column;gap:10px;">${list}</div>`;
  },

  // ---------- 캘린더 ----------
  async renderCalendar(params) {
    const now = new Date();
    const monthParam = params.get('month');
    const [y, m] = monthParam ? monthParam.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
    const year = y, month = m - 1;
    const selected = params.get('date') || todayStr();

    const activeTeams = await DB.getSetting('activeTeams', []);
    const { start, end } = monthRange(year, month);
    const monthItems = await DB.scheduleInRange(start, end);
    const items = filterByTeam(monthItems, activeTeams);
    const firstTypeByDate = {};
    items.forEach((it) => { if (!firstTypeByDate[it.date]) firstTypeByDate[it.date] = it.inspectionType; });
    // 그 날짜에 있는 일정 중 가장 심각한 지연 단계(경고 > 주의)를 골라 날짜 테두리색으로 쓴다.
    const worstTierByDate = {};
    items.forEach((it) => {
      const tier = overdueTier(it);
      if (!tier) return;
      if (tier === 'danger' || worstTierByDate[it.date] !== 'danger') worstTierByDate[it.date] = tier;
    });

    const first = new Date(year, month, 1);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    let cells = '';
    for (let i = 0; i < startWeekday; i++) {
      const dnum = prevMonthDays - startWeekday + 1 + i;
      cells += `<div style="text-align:center;padding:4px 0;opacity:.3;font-size:13.5px;">${dnum}</div>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${pad2(month + 1)}-${pad2(d)}`;
      const isToday = dateStr === todayStr();
      const isSelected = dateStr === selected;
      const t = firstTypeByDate[dateStr];
      const dotColor = t ? typeColor(t).fg : 'transparent';
      const tier = worstTierByDate[dateStr];
      const ringColor = tier === 'danger' ? 'var(--red)' : tier === 'warn' ? 'var(--orange)' : 'transparent';
      const weekday = new Date(year, month, d).getDay();
      const numColor = isSelected ? '#fff' : weekday === 0 ? 'var(--red)' : 'var(--text)';
      const circleBg = isSelected ? 'var(--blue)' : isToday ? 'var(--blue-bg)' : 'transparent';
      cells += `
        <div data-href="/calendar?date=${dateStr}&month=${year}-${pad2(month + 1)}" style="text-align:center;padding:4px 0;cursor:pointer;">
          <div style="width:30px;height:30px;line-height:30px;border-radius:50%;margin:0 auto;font-size:13.5px;font-weight:${isSelected ? 800 : 500};color:${numColor};background:${circleBg};box-shadow:inset 0 0 0 2px ${ringColor};position:relative;">
            ${d}
            ${t ? `<i style="position:absolute;bottom:-1px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:${dotColor};"></i>` : ''}
          </div>
        </div>`;
    }

    const prevMonth = month === 0 ? `${year - 1}-12` : `${year}-${pad2(month)}`;
    const nextMonth = month === 11 ? `${year + 1}-01` : `${year}-${pad2(month + 2)}`;

    const selItems = filterByTeam(await DB.scheduleByDate(selected), activeTeams).sort((a, b) => {
      const r = tierRank(a) - tierRank(b);
      return r !== 0 ? r : (a.time || '99:99').localeCompare(b.time || '99:99');
    });
    const named = await Promise.all(selItems.map(async (it) => ({ it, name: await siteNameOf(it) })));

    return `
      <div class="topbar">
        <div class="topbar-row">
          <h1 class="topbar-title">캘린더</h1>
          <div style="margin-left:auto;display:flex;gap:8px;">
            ${ADD_BTN}
            <button class="icon-btn" style="width:auto;padding:0 12px;font-size:13px;font-weight:700;" data-href="/calendar?date=${todayStr()}&month=${todayStr().slice(0,7)}">오늘로</button>
          </div>
        </div>
      </div>
      <div style="display:flex;align-items:center;margin-bottom:8px;">
        <span style="font-size:17px;font-weight:800;">${year}년 ${month + 1}월</span>
        <div style="margin-left:auto;display:flex;gap:6px;">
          <button class="icon-btn" style="width:28px;height:28px;" data-href="/calendar?date=${selected}&month=${prevMonth}">${ICONS.chevronL}</button>
          <button class="icon-btn" style="width:28px;height:28px;" data-href="/calendar?date=${selected}&month=${nextMonth}">${ICONS.chevronR}</button>
        </div>
      </div>
      ${await teamChipsHtml(activeTeams, monthItems)}
      <div class="card" style="margin-bottom:16px;padding:8px 4px 10px;">
        <div style="display:grid;grid-template-columns:repeat(7,1fr);padding:6px 4px 4px;">
          ${WEEKDAY_KR.map((w, i) => `<span style="text-align:center;font-size:11px;font-weight:700;color:${i === 0 ? 'var(--red)' : i === 6 ? 'var(--blue)' : 'var(--text)'};">${w}</span>`).join('')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);row-gap:2px;">${cells}</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
        <span style="font-size:14px;font-weight:800;">${formatKoreanDate(selected)}</span>
        ${countPill(named.length)}
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${named.length ? named.map(({ it, name }) => `
          <div class="card" data-href="/item/${it.id}" style="display:flex;align-items:center;gap:10px;padding:12px 13px;cursor:pointer;${it.team ? `border-left:3px solid ${hueForTeam(it.team)};` : ''}">
            <span style="width:30px;height:30px;flex-shrink:0;border-radius:9px;background:${typeColor(it.inspectionType).bg};color:${typeColor(it.inspectionType).fg};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">${escapeHtml(name[0] || '?')}</span>
            <div style="min-width:0;flex:1;">
              <div style="font-size:14px;font-weight:700;">${escapeHtml(name)}</div>
              <div style="font-size:11.5px;color:var(--text-soft);">${it.time ? it.time + ' ' : ''}<span style="font-weight:700;color:${statusColor(it.status).fg};">${escapeHtml(it.status)}</span> · ${escapeHtml(it.inspectionType)}${it.team ? ` · <span style="font-weight:700;color:${hueForTeam(it.team)};">${escapeHtml(normalizeTeam(it.team))}</span>` : ''}</div>
            </div>
            ${overdueBadge(it)}
          </div>`).join('') : '<div style="color:var(--text-soft);font-size:13.5px;padding:24px 0;text-align:center;">이 날짜엔 일정이 없습니다.</div>'}
      </div>`;
  },

  // ---------- 현장(마스터 전체 목록) ----------
  async renderSites(params) {
    const q = params.get('q') || '';
    const activeTeams = await DB.getSetting('activeTeams', []);
    const periodStart = params.get('start') || '';
    const periodEnd = params.get('end') || '';
    const hasPeriod = !!(periodStart && periodEnd);
    const filterActive = hasPeriod || !!(activeTeams && activeTeams.length);

    const sites = await DB.allSites();

    const scopeSchedule = hasPeriod ? await DB.scheduleInRange(periodStart, periodEnd) : await DB.allSchedule();
    const scopedSchedule = filterByTeam(scopeSchedule, activeTeams);
    const matchingSiteIds = new Set(scopedSchedule.filter((it) => it.siteId).map((it) => it.siteId));

    const header = `
      <div class="topbar">
        <div class="topbar-row">
          <h1 class="topbar-title">현장</h1>
          <div style="margin-left:auto;">${ADD_BTN}</div>
        </div>
        <input id="site-q" value="${escapeHtml(q)}" placeholder="현장명·주소·시공자로 검색" style="margin-top:10px;width:100%;height:38px;border-radius:10px;border:none;background:var(--bg-soft);padding:0 12px;font-size:14px;color:var(--text);outline:none;">
      </div>
      ${await teamChipsHtml(activeTeams, scopeSchedule)}
      ${periodFilterHtml(periodStart, periodEnd, q)}`;

    if (!sites.length) {
      return header + `<div class="empty-state">${ICONS.site}<h3>등록된 현장이 없습니다</h3><p>설정 → 엑셀로 넣기에서<br>현장 마스터 엑셀을 올려보세요.</p>
        <button class="btn-primary" style="padding:0 20px;margin:0 auto;" data-href="/upload">엑셀로 넣기</button>
      </div>`;
    }

    const qn = q.trim().toLowerCase();
    let filtered = qn
      ? sites.filter((s) => (s.name || '').toLowerCase().includes(qn) || (s.address || '').toLowerCase().includes(qn) || (s.contractor || '').toLowerCase().includes(qn))
      : sites;
    if (filterActive) filtered = filtered.filter((s) => matchingSiteIds.has(s.cwsId));

    const countBySite = {};
    const tierBySite = {};
    scopedSchedule.forEach((it) => {
      if (!it.siteId) return;
      countBySite[it.siteId] = (countBySite[it.siteId] || 0) + 1;
      const r = tierRank(it);
      if (tierBySite[it.siteId] === undefined || r < tierBySite[it.siteId]) tierBySite[it.siteId] = r;
    });
    // 조치 지연(경고 > 주의) 현장을 먼저 보여주고, 같은 단계 안에서는 이름순.
    filtered.sort((a, b) => {
      const ra = tierBySite[a.cwsId] ?? 2, rb = tierBySite[b.cwsId] ?? 2;
      return ra !== rb ? ra - rb : (a.name || '').localeCompare(b.name || '', 'ko');
    });

    const pageSize = 50;
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const page = Math.min(totalPages, Math.max(1, Number(params.get('page')) || 1));
    const shown = filtered.slice((page - 1) * pageSize, page * pageSize);
    const countLine = qn || filterActive
      ? `${filtered.length}건 검색됨 (전체 ${sites.length}건)`
      : `전체 ${sites.length}건 · ${page}/${totalPages}페이지`;

    if (!shown.length) {
      return header + `<div class="empty-state">${ICONS.site}<h3>${qn ? '검색 결과가 없습니다' : '조건에 맞는 현장이 없습니다'}</h3><p>${qn ? '다른 검색어를 입력해보세요.' : '기간·점검조 필터를 바꿔보세요.'}</p></div>`;
    }

    const rows = await Promise.all(shown.map(async (s) => {
      const progress = await siteLatestProgress(s.cwsId);
      const progressRow = progress != null ? `
          <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
            <div style="flex:1;height:5px;border-radius:999px;background:var(--bg-soft);overflow:hidden;"><div style="width:${progress}%;height:5px;background:var(--blue);"></div></div>
            <span style="font-size:11px;font-weight:700;color:var(--text-soft);">공정률 ${progress}%</span>
          </div>` : '';
      const tier = tierBySite[s.cwsId] === 0 ? 'danger' : tierBySite[s.cwsId] === 1 ? 'warn' : null;
      const tierPill = tier ? pillHtml(tier === 'danger' ? '⚠ 경고' : '⚠ 주의', tier === 'danger' ? { bg: 'var(--red-bg)', fg: 'var(--red)' } : { bg: 'var(--orange-bg)', fg: 'var(--orange)' }) : '';
      return `
        <div class="card" data-href="/site/${encodeURIComponent(s.cwsId)}" style="padding:14px;cursor:pointer;${tier ? `border-left:3px solid var(--${tier === 'danger' ? 'red' : 'orange'});` : ''}">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <span style="font-size:15px;font-weight:800;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(s.name || '(이름 없음)')}</span>
            ${tierPill}
            ${countBySite[s.cwsId] ? countPill(countBySite[s.cwsId]) : ''}
          </div>
          <div style="font-size:12.5px;color:var(--text-soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(s.address || '')}</div>
          ${progressRow}
        </div>`;
    }));

    const pageQuery = (qn ? `&q=${encodeURIComponent(q)}` : '') + (hasPeriod ? `&start=${periodStart}&end=${periodEnd}` : '');
    const pagination = totalPages > 1 ? `
      <div class="pagination">
        <div class="page-btn ${page === 1 ? 'disabled' : ''}" data-href="/sites?page=${page - 1}${pageQuery}">${ICONS.chevronL} 이전</div>
        <span style="font-size:13px;font-weight:700;color:var(--text-soft);">${page} / ${totalPages}</span>
        <div class="page-btn ${page === totalPages ? 'disabled' : ''}" data-href="/sites?page=${page + 1}${pageQuery}">다음 ${ICONS.chevronR}</div>
      </div>` : '';

    return header + `
      <div style="font-size:12px;color:var(--text-soft);margin:10px 0;">${countLine}</div>
      <div style="display:flex;flex-direction:column;gap:10px;">${rows.join('')}</div>
      ${pagination}`;
  },

  // ---------- 현장 마스터 정보 (엑셀로 들어온 원 데이터) ----------
  async renderSiteInfo(cwsId) {
    const site = await DB.getSite(cwsId);
    if (!site) return `<div class="empty-state"><h3>현장을 찾을 수 없습니다</h3></div>`;
    const items = (await DB.scheduleBySite(cwsId)).sort((a, b) => b.date.localeCompare(a.date));
    const progress = await siteLatestProgress(cwsId);

    let ddayLabel = '';
    if (site.endDate) {
      const dday = Math.round((new Date(site.endDate) - new Date(todayStr())) / 86400000);
      ddayLabel = dday >= 0 ? `D-${dday}` : `D+${-dday}`;
    }

    const progressCard = (progress != null || site.contractAmount) ? `
      <div class="card" style="display:flex;align-items:center;gap:16px;padding:18px;margin-bottom:14px;">
        <div style="position:relative;width:70px;height:70px;flex-shrink:0;">
          <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="29" fill="none" stroke="var(--bg-soft)" stroke-width="7"/>
            <circle cx="35" cy="35" r="29" fill="none" stroke="var(--blue)" stroke-width="7" stroke-linecap="round"
              stroke-dasharray="182.2" stroke-dashoffset="${Math.round(182.2 * (1 - (progress || 0) / 100))}" transform="rotate(-90 35 35)"/>
          </svg>
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:800;">${progress != null ? progress + '%' : '-'}</div>
        </div>
        <div style="min-width:0;flex:1;">
          <div style="font-size:12px;color:var(--text-soft);font-weight:600;margin-bottom:4px;">공정률${ddayLabel ? ' · 준공예정 ' + ddayLabel : ''}</div>
          ${site.contractAmount ? `<div style="font-size:13px;font-weight:700;">도급금액 ${Number(site.contractAmount).toLocaleString()}원</div>` : ''}
          <div style="font-size:11.5px;color:var(--text-soft);margin-top:2px;">${escapeHtml([site.contractor, site.workType].filter(Boolean).join(' · '))}</div>
        </div>
      </div>` : '';

    const infoRows = [
      ['CWS ID', site.cwsId],
      ['전화번호', site.phone ? `${escapeHtml(site.phone)} ${copyLink(site.phone, 'copy')}` : ''],
      ['계약일', site.contractDate], ['준공예정', site.endDate],
    ].filter(([, v]) => v);

    return `
      <div class="topbar">
        <div class="topbar-row">
          <button class="icon-btn" data-href="back">${ICONS.back}</button>
          <span style="font-size:15px;font-weight:700;">현장 상세</span>
          <button class="icon-btn" style="margin-left:auto;" data-href="/site-edit/${encodeURIComponent(site.cwsId)}">✎</button>
        </div>
      </div>
      <div>
        <h1 style="margin:0 0 3px;font-size:20px;font-weight:800;letter-spacing:-.01em;line-height:1.3;">${escapeHtml(site.name || '(이름 없음)')}</h1>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:14px;flex-wrap:wrap;">
          <span style="font-size:13px;color:var(--text-soft);">${escapeHtml(site.address || '')}</span>
          ${copyLink(site.address)}
          ${site.team ? pillHtml(site.team, { bg: 'var(--blue-bg)', fg: 'var(--blue-dark)' }) : ''}
        </div>

        ${progressCard}

        <div class="card" style="padding:14px 15px;margin-bottom:16px;">
          <div style="display:grid;grid-template-columns:76px 1fr;row-gap:9px;align-items:center;font-size:12.5px;">
            ${infoRows.map(([k, v]) => `<span style="color:var(--text-soft);">${k}</span><span style="font-weight:700;display:flex;align-items:center;gap:6px;">${v}</span>`).join('')}
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
          <span style="font-size:14px;font-weight:800;">점검 이력</span>
          ${countPill(items.length)}
        </div>

        ${items.length ? `<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;">
          ${items.map((it) => `
            <div class="card" data-href="/item/${it.id}" style="display:flex;align-items:center;gap:10px;padding:12px 13px;cursor:pointer;">
              ${pillHtml(it.inspectionType, typeColor(it.inspectionType), 'flex-shrink:0;')}
              <div style="min-width:0;flex:1;font-size:13px;font-weight:700;">${dateLabel(it)} <span style="color:${statusColor(it.status).fg};">${escapeHtml(it.status)}</span></div>
              ${overdueBadge(it)}
            </div>`).join('')}
        </div>` : `<button class="btn-primary" style="width:100%;" data-href="/add?site=${encodeURIComponent(site.cwsId)}">이 현장으로 일정 추가</button>`}
      </div>`;
  },

  // ---------- 현장 마스터 정보 수정 ----------
  async renderSiteEdit(cwsId) {
    const site = await DB.getSite(cwsId);
    if (!site) return `<div class="empty-state"><h3>현장을 찾을 수 없습니다</h3></div>`;
    const teams = await DB.allTeams();
    const field = (id, label, value, type = 'text') => `
      <div class="field-label">${label}</div>
      <input id="${id}" type="${type}" value="${escapeHtml(value || '')}" class="field-box" style="width:100%;margin-bottom:14px;">`;

    return `
      <div class="topbar">
        <div class="topbar-row">
          <button data-href="back" style="font-size:15px;color:var(--blue);">취소</button>
          <span style="flex:1;text-align:center;font-size:15px;font-weight:700;margin-left:-40px;">현장 정보 수정</span>
        </div>
      </div>
      <div>
        ${field('s-name', '현장명', site.name)}
        <div class="field-label">담당 점검조 <span style="font-weight:500;">(선택)</span></div>
        <input id="s-team" list="s-team-list" value="${escapeHtml(site.team || '')}" placeholder="예: 1조" class="field-box" style="width:100%;margin-bottom:14px;">
        <datalist id="s-team-list">${teams.map((t) => `<option value="${escapeHtml(t)}">`).join('')}</datalist>
        ${field('s-address', '주소', site.address)}
        ${field('s-contractor', '시공자', site.contractor)}
        ${field('s-workType', '공종', site.workType)}
        ${field('s-workDetail', '세부공종', site.workDetail)}
        ${field('s-phone', '전화번호', site.phone)}
        ${field('s-contractDate', '계약일', site.contractDate, 'date')}
        ${field('s-startDate', '착공일', site.startDate, 'date')}
        ${field('s-endDate', '준공예정일', site.endDate, 'date')}
        ${field('s-contractAmount', '도급금액(원)', site.contractAmount, 'number')}
        <button class="btn-primary" style="width:100%;margin-top:4px;" data-action="save-site" data-id="${site.cwsId}">저장</button>
      </div>`;
  },

  // ---------- 현장/일정 상세 ----------
  async renderSiteDetail(id) {
    const item = await DB.getSchedule(id);
    if (!item) return `<div class="empty-state"><h3>일정을 찾을 수 없습니다</h3></div>`;
    const site = item.siteId ? await DB.getSite(item.siteId) : null;
    const siteName = site ? site.name : (item.tempSiteName || '');
    const teams = await DB.allTeams();

    const statusOptions = statusListFor(item.inspectionType);
    const statusBtns = statusOptions.map((s) => {
      const c = statusColor(s);
      const on = item.status === s;
      return `<span data-action="set-status" data-id="${item.id}" data-status="${s}"
        style="height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;gap:5px;font-size:13px;font-weight:700;cursor:pointer;background:${on ? c.fg : c.bg};color:${on ? '#fff' : c.fg};">${on ? ICONS.check : ''}${s}</span>`;
    }).join('');

    return `
      <div class="topbar">
        <div class="topbar-row">
          <button class="icon-btn" data-href="back">${ICONS.back}</button>
          <span style="font-size:15px;font-weight:700;">일정 상세</span>
        </div>
      </div>
      <div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:14px;flex-wrap:wrap;">
          ${pillHtml(item.inspectionType, typeColor(item.inspectionType))}
          ${pillHtml(`${item.time ? item.time + ' ' : ''}${item.status}`, { bg: 'var(--bg-soft)', fg: 'var(--text-soft)' })}
          ${overdueBadge(item)}
        </div>

        <div class="field-label">날짜</div>
        <input id="f-date" type="date" value="${item.date || ''}" class="field-box" style="width:100%;margin-bottom:16px;">

        <div class="field-label">현장</div>
        <div style="position:relative;margin-bottom:8px;">
          <input id="f-site-search" type="text" value="${escapeHtml(siteName)}" placeholder="현장명으로 검색"
            class="field-box" style="width:100%;font-weight:600;" autocomplete="off">
          <input type="hidden" id="f-site-id" value="${site ? site.cwsId : ''}">
          <div id="f-site-suggestions" style="margin-top:6px;border-radius:12px;overflow:hidden;"></div>
        </div>
        <label style="display:flex;align-items:center;gap:8px;margin-bottom:16px;cursor:pointer;">
          <input type="checkbox" id="f-new-site" ${item.siteId ? '' : 'checked'} style="width:18px;height:18px;">
          <span style="font-size:13px;color:var(--blue);font-weight:600;">마스터에 없는 새 현장 직접 입력</span>
        </label>

        <div class="field-label">점검조 <span style="font-weight:500;">(선택)</span></div>
        <input id="f-team" list="f-team-list" value="${escapeHtml(item.team || '')}" placeholder="예: 1조" class="field-box" style="width:100%;margin-bottom:16px;">
        <datalist id="f-team-list">${teams.map((t) => `<option value="${escapeHtml(t)}">`).join('')}</datalist>

        <div class="field-label">점검구분</div>
        <div id="f-type-chips" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
          ${INSPECTION_TYPES.map((t) => `<span class="chip ${t === item.inspectionType ? 'selected' : ''}" data-type="${t}">${t}</span>`).join('')}
        </div>

        <div class="field-label">예정 시간 <span style="font-weight:500;">(선택)</span></div>
        <input id="f-time" type="time" value="${item.time || ''}" class="field-box" style="width:100%;margin-bottom:16px;">

        ${await siteInfoGridHtml(site)}

        <div style="font-size:12px;font-weight:700;color:var(--text-soft);margin-bottom:7px;">점검 상태 변경</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px;">${statusBtns}</div>

        ${await extraFieldsDetailHtml(item)}

        <div class="field-label">메모 <span style="font-weight:500;">(선택)</span></div>
        <textarea id="f-memo" placeholder="점검 중 발견한 사항을 여기에 기록하세요" style="width:100%;min-height:70px;padding:11px 13px;border-radius:12px;background:var(--surface);border:1px solid var(--border);font-size:13px;line-height:1.5;font-family:inherit;resize:vertical;margin-bottom:20px;">${escapeHtml(item.memo || '')}</textarea>

        <button class="btn-primary" style="width:100%;margin-bottom:14px;" data-action="save-schedule" data-id="${item.id}">저장</button>
        <div style="text-align:center;font-size:14px;font-weight:600;color:var(--red);cursor:pointer;" data-action="delete-item" data-id="${item.id}">이 일정 삭제</div>
      </div>`;
  },

  // ---------- 새 일정 추가 ----------
  async renderAddEdit(presetSiteId) {
    const site = presetSiteId ? await DB.getSite(presetSiteId) : null;
    const team = site && site.team ? site.team : '';
    const teams = await DB.allTeams();

    return `
      <div class="topbar">
        <div class="topbar-row">
          <button data-href="back" style="font-size:15px;color:var(--blue);">취소</button>
          <span style="flex:1;text-align:center;font-size:15px;font-weight:700;margin-left:-40px;">새 일정 추가</span>
        </div>
      </div>
      <div>
        <div class="field-label">날짜</div>
        <input id="f-date" type="date" value="${todayStr()}" class="field-box" style="width:100%;margin-bottom:16px;">

        <div class="field-label">현장</div>
        <div style="position:relative;margin-bottom:8px;">
          <input id="f-site-search" type="text" value="${escapeHtml(site ? site.name : '')}" placeholder="현장명으로 검색"
            class="field-box" style="width:100%;font-weight:600;" autocomplete="off">
          <input type="hidden" id="f-site-id" value="${site ? site.cwsId : ''}">
          <div id="f-site-suggestions" style="margin-top:6px;border-radius:12px;overflow:hidden;"></div>
        </div>
        <label style="display:flex;align-items:center;gap:8px;margin-bottom:16px;cursor:pointer;">
          <input type="checkbox" id="f-new-site" style="width:18px;height:18px;">
          <span style="font-size:13px;color:var(--blue);font-weight:600;">마스터에 없는 새 현장 직접 입력</span>
        </label>

        <div class="field-label">점검조 <span style="font-weight:500;">(선택)</span></div>
        <input id="f-team" list="f-team-list" value="${escapeHtml(team)}" placeholder="예: 1조" class="field-box" style="width:100%;margin-bottom:16px;">
        <datalist id="f-team-list">${teams.map((t) => `<option value="${escapeHtml(t)}">`).join('')}</datalist>

        <div class="field-label">점검구분</div>
        <div id="f-type-chips" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
          ${INSPECTION_TYPES.map((t) => `<span class="chip ${t === '일반' ? 'selected' : ''}" data-type="${t}">${t}</span>`).join('')}
        </div>

        <div class="field-label">예정 시간 <span style="font-weight:500;">(선택)</span></div>
        <input id="f-time" type="time" value="" class="field-box" style="width:100%;margin-bottom:16px;">

        <div class="field-label">메모 <span style="font-weight:500;">(선택)</span></div>
        <textarea id="f-memo" placeholder="준비물이나 확인할 사항" style="width:100%;min-height:70px;padding:11px 13px;border-radius:12px;background:var(--surface);border:1px solid var(--border);font-size:13px;font-family:inherit;resize:vertical;margin-bottom:20px;"></textarea>

        <button class="btn-primary" style="width:100%;" data-action="save-schedule" data-id="">일정 저장</button>
      </div>`;
  },

  _wireAddEdit() {
    const searchInput = document.getElementById('f-site-search');
    const suggestBox = document.getElementById('f-site-suggestions');
    const siteIdInput = document.getElementById('f-site-id');
    const newSiteCheck = document.getElementById('f-new-site');
    const teamInput = document.getElementById('f-team');
    if (!searchInput) return;

    let debounce = null;
    searchInput.addEventListener('input', () => {
      siteIdInput.value = '';
      clearTimeout(debounce);
      debounce = setTimeout(async () => {
        if (newSiteCheck.checked || !searchInput.value.trim()) { suggestBox.innerHTML = ''; return; }
        const results = await DB.searchSites(searchInput.value);
        suggestBox.innerHTML = results.map((s) => `
          <div class="card" data-pick-site="${s.cwsId}" data-pick-name="${escapeHtml(s.name)}" data-pick-team="${escapeHtml(s.team || '')}" style="padding:11px 13px;cursor:pointer;border-bottom:1px solid var(--border-soft);">
            <div style="font-size:13.5px;font-weight:600;">${escapeHtml(s.name)}</div>
          </div>`).join('');
      }, 200);
    });

    suggestBox.addEventListener('click', (e) => {
      const el = e.target.closest('[data-pick-site]');
      if (!el) return;
      siteIdInput.value = el.dataset.pickSite;
      searchInput.value = el.dataset.pickName;
      // 점검조를 아직 직접 입력하지 않았다면 선택한 현장의 담당 점검조로 채워준다.
      if (!teamInput.value.trim() && el.dataset.pickTeam) teamInput.value = el.dataset.pickTeam;
      suggestBox.innerHTML = '';
    });

    newSiteCheck.addEventListener('change', () => {
      siteIdInput.value = '';
      searchInput.value = '';
      suggestBox.innerHTML = '';
      searchInput.placeholder = newSiteCheck.checked ? '새 현장 이름을 입력하세요' : '현장명으로 검색';
    });
  },

  // ---------- 설정 ----------
  async renderSettings() {
    const sites = await DB.allSites();
    const items = await DB.allSchedule();
    const row = (label, right) => `<div style="display:flex;align-items:center;padding:13px 15px;">
        <span style="font-size:15px;">${label}</span>
        <span style="margin-left:auto;font-size:15px;font-weight:700;color:var(--text-soft);">${right}</span>
      </div>`;
    const navRow = (label, href) => `<div data-href="${href}" style="display:flex;align-items:center;padding:13px 15px;cursor:pointer;">
        <span style="font-size:15px;">${label}</span>
        <span style="margin-left:auto;color:var(--text-mute);">›</span>
      </div>`;
    return `
      <div class="topbar"><div class="topbar-row"><h1 class="topbar-title">설정</h1></div></div>
      <div class="card" style="overflow:hidden;margin-bottom:20px;">
        ${row('저장된 현장 마스터', sites.length + '건')}
        <div style="height:1px;background:var(--border);margin:0 15px;"></div>
        ${row('저장된 점검 일정', items.length + '건')}
      </div>

      <div style="font-size:12px;font-weight:700;color:var(--text-soft);text-transform:uppercase;margin:0 4px 6px;">엑셀</div>
      <div class="card" style="overflow:hidden;margin-bottom:20px;">
        ${navRow('엑셀로 넣기', '/upload')}
        <div style="height:1px;background:var(--border);margin:0 15px;"></div>
        ${navRow('엑셀로 내보내기', '/export')}
      </div>

      <div style="font-size:12px;font-weight:700;color:var(--text-soft);text-transform:uppercase;margin:0 4px 6px;">데이터</div>
      <div class="card" style="overflow:hidden;margin-bottom:20px;">
        ${navRow('저장된 데이터 보기·삭제', '/data')}
      </div>

      ${await siteFieldSettingsHtml()}
      ${await extraFieldSettingsHtml()}

      <div style="font-size:12.5px;color:var(--text-soft);margin:0 4px 20px;line-height:1.5;">모든 데이터는 이 기기(브라우저)에만 저장됩니다. 기기를 바꾸면 데이터가 이전되지 않습니다.</div>

      <div class="card" style="overflow:hidden;">
        <div data-action="clear-all" style="display:flex;align-items:center;justify-content:center;padding:13px 15px;cursor:pointer;">
          <span style="font-size:15px;font-weight:600;color:var(--red);">모든 데이터 초기화</span>
        </div>
      </div>`;
  },

  // ---------- 가져온 데이터 확인 ----------
  async renderDataManage(params) {
    const kind = ['excel', 'all', 'sites', 'unscheduled'].includes(params.get('kind')) ? params.get('kind') : 'excel';
    const query = (params.get('q') || '').trim();
    const qn = query.toLowerCase();
    const pageSize = 50;
    const sites = await DB.allSites();
    const activeTeams = await DB.getSetting('activeTeams', []);
    const allItems = filterByTeam(await DB.allSchedule(), activeTeams);
    const siteMap = new Map(sites.map((s) => [s.cwsId, s]));
    const excelCount = allItems.filter((it) => it.source === 'EXCEL').length;
    const unscheduledCount = allItems.filter((it) => !it.date).length;
    const sel = window._dataSelected || (window._dataSelected = new Set());

    let records;
    if (kind === 'sites') {
      records = sites.filter((s) => !qn || [s.name, s.address, s.contractor, s.cwsId].some((v) => String(v || '').toLowerCase().includes(qn)));
      records.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ko'));
    } else {
      records = allItems.filter((it) => kind === 'unscheduled' ? !it.date : (kind === 'all' || it.source === 'EXCEL'));
      records = records.filter((it) => {
        if (!qn) return true;
        const site = it.siteId ? siteMap.get(it.siteId) : null;
        const name = site ? site.name : it.tempSiteName;
        return [name, it.date, it.dateNote, it.inspectionType, it.status, it.team, it.sourceFile]
          .some((v) => String(v || '').toLowerCase().includes(qn));
      });
      // 날짜 없는 항목은 정렬 방향과 무관하게 항상 맨 뒤로 보낸다.
      records.sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return (b.date + (b.time || '')).localeCompare(a.date + (a.time || ''));
      });
    }

    const totalPages = Math.max(1, Math.ceil(records.length / pageSize));
    const page = Math.min(totalPages, Math.max(1, Number(params.get('page')) || 1));
    const shown = records.slice((page - 1) * pageSize, page * pageSize);
    const hrefFor = (nextPage) => `/data?kind=${kind}&page=${nextPage}${query ? `&q=${encodeURIComponent(query)}` : ''}`;

    const header = `
      <div class="topbar">
        <div class="topbar-row">
          <h1 class="topbar-title">데이터</h1>
          <button class="icon-btn" style="margin-left:auto;" data-href="/settings" aria-label="설정">${ICONS.settings}</button>
        </div>
      </div>
      ${teamFilterBadge(activeTeams)}
      <div class="card" style="padding:14px;margin-bottom:12px;">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);text-align:center;">
          <div><div style="font-size:20px;font-weight:900;">${excelCount}</div><div style="font-size:11.5px;color:var(--text-soft);">엑셀 일정</div></div>
          <div style="border-left:1px solid var(--border);"><div style="font-size:20px;font-weight:900;">${allItems.length}</div><div style="font-size:11.5px;color:var(--text-soft);">전체 일정</div></div>
          <div style="border-left:1px solid var(--border);"><div style="font-size:20px;font-weight:900;">${sites.length}</div><div style="font-size:11.5px;color:var(--text-soft);">현장 마스터</div></div>
          <div style="border-left:1px solid var(--border);"><div style="font-size:20px;font-weight:900;color:${unscheduledCount ? 'var(--red)' : 'var(--text)'};">${unscheduledCount}</div><div style="font-size:11.5px;color:var(--text-soft);">미배정</div></div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
        <button class="btn-primary" style="height:44px;" data-href="/upload">${ICONS.upload} 엑셀 넣기</button>
        ${kind === 'sites'
          ? `<button class="btn-secondary" data-action="export-sites">${ICONS.download} 현장 내보내기</button>`
          : `<button class="btn-secondary" data-href="/export">${ICONS.download} 내보내기</button>`}
      </div>
      <div class="data-tabs">
        <div class="data-tab ${kind === 'excel' ? 'active' : ''}" data-href="/data?kind=excel">엑셀 일정</div>
        <div class="data-tab ${kind === 'all' ? 'active' : ''}" data-href="/data?kind=all">전체 일정</div>
        <div class="data-tab ${kind === 'sites' ? 'active' : ''}" data-href="/data?kind=sites">현장 마스터</div>
        <div class="data-tab ${kind === 'unscheduled' ? 'active' : ''}" data-href="/data?kind=unscheduled">미배정</div>
      </div>
      <input id="data-q" class="data-search" data-kind="${kind}" value="${escapeHtml(query)}" placeholder="${kind === 'sites' ? '현장명·주소·시공자 검색' : '현장명·날짜·상태·파일명 검색'}">
      <div style="display:flex;align-items:center;margin:10px 2px 9px;">
        <span style="font-size:13px;font-weight:800;">${query ? '검색 결과' : (kind === 'sites' ? '저장된 현장' : kind === 'all' ? '저장된 전체 일정' : kind === 'unscheduled' ? '날짜가 배정되지 않은 일정' : '엑셀로 가져온 일정')}</span>
        <span style="margin-left:auto;font-size:12px;color:var(--text-soft);">${records.length}건 · ${page}/${totalPages}페이지</span>
      </div>
      ${kind === 'unscheduled' && records.length ? `<div style="font-size:12px;color:var(--text-soft);margin:-3px 2px 10px;line-height:1.5;">엑셀에 날짜가 없거나("예비"/"준공") 비어 있어 스케줄에 못 들어간 항목입니다. 눌러서 날짜를 배정하세요.</div>` : ''}
      ${sel.size && kind !== 'sites' ? `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--blue-bg);border-radius:12px;margin-bottom:10px;">
          <span style="font-size:13px;font-weight:700;">${sel.size}건 선택</span>
          <span data-action="cancel-data-select" style="font-size:13px;color:var(--text-soft);cursor:pointer;">해제</span>
          <span data-action="delete-data-selected" style="margin-left:auto;padding:7px 11px;border-radius:9px;background:var(--red);color:#fff;font-size:13px;font-weight:700;cursor:pointer;">삭제</span>
        </div>` : ''}`;

    let rows = '';
    if (!shown.length) {
      rows = `<div class="empty-state" style="padding:42px 20px;"><h3>${query ? '검색 결과가 없습니다' : (kind === 'unscheduled' ? '날짜 미배정 항목이 없습니다' : '저장된 데이터가 없습니다')}</h3><p>${kind === 'excel' ? '엑셀을 넣으면 여기에서 모든 행을 확인할 수 있습니다.' : kind === 'unscheduled' ? '엑셀의 모든 행이 날짜를 가지고 있어요.' : '데이터를 추가하면 여기에 표시됩니다.'}</p></div>`;
    } else if (kind === 'sites') {
      rows = shown.map((s) => `
        <div class="data-row" data-href="/site/${encodeURIComponent(s.cwsId)}" style="cursor:pointer;">
          <div style="display:flex;align-items:center;gap:8px;"><span style="font-size:14.5px;font-weight:800;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(s.name || '(이름 없음)')}</span><span style="margin-left:auto;color:var(--text-mute);font-size:20px;">›</span></div>
          <div style="font-size:12px;color:var(--text-soft);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(s.contractor || '시공자 없음')} · ${escapeHtml(s.address || '주소 없음')}</div>
          <div style="font-size:11px;color:var(--text-mute);margin-top:4px;">${escapeHtml(s.cwsId)}</div>
        </div>`).join('');
    } else {
      rows = shown.map((it) => {
        const site = it.siteId ? siteMap.get(it.siteId) : null;
        const name = site ? site.name : (it.tempSiteName || '(현장명 없음)');
        return `
          <div class="data-row" style="display:flex;align-items:center;gap:10px;">
            <input type="checkbox" data-action="toggle-data-select" data-id="${it.id}" ${sel.has(it.id) ? 'checked' : ''} style="width:20px;height:20px;flex-shrink:0;">
            <div data-href="/item/${it.id}" style="min-width:0;flex:1;cursor:pointer;">
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:5px;">${pillHtml(it.inspectionType, typeColor(it.inspectionType))}${pillHtml(it.status, statusColor(it.status))}</div>
              <div style="font-size:14px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(name)}</div>
              <div style="font-size:11.5px;color:${it.date ? 'var(--text-soft)' : 'var(--red)'};margin-top:3px;">${dateLabel(it)}${it.time ? ' · ' + escapeHtml(it.time) : ''}${it.team ? ' · ' + escapeHtml(normalizeTeam(it.team)) : ''}</div>
              <div style="font-size:11px;color:var(--text-mute);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${it.source === 'EXCEL' ? [it.sourceFile || '엑셀에서 가져옴', it.sourceSheet, it.sourceRow ? `${it.sourceRow}행` : ''].filter(Boolean).map(escapeHtml).join(' · ') : '직접 입력'}</div>
            </div>
          </div>`;
      }).join('');
    }

    const pagination = totalPages > 1 ? `
      <div class="pagination">
        <div class="page-btn ${page === 1 ? 'disabled' : ''}" data-href="${hrefFor(page - 1)}">${ICONS.chevronL} 이전</div>
        <span style="font-size:13px;font-weight:700;color:var(--text-soft);">${page} / ${totalPages}</span>
        <div class="page-btn ${page === totalPages ? 'disabled' : ''}" data-href="${hrefFor(page + 1)}">다음 ${ICONS.chevronR}</div>
      </div>` : '';

    return header + `<div style="display:flex;flex-direction:column;gap:8px;">${rows}</div>${pagination}`;
  },

  // 이전 데이터 관리 화면은 내부 호환용으로 유지한다.
  async renderDataManageLegacy() {
    const sel = window._dataSelected || (window._dataSelected = new Set());
    const list = (await DB.allSchedule()).sort((a, b) => b.date.localeCompare(a.date));
    const sites = await DB.allSites();
    const siteMap = new Map(sites.map((s) => [s.cwsId, s]));

    const header = `
      <div class="topbar">
        <div class="topbar-row">
          <button class="icon-btn" data-href="back">${ICONS.back}</button>
          <span style="font-size:15px;font-weight:700;">저장된 데이터</span>
          ${countPill(list.length, { bg: 'var(--blue-bg)', fg: 'var(--blue-dark)' })}
        </div>
      </div>
      ${sel.size ? `
      <div style="display:flex;align-items:center;gap:10px;padding:10px 16px;background:rgba(0,136,255,.08);margin-bottom:8px;">
        <span style="font-size:13px;font-weight:700;">${sel.size}건 선택됨</span>
        <span data-action="cancel-data-select" style="font-size:13px;color:var(--text-soft);cursor:pointer;">선택 해제</span>
        <span data-action="delete-data-selected" style="margin-left:auto;height:32px;padding:0 14px;border-radius:9px;background:var(--red);color:#fff;display:flex;align-items:center;font-size:13px;font-weight:700;cursor:pointer;">선택 삭제</span>
      </div>` : ''}`;

    if (!list.length) {
      return header + `<div class="empty-state"><p style="margin:60px 0 0;">저장된 일정이 없습니다.</p></div>`;
    }

    const bySite = new Map();
    list.forEach((s) => {
      const site = siteMap.get(s.siteId);
      const key = site ? site.name : (s.tempSiteName || '(현장 미지정)');
      if (!bySite.has(key)) bySite.set(key, []);
      bySite.get(key).push(s);
    });

    const groups = [...bySite.entries()].map(([siteName, sItems]) => {
      const byWeek = new Map();
      sItems.forEach((s) => {
        const wk = weekLabel(s.date);
        if (!byWeek.has(wk)) byWeek.set(wk, []);
        byWeek.get(wk).push(s);
      });
      const weeksHtml = [...byWeek.entries()].map(([label, wItems]) => `
        <div style="margin-bottom:10px;">
          <div style="font-size:11.5px;font-weight:700;color:var(--text-soft);margin:0 2px 6px;">${label} · ${wItems.length}건</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${wItems.map((s) => `
              <div class="card" style="display:flex;align-items:center;gap:10px;padding:12px 13px;">
                <input type="checkbox" data-action="toggle-data-select" data-id="${s.id}" ${sel.has(s.id) ? 'checked' : ''} style="width:19px;height:19px;flex-shrink:0;">
                <div style="min-width:0;flex:1;">
                  <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
                    ${pillHtml(s.inspectionType, typeColor(s.inspectionType))}
                    <span style="font-size:11px;color:var(--text-soft);">${s.date} ${s.time || ''}</span>
                  </div>
                  <div style="font-size:11px;color:${statusColor(s.status).fg};font-weight:700;">${escapeHtml(s.status)} <span style="color:var(--text-soft);font-weight:400;">· ${s.source === 'EXCEL' ? '엑셀' : '직접입력'}</span></div>
                </div>
                <span data-action="delete-data-item" data-id="${s.id}" style="flex-shrink:0;width:30px;height:30px;border-radius:9px;background:var(--red-bg);color:var(--red);display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;cursor:pointer;">×</span>
              </div>`).join('')}
          </div>
        </div>`).join('');
      return `
        <div style="margin-bottom:18px;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
            <span style="font-size:14px;font-weight:800;">${escapeHtml(siteName)}</span>
            ${pillHtml(`${sItems.length}건`, { bg: 'var(--bg-soft)', fg: 'var(--text-soft)' })}
          </div>
          ${weeksHtml}
        </div>`;
    }).join('');

    return header + groups;
  },

  // ---------- 엑셀 업로드 ----------
  async renderUpload(params, result) {
    if (window._lastImportResult) {
      const r = window._lastImportResult;
      window._lastImportResult = null;
      return `
        <div class="topbar"><div class="topbar-row"><button class="icon-btn" data-href="/data">${ICONS.back}</button><span style="font-size:15px;font-weight:700;">엑셀로 넣기</span></div></div>
        <div class="card" style="padding:16px;margin-bottom:14px;">
          <div style="font-size:14px;font-weight:800;margin-bottom:10px;">가져오기 결과</div>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:13.5px;">
            <div style="display:flex;"><span style="color:var(--text-soft);">새 일정</span><span style="margin-left:auto;font-weight:700;color:var(--blue);">${r.scheduleNew}건</span></div>
            <div style="display:flex;"><span style="color:var(--text-soft);">기존 갱신</span><span style="margin-left:auto;font-weight:700;">${r.scheduleUpdated}건</span></div>
            <div style="display:flex;"><span style="color:var(--text-soft);">현장 마스터 갱신</span><span style="margin-left:auto;font-weight:700;">${r.masterUpserted}건</span></div>
            <div style="height:1px;background:var(--border);margin:2px 0;"></div>
            <div style="display:flex;"><span style="color:var(--text-soft);">인식한 전체 행</span><span style="margin-left:auto;font-weight:700;">${r.totalDetectedRows ?? (r.totalScheduleRows + r.masterUpserted)}건</span></div>
            <div style="display:flex;"><span style="color:var(--text-soft);">저장하지 못한 행</span><span style="margin-left:auto;font-weight:700;color:${r.skippedRows ? 'var(--red)' : 'var(--green)'};">${r.skippedRows || 0}건</span></div>
          </div>
        </div>
        ${(r.sheets && r.sheets.length) ? `
        <div class="card" style="padding:14px;margin-bottom:14px;">
          <div style="font-size:13px;font-weight:800;margin-bottom:9px;">시트별 인식 결과</div>
          <div style="display:flex;flex-direction:column;gap:7px;">
            ${r.sheets.map((s) => `<div style="display:flex;align-items:center;gap:8px;font-size:12px;"><span style="min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(s.name)}</span><span style="color:${s.kind ? 'var(--green)' : 'var(--red)'};font-weight:700;">${s.kind === 'schedule' ? '일정' : s.kind === 'master' ? '현장' : '미인식'} ${s.rows}행</span></div>`).join('')}
          </div>
        </div>` : ''}
        <button class="btn-primary" style="width:100%;margin-bottom:16px;" data-href="/data">저장된 데이터 모두 보기</button>
        ${(() => {
          const dated = (r.importedItems || []).filter((it) => it.date);
          const unscheduled = (r.importedItems || []).filter((it) => !it.date);
          const itemCard = (it) => `
            <div class="card" data-href="/item/${it.id}" style="display:flex;align-items:center;gap:10px;padding:11px 13px;cursor:pointer;">
              ${pillHtml(it.inspectionType || '일반', typeColor(it.inspectionType), 'flex-shrink:0;')}
              <div style="min-width:0;flex:1;">
                <div style="font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(it.name || '(현장명 없음)')}</div>
                <div style="font-size:11px;color:${it.date ? 'var(--text-soft)' : 'var(--red)'};">${dateLabel(it)}</div>
              </div>
              ${it.isNew ? pillHtml('신규', { bg: 'var(--green-bg)', fg: 'var(--green)' }, 'flex-shrink:0;') : pillHtml('갱신', { bg: 'var(--bg-soft)', fg: 'var(--text-soft)' }, 'flex-shrink:0;')}
            </div>`;
          return `
            ${unscheduled.length ? `
            <div class="card" style="padding:14px;margin-bottom:14px;border:1px solid var(--red-bg);">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                <span style="font-size:13.5px;font-weight:800;color:var(--red);">미배정(날짜 없음) ${unscheduled.length}건</span>
              </div>
              <div style="font-size:12px;color:var(--text-soft);line-height:1.5;margin-bottom:10px;">엑셀에 점검일자가 비어 있거나 "예비"/"준공" 등으로 적혀 있어 스케줄에 날짜를 넣지 못했습니다. 목록은 저장돼 있으니 나중에 날짜를 배정하면 됩니다.</div>
              <details>
                <summary style="cursor:pointer;font-size:12.5px;font-weight:700;color:var(--blue);">목록 보기</summary>
                <div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;">
                  ${unscheduled.map(itemCard).join('')}
                </div>
              </details>
            </div>` : ''}
            ${dated.length ? `
            <div style="font-size:13px;font-weight:800;margin-bottom:8px;">들어온 일정 (${dated.length}건)</div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${dated.map(itemCard).join('')}
            </div>` : ''}`;
        })()}`;
    }

    return `
      <div class="topbar"><div class="topbar-row"><button class="icon-btn" data-href="/data">${ICONS.back}</button><span style="font-size:15px;font-weight:700;">엑셀로 넣기</span></div></div>
      <div style="border:1.5px dashed var(--border);border-radius:16px;padding:36px 20px;text-align:center;margin-bottom:20px;">
        <div style="font-size:15px;font-weight:700;margin-bottom:6px;">점검계획 또는 현장 마스터 엑셀 선택</div>
        <div style="font-size:12.5px;color:var(--text-soft);margin-bottom:16px;">.xlsx, .xls 파일을 지원합니다. 파일 하나로 자동 구분해서 처리합니다.</div>
        <button class="btn-primary" style="padding:0 20px;height:42px;margin:0 auto;" data-action="pick-file">파일 선택</button>
      </div>`;
  },

  // ---------- 엑셀 내보내기 ----------
  async renderExport() {
    const wkStart = startOfWeek(todayStr());
    const wkEnd = addDays(wkStart, 6);
    return `
      <div class="topbar"><div class="topbar-row"><button class="icon-btn" data-href="/settings">${ICONS.back}</button><span style="font-size:15px;font-weight:700;">엑셀로 내보내기</span></div></div>
      <div class="field-label">기간</div>
      <div style="display:flex;gap:8px;margin-bottom:12px;">
        <button class="chip" data-action="set-range" data-start="${wkStart}" data-end="${wkEnd}" style="flex:1;justify-content:center;">이번 주</button>
        <button class="chip" data-action="set-range" data-start="${monthRange(new Date().getFullYear(), new Date().getMonth()).start}" data-end="${monthRange(new Date().getFullYear(), new Date().getMonth()).end}" style="flex:1;justify-content:center;">이번 달</button>
      </div>
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:16px;">
        <input id="exp-start" type="date" value="${wkStart}" class="field-box" style="flex:1;font-size:13px;">
        <span style="color:var(--text-soft);">~</span>
        <input id="exp-end" type="date" value="${wkEnd}" class="field-box" style="flex:1;font-size:13px;">
      </div>
      <div style="font-size:12.5px;color:var(--text-soft);margin-bottom:20px;line-height:1.5;">엑셀에 있던 컬럼(현장 정보·엑셀 원본 항목 전부)과 앱의 상태·메모까지 모두 담깁니다. 값이 없는 칸은 공란으로 비웁니다.<br>날짜 미배정 항목이 있으면 기간과 무관하게 "미배정" 시트로 함께 담깁니다.</div>
      <button class="btn-primary" style="width:100%;" data-action="do-export">엑셀로 내보내기</button>`;
  },
};
