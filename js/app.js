// 라우팅과 공통 유틸 - 화면 그리기는 views.js가 담당
const INSPECTION_TYPES = ['일반', '합동점검', '패트롤', '불시점검', '컨설팅', '사망사고 합동점검'];

// 패트롤은 현장에 있는 동안 실시간으로 "진행중"을 쓰고,
// 그 외 점검은 방문 후 지적사항 조치 여부(조치중/조치완료)를 추적한다.
const STATUS_LIST_PATROL = ['예정', '진행중', '완료', '미실시'];
const STATUS_LIST_DEFAULT = ['예정', '완료', '조치중', '조치완료', '미실시'];

function statusListFor(inspectionType) {
  return inspectionType === '패트롤' ? STATUS_LIST_PATROL : STATUS_LIST_DEFAULT;
}

const TYPE_COLOR = {
  '일반': 'blue', '합동점검': 'purple', '패트롤': 'teal',
  '불시점검': 'orange', '컨설팅': 'green', '사망사고 합동점검': 'red',
};
const STATUS_COLOR = {
  '예정': 'blue', '진행중': 'orange', '완료': 'green', '미실시': 'red',
  '조치중': 'orange', '조치완료': 'teal',
};

function typeColor(t) { return TYPE_COLOR[t] || 'gray'; }
function statusColor(s) { return STATUS_COLOR[s] || 'gray'; }

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
};

function currentPath() {
  const h = location.hash.replace(/^#/, '') || '/today';
  const [path, query] = h.split('?');
  const params = new URLSearchParams(query || '');
  return { path, params };
}

async function render() {
  const { path, params } = currentPath();
  document.querySelectorAll('.tab').forEach((el) => el.classList.remove('active'));
  const tabPath = path === '/upload' || path === '/settings' || path === '/export' ? '/settings' : path;
  const tabEl = document.querySelector(`.tab[data-path="${tabPath}"]`);
  if (tabEl) tabEl.classList.add('active');

  const fab = document.getElementById('fab');
  fab.style.display = ['/today', '/calendar', '/sites'].includes(path) ? 'flex' : 'none';

  const main = document.getElementById('main');
  let itemMatch = path.match(/^\/item\/(\d+)$/);
  let editMatch = path.match(/^\/add\/(\d+)$/);
  let siteMatch = path.match(/^\/site\/(.+)$/);
  if (itemMatch) {
    main.innerHTML = await Views.renderSiteDetail(Number(itemMatch[1]));
  } else if (editMatch) {
    main.innerHTML = await Views.renderAddEdit(Number(editMatch[1]));
  } else if (siteMatch) {
    main.innerHTML = await Views.renderSiteInfo(decodeURIComponent(siteMatch[1]));
  } else if (path === '/add') {
    main.innerHTML = await Views.renderAddEdit(undefined, params.get('site') || undefined);
  } else if (routes[path]) {
    main.innerHTML = await routes[path](params);
  } else {
    main.innerHTML = await Views.renderToday();
  }
  main.scrollTop = 0;
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

  if (action === 'copy') {
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
    await DB.updateSchedule(Number(actionEl.dataset.id), { status: actionEl.dataset.status });
    render();
  } else if (action === 'save-memo') {
    const memo = document.getElementById('memo-input').value;
    await DB.updateSchedule(Number(actionEl.dataset.id), { memo });
    toast('저장했습니다');
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
    const date = document.getElementById('f-date').value;
    const siteId = document.getElementById('f-site-id').value || null;
    const siteName = document.getElementById('f-site-search').value.trim();
    const typeChip = document.querySelector('#f-type-chips .chip.selected');
    const inspectionType = typeChip ? typeChip.dataset.type : '일반';
    const time = document.getElementById('f-time').value || null;
    const memo = document.getElementById('f-memo').value;
    if (!date || !siteName) { toast('날짜와 현장을 입력해주세요'); return; }
    const payload = {
      date, time, inspectionType, memo,
      siteId: siteId || null,
      tempSiteName: siteId ? null : siteName,
    };
    if (id) {
      await DB.updateSchedule(id, payload);
      location.hash = '#/item/' + id;
    } else {
      const created = await DB.addSchedule(Object.assign({ source: 'MANUAL', status: '예정' }, payload));
      location.hash = '#/item/' + created.id;
    }
  } else if (action === 'do-export') {
    const start = document.getElementById('exp-start').value;
    const end = document.getElementById('exp-end').value;
    const includeMaster = document.getElementById('exp-master').checked;
    const r = await Excel.exportRange(start, end, { includeMaster });
    toast(`${r.filename} 저장됨 (${r.count}건)`);
  }
});

// ---- 현장 검색창(입력 위임) ----
document.addEventListener('input', (e) => {
  if (e.target.id === 'site-q') {
    clearTimeout(window._siteQDebounce);
    window._siteQDebounce = setTimeout(() => {
      location.hash = '#/sites?q=' + encodeURIComponent(e.target.value);
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
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});
