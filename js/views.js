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
};

const ADD_BTN = `<button class="icon-btn" data-action="open-add-choice" style="background:var(--blue);">${ICONS.plusSmall}</button>`;

function pillHtml(label, color, extra = '') {
  return `<span class="pill" style="background:${color.bg};color:${color.fg};${extra}">${escapeHtml(label)}</span>`;
}
function countPill(n, color = { bg: 'var(--blue-bg)', fg: 'var(--blue-dark)' }) {
  return pillHtml(`${n}건`, color);
}
function overdueBadge(item) {
  if (!isOverdue(item)) return '';
  return pillHtml(`⚠ 조치 지연 ${overdueDays(item)}일`, { bg: 'var(--red-bg)', fg: 'var(--red)' });
}
function copyLink(value, action = 'copy') {
  if (!value) return '';
  return `<span data-action="${action}" data-value="${escapeHtml(value)}" style="color:var(--blue);font-weight:700;font-size:11.5px;cursor:pointer;">복사</span>`;
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

// 일정 상세에 보여줄 schedule.extra 블록. 기본 표시 항목은 값이 없어도 공란으로 노출하고,
// 나머지는 <details>(더보기)에 모아 전부 볼 수 있게 한다. 모든 값은 입력창으로 바로 수정 가능.
async function extraFieldsDetailHtml(item) {
  const extra = item.extra || {};
  const visibleFields = await DB.getSetting('visibleExtraFields', DEFAULT_VISIBLE_EXTRA_FIELDS);
  const moreKeys = Object.keys(extra).filter((k) => !visibleFields.includes(k));
  if (!visibleFields.length && !moreKeys.length) return '';

  const fieldRow = (key, value) => `
    <div style="margin-bottom:10px;">
      <div style="font-size:11.5px;color:var(--text-soft);margin-bottom:4px;">${escapeHtml(key)}</div>
      <input type="text" class="field-box extra-field-input" data-field="${escapeHtml(key)}" value="${escapeHtml(value ?? '')}" style="width:100%;">
    </div>`;

  return `
    <div style="font-size:12px;font-weight:700;color:var(--text-soft);margin-bottom:7px;">추가 정보</div>
    <div class="card" style="padding:14px 15px;margin-bottom:14px;">
      ${visibleFields.map((k) => fieldRow(k, extra[k])).join('')}
      ${moreKeys.length ? `
      <details>
        <summary style="cursor:pointer;font-size:13px;font-weight:700;color:var(--blue);margin-bottom:10px;">더보기 (${moreKeys.length})</summary>
        ${moreKeys.map((k) => fieldRow(k, extra[k])).join('')}
      </details>` : ''}
      <button class="btn-secondary" style="width:100%;" data-action="save-extra" data-id="${item.id}">추가 정보 저장</button>
    </div>`;
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
    if (path === '/add' || path.startsWith('/add/')) Views._wireAddEdit();
  },

  // ---------- 업무 현황 ----------
  async renderToday() {
    const today = todayStr();
    const weekEnd = addDays(today, 6);
    const items = await DB.allSchedule();
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

    const { start, end } = monthRange(year, month);
    const items = await DB.scheduleInRange(start, end);
    const firstTypeByDate = {};
    items.forEach((it) => { if (!firstTypeByDate[it.date]) firstTypeByDate[it.date] = it.inspectionType; });

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
      const weekday = new Date(year, month, d).getDay();
      const numColor = isSelected ? '#fff' : weekday === 0 ? 'var(--red)' : 'var(--text)';
      const circleBg = isSelected ? 'var(--blue)' : isToday ? 'var(--blue-bg)' : 'transparent';
      cells += `
        <div data-href="/calendar?date=${dateStr}&month=${year}-${pad2(month + 1)}" style="text-align:center;padding:4px 0;cursor:pointer;">
          <div style="width:30px;height:30px;line-height:30px;border-radius:50%;margin:0 auto;font-size:13.5px;font-weight:${isSelected ? 800 : 500};color:${numColor};background:${circleBg};position:relative;">
            ${d}
            ${t ? `<i style="position:absolute;bottom:-1px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:${dotColor};"></i>` : ''}
          </div>
        </div>`;
    }

    const prevMonth = month === 0 ? `${year - 1}-12` : `${year}-${pad2(month)}`;
    const nextMonth = month === 11 ? `${year + 1}-01` : `${year}-${pad2(month + 2)}`;

    const selItems = (await DB.scheduleByDate(selected)).sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99'));
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
          <div class="card" data-href="/item/${it.id}" style="display:flex;align-items:center;gap:10px;padding:12px 13px;cursor:pointer;">
            <span style="width:30px;height:30px;flex-shrink:0;border-radius:9px;background:${typeColor(it.inspectionType).bg};color:${typeColor(it.inspectionType).fg};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">${escapeHtml(name[0] || '?')}</span>
            <div style="min-width:0;flex:1;">
              <div style="font-size:14px;font-weight:700;">${escapeHtml(name)}</div>
              <div style="font-size:11.5px;color:var(--text-soft);">${it.time ? it.time + ' ' : ''}<span style="font-weight:700;color:${statusColor(it.status).fg};">${escapeHtml(it.status)}</span> · ${escapeHtml(it.inspectionType)}</div>
            </div>
            ${overdueBadge(it)}
          </div>`).join('') : '<div style="color:var(--text-soft);font-size:13.5px;padding:24px 0;text-align:center;">이 날짜엔 일정이 없습니다.</div>'}
      </div>`;
  },

  // ---------- 현장(마스터 전체 목록) ----------
  async renderSites(params) {
    const q = params.get('q') || '';
    const sites = await DB.allSites();

    const header = `
      <div class="topbar">
        <div class="topbar-row">
          <h1 class="topbar-title">현장</h1>
          <div style="margin-left:auto;">${ADD_BTN}</div>
        </div>
        <input id="site-q" value="${escapeHtml(q)}" placeholder="현장명·주소·시공자로 검색" style="margin-top:10px;width:100%;height:38px;border-radius:10px;border:none;background:var(--bg-soft);padding:0 12px;font-size:14px;color:var(--text);outline:none;">
      </div>`;

    if (!sites.length) {
      return header + `<div class="empty-state">${ICONS.site}<h3>등록된 현장이 없습니다</h3><p>설정 → 엑셀로 넣기에서<br>현장 마스터 엑셀을 올려보세요.</p>
        <button class="btn-primary" style="padding:0 20px;margin:0 auto;" data-href="/upload">엑셀로 넣기</button>
      </div>`;
    }

    const qn = q.trim().toLowerCase();
    const filtered = qn
      ? sites.filter((s) => (s.name || '').toLowerCase().includes(qn) || (s.address || '').toLowerCase().includes(qn) || (s.contractor || '').toLowerCase().includes(qn))
      : sites;
    filtered.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ko'));

    const scheduleAll = await DB.allSchedule();
    const countBySite = {};
    scheduleAll.forEach((it) => { if (it.siteId) countBySite[it.siteId] = (countBySite[it.siteId] || 0) + 1; });

    const pageSize = 50;
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const page = Math.min(totalPages, Math.max(1, Number(params.get('page')) || 1));
    const shown = filtered.slice((page - 1) * pageSize, page * pageSize);
    const countLine = qn
      ? `${filtered.length}건 검색됨 (전체 ${sites.length}건)`
      : `전체 ${sites.length}건 · ${page}/${totalPages}페이지`;

    if (!shown.length) {
      return header + `<div class="empty-state">${ICONS.site}<h3>검색 결과가 없습니다</h3><p>다른 검색어를 입력해보세요.</p></div>`;
    }

    const rows = await Promise.all(shown.map(async (s) => {
      const progress = await siteLatestProgress(s.cwsId);
      const progressRow = progress != null ? `
          <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
            <div style="flex:1;height:5px;border-radius:999px;background:var(--bg-soft);overflow:hidden;"><div style="width:${progress}%;height:5px;background:var(--blue);"></div></div>
            <span style="font-size:11px;font-weight:700;color:var(--text-soft);">공정률 ${progress}%</span>
          </div>` : '';
      return `
        <div class="card" data-href="/site/${encodeURIComponent(s.cwsId)}" style="padding:14px;cursor:pointer;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <span style="font-size:15px;font-weight:800;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(s.name || '(이름 없음)')}</span>
            ${countBySite[s.cwsId] ? countPill(countBySite[s.cwsId]) : ''}
          </div>
          <div style="font-size:12.5px;color:var(--text-soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(s.address || '')}</div>
          ${progressRow}
        </div>`;
    }));

    const pageQuery = qn ? `&q=${encodeURIComponent(q)}` : '';
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
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:14px;">
          <span style="font-size:13px;color:var(--text-soft);">${escapeHtml(site.address || '')}</span>
          ${copyLink(site.address)}
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
              <div style="min-width:0;flex:1;font-size:13px;font-weight:700;">${it.date} <span style="color:${statusColor(it.status).fg};">${escapeHtml(it.status)}</span></div>
              ${overdueBadge(it)}
            </div>`).join('')}
        </div>` : `<button class="btn-primary" style="width:100%;" data-href="/add?site=${encodeURIComponent(site.cwsId)}">이 현장으로 일정 추가</button>`}
      </div>`;
  },

  // ---------- 현장 마스터 정보 수정 ----------
  async renderSiteEdit(cwsId) {
    const site = await DB.getSite(cwsId);
    if (!site) return `<div class="empty-state"><h3>현장을 찾을 수 없습니다</h3></div>`;
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
    const name = site ? site.name : (item.tempSiteName || '(현장명 없음)');

    const statusOptions = statusListFor(item.inspectionType);
    const statusBtns = statusOptions.map((s) => {
      const c = statusColor(s);
      const on = item.status === s;
      return `<span data-action="set-status" data-id="${item.id}" data-status="${s}"
        style="height:40px;padding:0 15px;border-radius:12px;display:flex;align-items:center;font-size:13.5px;font-weight:700;cursor:pointer;background:${on ? c.fg : c.bg};color:${on ? '#fff' : c.fg};">${s}</span>`;
    }).join('');

    const infoRows = (site ? [
      ['시공자', escapeHtml(site.contractor)], ['공종', escapeHtml([site.workType, site.workDetail].filter(Boolean).join(' · '))],
      ['전화번호', site.phone ? `${escapeHtml(site.phone)} ${copyLink(site.phone)}` : ''],
      ['준공예정', escapeHtml(site.endDate)],
    ] : []).filter(([, v]) => v);

    return `
      <div class="topbar">
        <div class="topbar-row">
          <button class="icon-btn" data-href="back">${ICONS.back}</button>
          <span style="font-size:15px;font-weight:700;">일정 상세</span>
          <button class="icon-btn" style="margin-left:auto;" data-href="/add/${item.id}">✎</button>
        </div>
      </div>
      <div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;flex-wrap:wrap;">
          ${pillHtml(item.inspectionType, typeColor(item.inspectionType))}
          ${pillHtml(`${item.time ? item.time + ' ' : ''}${item.status}`, { bg: 'var(--bg-soft)', fg: 'var(--text-soft)' })}
          ${overdueBadge(item)}
        </div>
        <h1 style="margin:0 0 3px;font-size:20px;font-weight:800;letter-spacing:-.01em;line-height:1.3;">${escapeHtml(name)}</h1>
        <div style="font-size:13px;color:var(--text-soft);margin-bottom:18px;">${escapeHtml(site ? site.address : '마스터 정보 없음 · 임시로 담긴 현장')}</div>

        <div style="font-size:12px;font-weight:700;color:var(--text-soft);margin-bottom:7px;">점검 상태 변경</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">${statusBtns}</div>

        ${infoRows.length ? `
        <div class="card" style="padding:14px 15px;margin-bottom:14px;">
          <div style="display:grid;grid-template-columns:76px 1fr;row-gap:9px;align-items:center;font-size:12.5px;">
            ${infoRows.map(([k, v]) => `<span style="color:var(--text-soft);">${k}</span><span style="font-weight:700;display:flex;align-items:center;gap:6px;">${v}</span>`).join('')}
          </div>
        </div>` : ''}

        ${await extraFieldsDetailHtml(item)}

        <div style="font-size:12px;font-weight:700;color:var(--text-soft);margin-bottom:7px;">비고</div>
        <textarea id="memo-input" placeholder="점검 중 발견한 사항을 여기에 기록하세요" style="width:100%;min-height:70px;padding:11px 13px;border-radius:12px;background:var(--surface);border:1px solid var(--border);font-size:13px;line-height:1.5;font-family:inherit;resize:vertical;margin-bottom:12px;">${escapeHtml(item.memo || '')}</textarea>
        <button class="btn-primary" style="width:100%;margin-bottom:14px;" data-action="save-memo" data-id="${item.id}">저장</button>
        <div style="text-align:center;font-size:14px;font-weight:600;color:var(--red);cursor:pointer;" data-action="delete-item" data-id="${item.id}">이 일정 삭제</div>
      </div>`;
  },

  // ---------- 새 일정 추가 / 수정 ----------
  async renderAddEdit(id, presetSiteId) {
    const existing = id ? await DB.getSchedule(id) : null;
    let site = existing && existing.siteId ? await DB.getSite(existing.siteId) : null;
    if (!existing && presetSiteId) site = await DB.getSite(presetSiteId);
    const date = existing ? existing.date : todayStr();
    const siteName = site ? site.name : (existing ? existing.tempSiteName : '') || '';
    const type = existing ? existing.inspectionType : '일반';
    const time = existing ? (existing.time || '') : '';
    const memo = existing ? (existing.memo || '') : '';

    return `
      <div class="topbar">
        <div class="topbar-row">
          <button data-href="back" style="font-size:15px;color:var(--blue);">취소</button>
          <span style="flex:1;text-align:center;font-size:15px;font-weight:700;margin-left:-40px;">${existing ? '일정 수정' : '새 일정 추가'}</span>
        </div>
      </div>
      <div>
        <div class="field-label">날짜</div>
        <input id="f-date" type="date" value="${date}" class="field-box" style="width:100%;margin-bottom:16px;">

        <div class="field-label">현장</div>
        <div style="position:relative;margin-bottom:8px;">
          <input id="f-site-search" type="text" value="${escapeHtml(siteName)}" placeholder="현장명으로 검색"
            class="field-box" style="width:100%;font-weight:600;" autocomplete="off">
          <input type="hidden" id="f-site-id" value="${site ? site.cwsId : ''}">
          <div id="f-site-suggestions" style="margin-top:6px;border-radius:12px;overflow:hidden;"></div>
        </div>
        <label style="display:flex;align-items:center;gap:8px;margin-bottom:16px;cursor:pointer;">
          <input type="checkbox" id="f-new-site" ${existing && !existing.siteId ? 'checked' : ''} style="width:18px;height:18px;">
          <span style="font-size:13px;color:var(--blue);font-weight:600;">마스터에 없는 새 현장 직접 입력</span>
        </label>

        <div class="field-label">점검구분</div>
        <div id="f-type-chips" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
          ${INSPECTION_TYPES.map((t) => `<span class="chip ${t === type ? 'selected' : ''}" data-type="${t}">${t}</span>`).join('')}
        </div>

        <div class="field-label">예정 시간 <span style="font-weight:500;">(선택)</span></div>
        <input id="f-time" type="time" value="${time}" class="field-box" style="width:100%;margin-bottom:16px;">

        <div class="field-label">메모 <span style="font-weight:500;">(선택)</span></div>
        <textarea id="f-memo" placeholder="준비물이나 확인할 사항" style="width:100%;min-height:70px;padding:11px 13px;border-radius:12px;background:var(--surface);border:1px solid var(--border);font-size:13px;font-family:inherit;resize:vertical;margin-bottom:20px;">${escapeHtml(memo)}</textarea>

        <button class="btn-primary" style="width:100%;" data-action="save-schedule" data-id="${existing ? existing.id : ''}">일정 저장</button>
      </div>`;
  },

  _wireAddEdit() {
    const searchInput = document.getElementById('f-site-search');
    const suggestBox = document.getElementById('f-site-suggestions');
    const siteIdInput = document.getElementById('f-site-id');
    const newSiteCheck = document.getElementById('f-new-site');
    if (!searchInput) return;

    let debounce = null;
    searchInput.addEventListener('input', () => {
      siteIdInput.value = '';
      clearTimeout(debounce);
      debounce = setTimeout(async () => {
        if (newSiteCheck.checked || !searchInput.value.trim()) { suggestBox.innerHTML = ''; return; }
        const results = await DB.searchSites(searchInput.value);
        suggestBox.innerHTML = results.map((s) => `
          <div class="card" data-pick-site="${s.cwsId}" data-pick-name="${escapeHtml(s.name)}" style="padding:11px 13px;cursor:pointer;border-bottom:1px solid var(--border-soft);">
            <div style="font-size:13.5px;font-weight:600;">${escapeHtml(s.name)}</div>
          </div>`).join('');
      }, 200);
    });

    suggestBox.addEventListener('click', (e) => {
      const el = e.target.closest('[data-pick-site]');
      if (!el) return;
      siteIdInput.value = el.dataset.pickSite;
      searchInput.value = el.dataset.pickName;
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
    const kind = ['excel', 'all', 'sites'].includes(params.get('kind')) ? params.get('kind') : 'excel';
    const query = (params.get('q') || '').trim();
    const qn = query.toLowerCase();
    const pageSize = 50;
    const sites = await DB.allSites();
    const allItems = await DB.allSchedule();
    const siteMap = new Map(sites.map((s) => [s.cwsId, s]));
    const excelCount = allItems.filter((it) => it.source === 'EXCEL').length;
    const sel = window._dataSelected || (window._dataSelected = new Set());

    let records;
    if (kind === 'sites') {
      records = sites.filter((s) => !qn || [s.name, s.address, s.contractor, s.cwsId].some((v) => String(v || '').toLowerCase().includes(qn)));
      records.sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ko'));
    } else {
      records = allItems.filter((it) => kind === 'all' || it.source === 'EXCEL');
      records = records.filter((it) => {
        if (!qn) return true;
        const site = it.siteId ? siteMap.get(it.siteId) : null;
        const name = site ? site.name : it.tempSiteName;
        return [name, it.date, it.inspectionType, it.status, it.team, it.sourceFile]
          .some((v) => String(v || '').toLowerCase().includes(qn));
      });
      records.sort((a, b) => (b.date + (b.time || '')).localeCompare(a.date + (a.time || '')));
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
      <div class="card" style="padding:14px;margin-bottom:12px;">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);text-align:center;">
          <div><div style="font-size:20px;font-weight:900;">${excelCount}</div><div style="font-size:11.5px;color:var(--text-soft);">엑셀 일정</div></div>
          <div style="border-left:1px solid var(--border);border-right:1px solid var(--border);"><div style="font-size:20px;font-weight:900;">${allItems.length}</div><div style="font-size:11.5px;color:var(--text-soft);">전체 일정</div></div>
          <div><div style="font-size:20px;font-weight:900;">${sites.length}</div><div style="font-size:11.5px;color:var(--text-soft);">현장 마스터</div></div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
        <button class="btn-primary" style="height:44px;" data-href="/upload">${ICONS.upload} 엑셀 넣기</button>
        <button class="btn-secondary" data-href="/export">${ICONS.download} 내보내기</button>
      </div>
      <div class="data-tabs">
        <div class="data-tab ${kind === 'excel' ? 'active' : ''}" data-href="/data?kind=excel">엑셀 일정</div>
        <div class="data-tab ${kind === 'all' ? 'active' : ''}" data-href="/data?kind=all">전체 일정</div>
        <div class="data-tab ${kind === 'sites' ? 'active' : ''}" data-href="/data?kind=sites">현장 마스터</div>
      </div>
      <input id="data-q" class="data-search" data-kind="${kind}" value="${escapeHtml(query)}" placeholder="${kind === 'sites' ? '현장명·주소·시공자 검색' : '현장명·날짜·상태·파일명 검색'}">
      <div style="display:flex;align-items:center;margin:10px 2px 9px;">
        <span style="font-size:13px;font-weight:800;">${query ? '검색 결과' : (kind === 'sites' ? '저장된 현장' : kind === 'all' ? '저장된 전체 일정' : '엑셀로 가져온 일정')}</span>
        <span style="margin-left:auto;font-size:12px;color:var(--text-soft);">${records.length}건 · ${page}/${totalPages}페이지</span>
      </div>
      ${sel.size && kind !== 'sites' ? `
        <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--blue-bg);border-radius:12px;margin-bottom:10px;">
          <span style="font-size:13px;font-weight:700;">${sel.size}건 선택</span>
          <span data-action="cancel-data-select" style="font-size:13px;color:var(--text-soft);cursor:pointer;">해제</span>
          <span data-action="delete-data-selected" style="margin-left:auto;padding:7px 11px;border-radius:9px;background:var(--red);color:#fff;font-size:13px;font-weight:700;cursor:pointer;">삭제</span>
        </div>` : ''}`;

    let rows = '';
    if (!shown.length) {
      rows = `<div class="empty-state" style="padding:42px 20px;"><h3>${query ? '검색 결과가 없습니다' : '저장된 데이터가 없습니다'}</h3><p>${kind === 'excel' ? '엑셀을 넣으면 여기에서 모든 행을 확인할 수 있습니다.' : '데이터를 추가하면 여기에 표시됩니다.'}</p></div>`;
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
              <div style="font-size:11.5px;color:var(--text-soft);margin-top:3px;">${it.date}${it.time ? ' · ' + escapeHtml(it.time) : ''}${it.team ? ' · ' + escapeHtml(it.team) : ''}</div>
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
        ${(r.importedItems && r.importedItems.length) ? `
        <div style="font-size:13px;font-weight:800;margin-bottom:8px;">들어온 일정 전체 (${r.importedItems.length}건)</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${r.importedItems.map((it) => `
            <div class="card" data-href="/item/${it.id}" style="display:flex;align-items:center;gap:10px;padding:11px 13px;cursor:pointer;">
              ${pillHtml(it.inspectionType, typeColor(it.inspectionType), 'flex-shrink:0;')}
              <div style="min-width:0;flex:1;">
                <div style="font-size:13px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(it.name || '(현장명 없음)')}</div>
                <div style="font-size:11px;color:var(--text-soft);">${it.date}</div>
              </div>
              ${it.isNew ? pillHtml('신규', { bg: 'var(--green-bg)', fg: 'var(--green)' }, 'flex-shrink:0;') : pillHtml('갱신', { bg: 'var(--bg-soft)', fg: 'var(--text-soft)' }, 'flex-shrink:0;')}
            </div>`).join('')}
        </div>` : ''}`;
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
      <label style="display:flex;align-items:center;gap:8px;margin-bottom:20px;cursor:pointer;">
        <input type="checkbox" id="exp-master" style="width:18px;height:18px;">
        <span style="font-size:13.5px;">현장 마스터 정보 포함</span>
      </label>
      <div style="font-size:12.5px;color:var(--text-soft);margin-bottom:20px;line-height:1.5;">기본 내보내기 컬럼: 점검일자, 점검구분, 현장명, 상태, 비고</div>
      <button class="btn-primary" style="width:100%;" data-action="do-export">엑셀로 내보내기</button>`;
  },
};
