// 화면별 HTML을 만드는 렌더 함수 모음
const ICONS = {
  calendar: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  today: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2v4M16 2v4M3 10h18"/><circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg>',
  site: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16"/><path d="M6 20V10l6-5 6 5v10"/><path d="M10 20v-5h4v5"/></svg>',
  settings: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>',
  back: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevronL: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevronR: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  clock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  search: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  upload: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15V6a2 2 0 0 0-2-2H9"/><path d="M3 9v9a2 2 0 0 0 2 2h9"/><path d="m3 9 6-6"/></svg>',
  download: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>',
  plus: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  trash: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"/></svg>',
  copy: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
};

function copyBtn(value) {
  if (!value) return '';
  return `<button data-action="copy" data-value="${escapeHtml(value)}" style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:8px;background:var(--bg-soft);color:var(--text-mute);flex-shrink:0;">${ICONS.copy}</button>`;
}

async function siteNameOf(item) {
  if (item.siteId) {
    const s = await DB.getSite(item.siteId);
    return s ? s.name : (item.tempSiteName || '(현장명 없음)');
  }
  return item.tempSiteName || '(현장명 없음)';
}

function itemRow(item, name, opts = {}) {
  const timeLabel = item.time ? `${item.time} · ` : '';
  return `
    <div class="card" data-href="/item/${item.id}" style="display:flex;align-items:center;gap:11px;padding:12px 14px;cursor:pointer;${opts.done ? 'opacity:.6;' : ''}">
      <span class="pill pill-${typeColor(item.inspectionType)}">${escapeHtml(item.inspectionType)}</span>
      <div style="min-width:0;flex:1;">
        <div style="font-size:13.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(name)}</div>
        <div style="font-size:11px;color:var(--text-mute);">${timeLabel}${escapeHtml(item.status)}</div>
      </div>
    </div>`;
}

