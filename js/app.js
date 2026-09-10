// 라우팅과 공통 유틸 - 화면 그리기는 views.js가 담당
const INSPECTION_TYPES = ['일반', '합동점검', '패트롤', '불시점검', '컨설팅', '사망사고 합동점검'];

// 패트롤은 현장에 있는 동안 실시간으로 "진행중"을 쓰고,
// 그 외 점검은 방문 후 지적사항 조치 여부(조치중/조치완료)를 추적한다.
const STATUS_LIST_PATROL = ['예정', '진행중', '완료', '미실시'];
const STATUS_LIST_DEFAULT = ['예정', '완료', '조치중', '조치완료', '미실시'];

function statusListFor(inspectionType) {
  return inspectionType === '패트롤' ? STATUS_LIST_PATROL : STATUS_LIST_DEFAULT;
}

// 엑셀 헤더 중 정식 필드로 매칭되지 않는 나머지 항목(schedule.extra)의 기본 표시 목록.
// 설정 화면에서 사용자가 체크박스로 바꿀 수 있다.
const DEFAULT_VISIBLE_EXTRA_FIELDS = ['지역', '발주자', '우선순위', '위험성', '발생가능사고종류', '안전관리계획서수립대상', '품질'];

// Claude Design(iOS 26) 목업의 TYPE_COLOR/STATUS_COLOR를 그대로 이식
const TYPE_COLOR = {
  '일반': { bg: 'rgba(0,136,255,.12)', fg: '#0a5bb8' },
  '합동점검': { bg: 'rgba(203,48,224,.12)', fg: '#9c1fae' },
  '패트롤': { bg: 'rgba(0,195,208,.14)', fg: '#00778a' },
  '불시점검': { bg: 'rgba(255,141,40,.15)', fg: '#a85400' },
  '컨설팅': { bg: 'rgba(0,200,179,.14)', fg: '#00786b' },
  '사망사고 합동점검': { bg: 'rgba(255,56,60,.12)', fg: '#c81217' },
};
const STATUS_COLOR = {
  '예정': { bg: 'rgba(0,136,255,.12)', fg: '#0a5bb8' },
  '진행중': { bg: 'rgba(97,85,245,.14)', fg: '#5b3fc4' },
  '완료': { bg: 'rgba(52,199,89,.14)', fg: '#1f8a3c' },
  '조치중': { bg: 'rgba(255,141,40,.15)', fg: '#a85400' },
  '조치완료': { bg: 'rgba(0,200,179,.14)', fg: '#00786b' },
  '미실시': { bg: 'rgba(118,118,128,.14)', fg: '#6b6b70' },
};
const GRAY_COLOR = { bg: 'var(--bg-soft)', fg: 'var(--text-soft)' };

function typeColor(t) { return TYPE_COLOR[t] || GRAY_COLOR; }
function statusColor(s) { return STATUS_COLOR[s] || GRAY_COLOR; }

// 엑셀마다 "6조" "6 조" "6조 " 처럼 공백만 다르게 들어오는 걸 같은 조로 취급하기 위한 정규화.
// (excel.js의 normalizeHeader와 같은 방식 — 공백을 전부 제거해 비교)
function normalizeTeam(team) {
  return (team || '').replace(/\s+/g, '');
}

// activeTeams가 비어있으면(전체) 그대로, 아니면 그중 하나라도 걸리는 일정만 남긴다(공백 차이는 같은 조로 취급).
function filterByTeam(items, activeTeams) {
  if (!activeTeams || !activeTeams.length) return items;
  const set = new Set(activeTeams);
  return items.filter((it) => set.has(normalizeTeam(it.team)));
}

// 점검조마다 고유 색을 배정한다(같은 조 이름은 항상 같은 색). 기존에 쓰던 색상만 재사용.
const TEAM_HUE_PALETTE = ['#0a5bb8', '#00778a', '#9c1fae', '#a85400', '#5b3fc4', '#00786b', '#c81217', '#6b6b70'];
function hueForTeam(team) {
  const key = normalizeTeam(team);
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return TEAM_HUE_PALETTE[hash % TEAM_HUE_PALETTE.length];
}