const Views = {
  async afterRender(path) {
    if (path === '/add' || path.startsWith('/add/')) Views._wireAddEdit();
  },

  // ---------- 오늘 ----------
  async renderToday() {
    const date = todayStr();
    const items = (await DB.scheduleByDate(date)).sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99'));
    const named = await Promise.all(items.map(async (it) => ({ it, name: await siteNameOf(it) })));

    const header = `
      <div class="topbar">
        <div class="topbar-row">
          <div>
            <div class="topbar-sub">${formatKoreanDate(date)}</div>
            <h1 class="topbar-title">오늘 할 일</h1>
          </div>
          <button class="icon-btn" style="margin-left:auto" data-href="/calendar">${ICONS.calendar}</button>
        </div>
      </div>`;

    if (!named.length) {
      return header + `
        <div class="empty-state">
          ${ICONS.today}
          <h3>오늘 예정된 점검이 없습니다</h3>
          <p>엑셀로 이번 주 계획을 넣거나,<br>직접 일정을 추가해보세요.</p>
          <div style="display:flex;gap:8px;justify-content:center;">
            <button class="btn-secondary" style="padding:0 16px;" data-href="/upload">${ICONS.upload} 엑셀로 넣기</button>
            <button class="btn-primary" style="padding:0 16px;" data-href="/add">${ICONS.plus.replace('24','14').replace('24','14')} 직접 추가</button>
          </div>
        </div>`;
    }

    const next = named.find((n) => n.it.status !== '완료');
    const hero = next ? `
      <div style="border-radius:16px;padding:18px;margin-bottom:18px;background:linear-gradient(135deg,#2f6fed 0%,#2457d6 100%);box-shadow:0 10px 26px rgba(47,111,237,.28);cursor:pointer;" data-href="/item/${next.it.id}">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;color:rgba(255,255,255,.85);">
          ${ICONS.clock}
          <span style="font-size:11.5px;font-weight:700;">${next.it.status === '진행중' ? '진행중인 점검' : '다음 점검'}</span>
        </div>
        <div style="color:#fff;font-size:17px;font-weight:800;letter-spacing:-.01em;margin-bottom:4px;">${escapeHtml(next.name)}</div>
        <div style="color:rgba(255,255,255,.85);font-size:12px;">${next.it.time ? next.it.time + ' 예정 · ' : ''}${escapeHtml(next.it.inspectionType)}</div>
      </div>` : `
      <div class="card" style="padding:16px;margin-bottom:18px;display:flex;align-items:center;gap:10px;">
        <span style="color:var(--green);">${ICONS.check}</span>
        <span style="font-size:13.5px;font-weight:700;">오늘 일정을 모두 마쳤습니다</span>
      </div>`;

    const list = named.map(({ it, name }) => itemRow(it, name, { done: it.status === '완료' })).join('');

    return header + `
      <div style="display:flex;align-items:center;margin-bottom:10px;">
        <span style="font-size:13px;font-weight:800;">오늘의 일정</span>
        <span class="pill pill-blue" style="margin-left:6px;">${named.length}건</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">${hero.includes('data-href="/item') ? '' : ''}</div>
      ${hero}
      <div style="display:flex;flex-direction:column;gap:8px;">${list}</div>`;
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
    const dotsByDate = {};
    items.forEach((it) => {
      dotsByDate[it.date] = dotsByDate[it.date] || new Set();
      dotsByDate[it.date].add(typeColor(it.inspectionType));
    });

    const first = new Date(year, month, 1);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    let cells = '';
    for (let i = 0; i < startWeekday; i++) {
      const dnum = prevMonthDays - startWeekday + 1 + i;
      cells += `<div style="text-align:center;padding:6px 0;opacity:.3;font-size:12.5px;">${dnum}</div>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${pad2(month + 1)}-${pad2(d)}`;
      const isToday = dateStr === todayStr();
      const isSelected = dateStr === selected;
      const dots = dotsByDate[dateStr];
      const dotHtml = dots ? `<div style="display:flex;gap:2px;justify-content:center;margin-top:2px;">${[...dots].slice(0, 3).map((c) => `<i style="width:4px;height:4px;border-radius:50%;background:var(--${c === 'gray' ? 'text-mute' : c});"></i>`).join('')}</div>` : '<div style="height:6px;"></div>';
      const numHtml = isToday
        ? `<span style="width:24px;height:24px;border-radius:50%;background:var(--blue);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;margin:0 auto;">${d}</span>`
        : `<span style="display:block;text-align:center;${isSelected ? 'font-weight:800;color:var(--blue);' : ''}">${d}</span>`;
      cells += `<div data-href="/calendar?date=${dateStr}&month=${year}-${pad2(month + 1)}" style="padding:4px 0;cursor:pointer;${isSelected && !isToday ? 'background:var(--blue-bg);border-radius:10px;' : ''}">${numHtml}${dotHtml}</div>`;
    }

    const prevMonth = month === 0 ? `${year - 1}-12` : `${year}-${pad2(month)}`;
    const nextMonth = month === 11 ? `${year + 1}-01` : `${year}-${pad2(month + 2)}`;

    const selItems = (await DB.scheduleByDate(selected)).sort((a, b) => (a.time || '99:99').localeCompare(b.time || '99:99'));
    const named = await Promise.all(selItems.map(async (it) => ({ it, name: await siteNameOf(it) })));

    return `
      <div class="topbar">
        <div class="topbar-row">
          <h1 class="topbar-title">캘린더</h1>
          <button class="icon-btn" style="margin-left:auto;" data-href="/calendar?date=${todayStr()}&month=${todayStr().slice(0,7)}">오늘</button>
        </div>
      </div>
      <div style="display:flex;align-items:center;margin-bottom:8px;">
        <span style="font-size:14px;font-weight:800;">${year}년 ${month + 1}월</span>
        <div style="margin-left:auto;display:flex;gap:4px;">
          <button class="icon-btn" style="width:28px;height:28px;" data-href="/calendar?date=${selected}&month=${prevMonth}">${ICONS.chevronL}</button>
          <button class="icon-btn" style="width:28px;height:28px;" data-href="/calendar?date=${selected}&month=${nextMonth}">${ICONS.chevronR}</button>
        </div>
      </div>
      <div class="card" style="margin-bottom:16px;padding:10px 6px;">
        <div style="display:grid;grid-template-columns:repeat(7,1fr);margin-bottom:4px;">
          ${WEEKDAY_KR.map((w, i) => `<span style="text-align:center;font-size:11px;font-weight:700;color:${i === 0 ? 'var(--red)' : i === 6 ? 'var(--blue-dark)' : 'var(--text-mute)'};">${w}</span>`).join('')}
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,1fr);row-gap:4px;font-size:12.5px;">${cells}</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
        <span style="font-size:13px;font-weight:800;">${formatKoreanDate(selected)}</span>
        <span class="pill pill-blue">${named.length}건</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${named.length ? named.map(({ it, name }) => itemRow(it, name, { done: it.status === '완료' })).join('') : '<div style="color:var(--text-mute);font-size:12.5px;padding:12px 2px;">이 날짜엔 일정이 없습니다.</div>'}
      </div>`;
  },

  // ---------- 현장(전체 목록) ----------
  async renderSites(params) {
    const q = params.get('q') || '';
    const all = await DB.allSchedule();
    all.sort((a, b) => b.date.localeCompare(a.date));
    const named = await Promise.all(all.map(async (it) => ({ it, name: await siteNameOf(it) })));
    const filtered = q ? named.filter(({ name, it }) => name.includes(q) || it.inspectionType.includes(q)) : named;

    const header = `
      <div class="topbar">
        <div class="topbar-row">
          <h1 class="topbar-title">현장</h1>
        </div>
        <div style="margin-top:12px;display:flex;align-items:center;gap:8px;height:38px;padding:0 12px;border-radius:11px;background:var(--bg-soft);">
          ${ICONS.search}
          <input id="site-q" value="${escapeHtml(q)}" placeholder="현장명 · 점검구분 검색" style="border:none;background:none;outline:none;flex:1;font-size:13px;">
        </div>
      </div>`;

    if (!filtered.length) {
      return header + `<div class="empty-state">${ICONS.site}<h3>표시할 일정이 없습니다</h3><p>엑셀을 넣거나 검색어를 바꿔보세요.</p></div>`;
    }

    return header + `<div style="display:flex;flex-direction:column;gap:8px;">
      ${filtered.map(({ it, name }) => `
        <div class="card" data-href="/item/${it.id}" style="padding:12px 14px;cursor:pointer;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
            <span class="pill pill-${typeColor(it.inspectionType)}">${escapeHtml(it.inspectionType)}</span>
            <span class="pill pill-${statusColor(it.status)}">${escapeHtml(it.status)}</span>
            <span style="margin-left:auto;font-size:11px;color:var(--text-mute);">${it.date}</span>
          </div>
          <div style="font-size:13.5px;font-weight:700;">${escapeHtml(name)}</div>
        </div>`).join('')}
    </div>`;
  },

  // ---------- 현장/일정 상세 ----------
  async renderSiteDetail(id) {
    const item = await DB.getSchedule(id);
    if (!item) return `<div class="empty-state"><h3>일정을 찾을 수 없습니다</h3></div>`;
    const site = item.siteId ? await DB.getSite(item.siteId) : null;
    const name = site ? site.name : (item.tempSiteName || '(현장명 없음)');

    const statusBtns = STATUS_LIST.map((s) => `
      <button data-action="set-status" data-id="${item.id}" data-status="${s}"
        style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:9px 4px;border-radius:11px;
        background:${item.status === s ? `var(--${statusColor(s)}-bg)` : 'var(--bg-soft)'};
        border:1.5px solid ${item.status === s ? `var(--${statusColor(s) === 'blue' ? 'blue-dark' : statusColor(s)})` : 'transparent'};">
        <span style="font-size:11.5px;font-weight:800;color:${item.status === s ? `var(--${statusColor(s) === 'blue' ? 'blue-dark' : statusColor(s)})` : 'var(--text-soft)'};">${s}</span>
      </button>`).join('');

    const infoRows = (site ? [
      ['시공자', site.contractor], ['공종', [site.workType, site.workDetail].filter(Boolean).join(' · ')],
      ['전화번호', site.phone], ['계약일', site.contractDate],
      ['준공예정', site.endDate], ['도급금액', site.contractAmount ? Number(site.contractAmount).toLocaleString() + '원' : ''],
    ] : []).filter(([, v]) => v);

    return `
      <div class="topbar">
        <div class="topbar-row">
          <button class="icon-btn" data-href="back">${ICONS.back}</button>
          <span style="font-size:14px;font-weight:700;">현장 상세</span>
          <button class="icon-btn" style="margin-left:auto;" data-href="/add/${item.id}">✎</button>
        </div>
      </div>
      <div style="padding-top:2px;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
          <span class="pill pill-${typeColor(item.inspectionType)}">${escapeHtml(item.inspectionType)}</span>
          <span class="pill pill-gray">${formatKoreanDate(item.date)}${item.time ? ' · ' + item.time : ''}</span>
        </div>
        <h1 style="margin:0 0 3px;font-size:19px;font-weight:800;letter-spacing:-.01em;line-height:1.3;">${escapeHtml(name)}</h1>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:18px;">
          <span style="font-size:12.5px;color:var(--text-soft);">${escapeHtml(site ? site.address : '마스터 정보 없음 · 임시로 담긴 현장')}</span>
          ${site && site.address ? copyBtn(site.address) : ''}
        </div>

        <div style="font-size:11.5px;font-weight:700;color:var(--text-mute);margin-bottom:7px;">점검 상태</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:16px;">${statusBtns}</div>

        ${infoRows.length ? `
        <div class="card" style="padding:13px 15px;margin-bottom:16px;">
          <div style="display:grid;grid-template-columns:70px 1fr;row-gap:9px;align-items:center;font-size:12.5px;">
            ${infoRows.map(([k, v]) => `<span style="color:var(--text-mute);font-weight:600;">${k}</span><span style="font-weight:700;display:flex;align-items:center;gap:6px;">${escapeHtml(v)}${k === '전화번호' ? copyBtn(v) : ''}</span>`).join('')}
          </div>
        </div>` : ''}

        <div style="font-size:11.5px;font-weight:700;color:var(--text-mute);margin-bottom:7px;">비고</div>
        <textarea id="memo-input" placeholder="점검 중 발견한 사항을 적어두세요" style="width:100%;min-height:80px;padding:12px 14px;border-radius:12px;background:#fff;border:1px solid var(--border);font-size:13px;line-height:1.5;font-family:inherit;resize:vertical;margin-bottom:12px;">${escapeHtml(item.memo || '')}</textarea>
        <button class="btn-primary" style="width:100%;margin-bottom:8px;" data-action="save-memo" data-id="${item.id}">저장</button>
        <button class="btn-secondary" style="width:100%;color:var(--red);" data-action="delete-item" data-id="${item.id}">${ICONS.trash} 이 일정 삭제</button>
      </div>`;
  },

  // ---------- 새 일정 추가 / 수정 ----------
  async renderAddEdit(id) {
    const existing = id ? await DB.getSchedule(id) : null;
    const site = existing && existing.siteId ? await DB.getSite(existing.siteId) : null;
    const date = existing ? existing.date : todayStr();
    const siteName = site ? site.name : (existing ? existing.tempSiteName : '') || '';
    const type = existing ? existing.inspectionType : '일반';
    const time = existing ? (existing.time || '') : '';
    const memo = existing ? (existing.memo || '') : '';

    return `
      <div class="topbar">
        <div class="topbar-row">
          <button data-href="back" style="font-size:13px;font-weight:700;color:var(--text-mute);">취소</button>
          <span style="margin-left:auto;font-size:15px;font-weight:800;">${existing ? '일정 수정' : '새 일정 추가'}</span>
          <span style="margin-left:auto;visibility:hidden;font-size:13px;">취소</span>
        </div>
      </div>
      <div>
        <div style="margin-bottom:18px;">
          <div class="field-label">날짜</div>
          <input id="f-date" type="date" value="${date}" class="field-box" style="width:100%;">
        </div>

        <div style="margin-bottom:6px;position:relative;">
          <div class="field-label">현장</div>
          <input id="f-site-search" type="text" value="${escapeHtml(siteName)}" placeholder="현장명으로 검색"
            class="field-box" style="width:100%;font-weight:600;" autocomplete="off">
          <input type="hidden" id="f-site-id" value="${existing && existing.siteId ? existing.siteId : ''}">
          <div id="f-site-suggestions" style="margin-top:6px;border-radius:12px;overflow:hidden;"></div>
          <label style="display:flex;align-items:center;gap:6px;margin-top:8px;font-size:11.5px;font-weight:700;color:var(--blue);">
            <input type="checkbox" id="f-new-site" ${existing && !existing.siteId ? 'checked' : ''}> 마스터에 없는 새 현장 직접 입력
          </label>
        </div>

        <div style="margin-bottom:18px;">
          <div class="field-label">점검구분</div>
          <div id="f-type-chips" style="display:flex;flex-wrap:wrap;gap:7px;">
            ${INSPECTION_TYPES.map((t) => `<span class="chip ${t === type ? 'selected' : ''}" data-type="${t}">${t}</span>`).join('')}
          </div>
        </div>

        <div style="margin-bottom:18px;">
          <div class="field-label">예정 시간 <span style="font-weight:500;color:var(--text-mute);">(선택)</span></div>
          <input id="f-time" type="time" value="${time}" class="field-box" style="width:100%;">
        </div>

        <div style="margin-bottom:18px;">
          <div class="field-label">메모 <span style="font-weight:500;color:var(--text-mute);">(선택)</span></div>
          <textarea id="f-memo" placeholder="준비물이나 확인할 사항" style="width:100%;min-height:70px;padding:12px 14px;border-radius:12px;background:#fff;border:1px solid var(--border);font-size:13px;font-family:inherit;resize:vertical;">${escapeHtml(memo)}</textarea>
        </div>

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
          <div class="card" data-pick-site="${s.cwsId}" data-pick-name="${escapeHtml(s.name)}" style="padding:10px 14px;cursor:pointer;border-bottom:1px solid var(--border-soft);">
            <div style="font-size:12.5px;font-weight:700;">${escapeHtml(s.name)}</div>
            <div style="font-size:10.5px;color:var(--text-mute);">CWS ${s.cwsId} · ${escapeHtml(s.address || '')}</div>
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
    return `
      <div class="topbar"><div class="topbar-row"><h1 class="topbar-title">설정</h1></div></div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div class="card" data-href="/upload" style="padding:14px;display:flex;align-items:center;gap:12px;cursor:pointer;">
          <span class="icon-btn" style="background:var(--green-bg);color:var(--green);">${ICONS.upload}</span>
          <div><div style="font-size:13.5px;font-weight:800;">엑셀로 넣기</div><div style="font-size:11px;color:var(--text-mute);">점검계획 · 현장 마스터 업로드</div></div>
        </div>
        <div class="card" data-href="/export" style="padding:14px;display:flex;align-items:center;gap:12px;cursor:pointer;">
          <span class="icon-btn" style="background:var(--blue-bg);color:var(--blue-dark);">${ICONS.download}</span>
          <div><div style="font-size:13.5px;font-weight:800;">엑셀로 내보내기</div><div style="font-size:11px;color:var(--text-mute);">기간을 골라 .xlsx로 저장</div></div>
        </div>
        <div class="card" style="padding:14px;">
          <div style="font-size:13px;font-weight:800;margin-bottom:8px;">저장된 데이터</div>
          <div style="font-size:12px;color:var(--text-soft);">현장 마스터 ${sites.length}건 · 점검 일정 ${items.length}건</div>
          <div style="font-size:11px;color:var(--text-mute);margin-top:4px;">모든 데이터는 이 기기(브라우저)에만 저장됩니다.</div>
        </div>
        <button class="btn-secondary" style="color:var(--red);" data-action="clear-all">${ICONS.trash} 모든 데이터 초기화</button>
      </div>`;
  },

  // ---------- 엑셀 업로드 ----------
  async renderUpload(params, result) {
    if (window._lastImportResult) {
      const r = window._lastImportResult;
      window._lastImportResult = null;
      return `
        <div class="topbar"><div class="topbar-row"><button class="icon-btn" data-href="/settings">${ICONS.back}</button><span style="font-size:14px;font-weight:700;">엑셀로 넣기</span></div></div>
        <div class="card" style="padding:16px;margin-bottom:14px;">
          <div style="font-size:14px;font-weight:800;margin-bottom:10px;">가져오기 완료</div>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:10px;">
            <div style="padding:11px 13px;border-radius:12px;background:var(--green-bg);"><div style="font-size:11px;color:var(--green);font-weight:600;">새 일정</div><div style="font-size:19px;font-weight:800;color:var(--green);">${r.scheduleNew}</div></div>
            <div style="padding:11px 13px;border-radius:12px;background:var(--blue-bg);"><div style="font-size:11px;color:var(--blue-dark);font-weight:600;">기존 갱신</div><div style="font-size:19px;font-weight:800;color:var(--blue-dark);">${r.scheduleUpdated}</div></div>
          </div>
          <div style="font-size:12px;color:var(--text-soft);">현장 마스터 ${r.masterUpserted}건 갱신됨</div>
        </div>
        <button class="btn-primary" style="width:100%;" data-href="/today">오늘 일정 보기</button>`;
    }

    return `
      <div class="topbar"><div class="topbar-row"><button class="icon-btn" data-href="/settings">${ICONS.back}</button><span style="font-size:14px;font-weight:700;">엑셀로 넣기</span></div></div>
      <div class="empty-state" style="padding-top:30px;">
        ${ICONS.upload}
        <h3>점검계획 또는 현장 마스터 엑셀을 올리세요</h3>
        <p>파일 하나로 자동 구분해서 처리합니다.<br>CWS공사ID · 점검일자 · 점검구분 컬럼을 찾습니다.</p>
        <button class="btn-primary" style="padding:0 20px;margin:0 auto;" data-action="pick-file">${ICONS.upload} 파일 선택</button>
      </div>`;
  },

  // ---------- 엑셀 내보내기 ----------
  async renderExport() {
    const wkStart = startOfWeek(todayStr());
    const wkEnd = addDays(wkStart, 6);
    return `
      <div class="topbar"><div class="topbar-row"><button class="icon-btn" data-href="/settings">${ICONS.back}</button><span style="font-size:14px;font-weight:700;">엑셀로 내보내기</span></div></div>
      <div style="margin-bottom:18px;">
        <div class="field-label">기간</div>
        <div style="display:flex;gap:8px;margin-bottom:8px;">
          <button class="chip" data-action="set-range" data-start="${wkStart}" data-end="${wkEnd}" style="flex:1;text-align:center;">이번 주</button>
          <button class="chip" data-action="set-range" data-start="${monthRange(new Date().getFullYear(), new Date().getMonth()).start}" data-end="${monthRange(new Date().getFullYear(), new Date().getMonth()).end}" style="flex:1;text-align:center;">이번 달</button>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <input id="exp-start" type="date" value="${wkStart}" class="field-box" style="flex:1;font-size:12.5px;">
          <span style="color:var(--text-mute);">~</span>
          <input id="exp-end" type="date" value="${wkEnd}" class="field-box" style="flex:1;font-size:12.5px;">
        </div>
      </div>
      <div style="margin-bottom:18px;">
        <label class="card" style="display:flex;align-items:center;gap:10px;padding:13px 15px;">
          <input type="checkbox" id="exp-master">
          <div><div style="font-size:13px;font-weight:700;">현장 마스터 정보 포함</div><div style="font-size:10.5px;color:var(--text-mute);">시공자 · 도급금액 · 준공예정일 등</div></div>
        </label>
      </div>
      <button class="btn-primary" style="width:100%;" data-action="do-export">${ICONS.download} 엑셀로 내보내기</button>`;
  },
};