// 조치중 상태가 이어진 일수로 지연 단계를 매긴다: 7일 초과 주의, 10일 초과 경고.
function overdueDays(item) {
  if (item.status !== '조치중') return 0;
  return Math.floor((new Date(todayStr()) - new Date(item.date)) / 86400000);
}
function overdueTier(item) {
  const d = overdueDays(item);
  if (d > 10) return 'danger';
  if (d > 7) return 'warn';
  return null;
}
function isOverdue(item) { return overdueTier(item) !== null; }
// 정렬용 우선순위: 경고(0) → 주의(1) → 해당없음(2)
const TIER_RANK = { danger: 0, warn: 1 };
function tierRank(item) {
  const t = overdueTier(item);
  return t ? TIER_RANK[t] : 2;
}

function pad2(n) { return String(n).padStart(2, '0'); }
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
const WEEKDAY_KR = ['일', '월', '화', '수', '목', '금', '토'];
function formatKoreanDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${WEEKDAY_KR[d.getDay()]})`;
}
function startOfWeek(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() - d.getDay());
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function weekLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const monday = new Date(d); monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6);
  const f = (x) => `${x.getMonth() + 1}/${x.getDate()}`;
  return `${f(monday)} ~ ${f(sunday)} 주`;
}
function monthRange(year, month) {
  const start = `${year}-${pad2(month + 1)}-01`;
  const last = new Date(year, month + 1, 0).getDate();
  const end = `${year}-${pad2(month + 1)}-${pad2(last)}`;
  return { start, end };
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}

// 일정 추가/상세 화면(#f-date 등)의 현재 입력값을 읽는다. 날짜·현장명이 비어 있으면(폼이 없는 화면이거나 아직 안 채워짐) null.
function readScheduleForm() {
  const dateEl = document.getElementById('f-date');
  if (!dateEl) return null;
  const date = dateEl.value;
  const siteId = document.getElementById('f-site-id').value || null;
  const siteName = document.getElementById('f-site-search').value.trim();
  if (!date || !siteName) return null;
  const typeChip = document.querySelector('#f-type-chips .chip.selected');
  return {
    date,
    time: document.getElementById('f-time').value || null,
    inspectionType: typeChip ? typeChip.dataset.type : '일반',
    memo: document.getElementById('f-memo').value,
    team: document.getElementById('f-team').value.trim() || null,
    siteId,
    tempSiteName: siteId ? null : siteName,
  };
}

let toastTimer = null;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

// ---- 라우터 ----
const routes = {
  '/today': Views.renderToday,
  '/calendar': Views.renderCalendar,
  '/sites': Views.renderSites,
  '/settings': Views.renderSettings,
  '/upload': Views.renderUpload,
  '/export': Views.renderExport,
  '/data': Views.renderDataManage,
};

function currentPath() {
  const h = location.hash.replace(/^#/, '') || '/today';
  const [path, query] = h.split('?');
  const params = new URLSearchParams(query || '');
  return { path, params };
}

async function render() {
  const { path, params } = currentPath();
  document.getElementById('sheet-overlay').classList.remove('show');
  document.querySelectorAll('.tab').forEach((el) => el.classList.remove('active'));
  const dataPaths = ['/upload', '/export', '/data'];
  const tabPath = dataPaths.includes(path) ? '/data' : path === '/settings' ? '/today' : path;
  const tabEl = document.querySelector(`.tab[data-path="${tabPath}"]`);
  if (tabEl) tabEl.classList.add('active');

  const fab = document.getElementById('fab');
  fab.style.display = ['/today', '/calendar', '/sites'].includes(path) ? 'flex' : 'none';

  const main = document.getElementById('main');
  let itemMatch = path.match(/^\/item\/(\d+)$/);
  let siteMatch = path.match(/^\/site\/(.+)$/);
  let siteEditMatch = path.match(/^\/site-edit\/(.+)$/);
  if (itemMatch) {
    main.innerHTML = await Views.renderSiteDetail(Number(itemMatch[1]));
  } else if (siteEditMatch) {
    main.innerHTML = await Views.renderSiteEdit(decodeURIComponent(siteEditMatch[1]));
  } else if (siteMatch) {
    main.innerHTML = await Views.renderSiteInfo(decodeURIComponent(siteMatch[1]));
  } else if (path === '/add') {
    main.innerHTML = await Views.renderAddEdit(params.get('site') || undefined);
  } else if (routes[path]) {
    main.innerHTML = await routes[path](params);
  } else {
    main.innerHTML = await Views.renderToday();
  }
  main.scrollTop = 0;
  main.classList.remove('page-anim');
  void main.offsetWidth; // 리플로우를 강제해 매번 애니메이션이 다시 시작되게 함
  main.classList.add('page-anim');
  if (Views.afterRender) Views.afterRender(path);
}

window.addEventListener('hashchange', render);

// ---- 클릭 위임: data-href / data-action ----
document.addEventListener('click', async (e) => {
  const link = e.target.closest('[data-href]');
  if (link) {
    const href = link.dataset.href;
    if (href === 'back') history.back();
    else location.hash = '#' + href;
    return;
  }

  const chip = e.target.closest('#f-type-chips .chip');
  if (chip) {
    document.querySelectorAll('#f-type-chips .chip').forEach((c) => c.classList.remove('selected'));
    chip.classList.add('selected');
    return;
  }

  const rangeBtn = e.target.closest('[data-action="set-range"]');
  if (rangeBtn) {
    document.getElementById('exp-start').value = rangeBtn.dataset.start;
    document.getElementById('exp-end').value = rangeBtn.dataset.end;
    return;
  }

  const actionEl = e.target.closest('[data-action]');
  if (!actionEl) return;
  const action = actionEl.dataset.action;

  if (action === 'open-add-choice') {
    document.getElementById('sheet-overlay').classList.add('show');
  } else if (action === 'close-add-choice') {
    document.getElementById('sheet-overlay').classList.remove('show');
  } else if (action === 'add-choice-manual') {
    document.getElementById('sheet-overlay').classList.remove('show');
    location.hash = '#/add';
  } else if (action === 'add-choice-excel') {
    document.getElementById('sheet-overlay').classList.remove('show');
    location.hash = '#/upload';
  } else if (action === 'toggle-data-select') {
    const id = Number(actionEl.dataset.id);
    const s = window._dataSelected || (window._dataSelected = new Set());
    s.has(id) ? s.delete(id) : s.add(id);
    render();
  } else if (action === 'cancel-data-select') {
    window._dataSelected = new Set();
    render();
  } else if (action === 'delete-data-item') {
    if (confirm('이 일정을 삭제할까요?')) {
      await DB.deleteSchedule(Number(actionEl.dataset.id));
      render();
    }
  } else if (action === 'delete-data-selected') {
    const sel = [...(window._dataSelected || [])];
    if (!sel.length) return;
    if (confirm(`선택한 ${sel.length}건을 삭제할까요?`)) {
      for (const id of sel) await DB.deleteSchedule(id);
      window._dataSelected = new Set();
      render();
    }
  } else if (action === 'copy') {
    const value = actionEl.dataset.value || '';
    let copied = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try { await navigator.clipboard.writeText(value); copied = true; } catch (err) {}
    }
    if (!copied) {
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus(); ta.select();
      try { document.execCommand('copy'); copied = true; } catch (err) {}
      document.body.removeChild(ta);
    }
    toast(copied ? `복사했습니다: ${value}` : '복사에 실패했습니다');
  } else if (action === 'pick-file') {
    document.getElementById('file-input').click();
  } else if (action === 'set-status') {
    // 상태 버튼은 즉시 반영되지만, 같은 화면에 아직 저장 안 된 다른 입력값(날짜 등)이 있으면 함께 저장해 유실을 막는다.
    const form = readScheduleForm() || {};
    await DB.updateSchedule(Number(actionEl.dataset.id), Object.assign({}, form, { status: actionEl.dataset.status }));
    render();
  } else if (action === 'save-extra') {
    const id = Number(actionEl.dataset.id);
    const extra = {};
    document.querySelectorAll('.extra-field-input').forEach((inp) => {
      const v = inp.value.trim();
      if (v) extra[inp.dataset.field] = v;
    });
    await DB.updateSchedule(id, { extra });
    toast('저장했습니다');
  } else if (action === 'apply-sites-period') {
    const start = document.getElementById('sites-start').value;
    const end = document.getElementById('sites-end').value;
    const q = document.getElementById('site-q').value.trim();
    const qs = new URLSearchParams();
    if (start) qs.set('start', start);
    if (end) qs.set('end', end);
    if (q) qs.set('q', q);
    location.hash = '#/sites' + (qs.toString() ? '?' + qs.toString() : '');
  } else if (action === 'toggle-team-filter') {
    const team = actionEl.dataset.team;
    const current = await DB.getSetting('activeTeams', []);
    const set = new Set(current);
    set.has(team) ? set.delete(team) : set.add(team);
    await DB.setSetting('activeTeams', [...set]);
    render();
  } else if (action === 'clear-team-filter') {
    await DB.setSetting('activeTeams', []);
    render();
  } else if (action === 'toggle-extra-field') {
    const field = actionEl.dataset.field;
    const current = await DB.getSetting('visibleExtraFields', DEFAULT_VISIBLE_EXTRA_FIELDS);
    const set = new Set(current);
    if (actionEl.checked) set.add(field); else set.delete(field);
    await DB.setSetting('visibleExtraFields', [...set]);
  } else if (action === 'delete-item') {
    if (confirm('이 일정을 삭제할까요?')) {
      await DB.deleteSchedule(Number(actionEl.dataset.id));
      location.hash = '#/today';
    }
  } else if (action === 'clear-all') {
    if (confirm('저장된 모든 현장·일정 데이터를 지웁니다. 계속할까요?')) {
      await DB.clearAll();
      toast('초기화했습니다');
      render();
    }
  } else if (action === 'save-schedule') {
    const id = actionEl.dataset.id ? Number(actionEl.dataset.id) : null;
    const payload = readScheduleForm();
    if (!payload) { toast('날짜와 현장을 입력해주세요'); return; }
    if (id) {
      await DB.updateSchedule(id, payload);
      toast('저장했습니다');
      render();
    } else {
      const created = await DB.addSchedule(Object.assign({ source: 'MANUAL', status: '예정' }, payload));
      location.hash = '#/item/' + created.id;
    }
  } else if (action === 'save-site') {
    const cwsId = actionEl.dataset.id;
    const get = (id) => document.getElementById(id).value.trim();
    const name = get('s-name');
    if (!name) { toast('현장명을 입력해주세요'); return; }
    await DB.upsertSite({
      cwsId,
      name,
      team: get('s-team') || null,
      address: get('s-address'),
      contractor: get('s-contractor'),
      workType: get('s-workType'),
      workDetail: get('s-workDetail'),
      phone: get('s-phone'),
      contractDate: get('s-contractDate') || null,
      startDate: get('s-startDate') || null,
      endDate: get('s-endDate') || null,
      contractAmount: get('s-contractAmount') || null,
    });
    toast('저장했습니다');
    location.hash = '#/site/' + encodeURIComponent(cwsId);
  } else if (action === 'export-sites') {
    const r = await Excel.exportSitesTemplate();
    toast(`${r.filename} 저장됨 (${r.count}건)`);
  } else if (action === 'do-export') {
    const start = document.getElementById('exp-start').value;
    const end = document.getElementById('exp-end').value;
    const r = await Excel.exportRange(start, end);
    toast(`${r.filename} 저장됨 (${r.count}건${r.unscheduledCount ? ` + 미배정 ${r.unscheduledCount}건` : ''})`);
  }
});

// ---- 현장 검색창(입력 위임) ----
document.addEventListener('input', (e) => {
  if (e.target.id === 'site-q') {
    clearTimeout(window._siteQDebounce);
    window._siteQDebounce = setTimeout(() => {
      const { params } = currentPath();
      const qs = new URLSearchParams();
      if (params.get('start')) qs.set('start', params.get('start'));
      if (params.get('end')) qs.set('end', params.get('end'));
      if (e.target.value) qs.set('q', e.target.value);
      location.hash = '#/sites' + (qs.toString() ? '?' + qs.toString() : '');
    }, 250);
  } else if (e.target.id === 'data-q') {
    clearTimeout(window._dataQDebounce);
    const kind = e.target.dataset.kind || 'excel';
    window._dataQDebounce = setTimeout(() => {
      location.hash = `#/data?kind=${kind}&q=${encodeURIComponent(e.target.value)}`;
    }, 250);
  }
});

// ---- 엑셀 파일 선택 처리 ----
document.getElementById('file-input').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  toast('분석 중...');
  try {
    const result = await Excel.importFile(file);
    window._lastImportResult = result;
    if (currentPath().path !== '/upload') location.hash = '#/upload';
    else render();
  } catch (err) {
    console.error(err);
    toast('파일을 읽지 못했습니다');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  render();
  if ('serviceWorker' in navigator) {
    // updateViaCache:'none' - sw.js 자체를 브라우저 HTTP 캐시로 보지 않고 매번 새로 확인한다.
    navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).then((reg) => {
      reg.update();
    }).catch(() => {});

    // 새 서비스워커가 활성화되면(=새 버전 배포됨) 화면을 한 번 새로고침해 반영한다.
    let refreshed = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshed) return;
      refreshed = true;
      location.reload();
    });
  }
});
