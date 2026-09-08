// IndexedDB에 현장(Site)과 점검일정(ScheduleItem)을 저장하는 로컬 저장소
const DB_NAME = 'inspection-notebook';
const DB_VERSION = 1;

let dbPromise = null;

function openDb() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('sites')) {
        db.createObjectStore('sites', { keyPath: 'cwsId' });
      }
      if (!db.objectStoreNames.contains('schedule')) {
        const s = db.createObjectStore('schedule', { keyPath: 'id', autoIncrement: true });
        s.createIndex('date', 'date');
        s.createIndex('siteId', 'siteId');
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

function tx(storeName, mode) {
  return openDb().then((db) => db.transaction(storeName, mode).objectStore(storeName));
}

function reqToPromise(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

const DB = {
  // ---- sites ----
  async upsertSite(site) {
    const store = await tx('sites', 'readwrite');
    const existing = await reqToPromise(store.get(site.cwsId));
    const merged = Object.assign({}, existing, site, { updatedAt: new Date().toISOString() });
    await reqToPromise(store.put(merged));
    return merged;
  },
  async getSite(cwsId) {
    const store = await tx('sites', 'readonly');
    return reqToPromise(store.get(cwsId));
  },
  async allSites() {
    const store = await tx('sites', 'readonly');
    return reqToPromise(store.getAll());
  },
  async searchSites(query) {
    const all = await DB.allSites();
    const q = (query || '').trim().toLowerCase();
    if (!q) return all.slice(0, 20);
    return all.filter((s) =>
      (s.name || '').toLowerCase().includes(q) ||
      (s.address || '').toLowerCase().includes(q) ||
      (s.contractor || '').toLowerCase().includes(q)
    ).slice(0, 20);
  },

  // ---- schedule ----
  async addSchedule(item) {
    const store = await tx('schedule', 'readwrite');
    const now = new Date().toISOString();
    const rec = Object.assign({ status: '예정', createdAt: now, updatedAt: now }, item);
    const id = await reqToPromise(store.add(rec));
    return Object.assign({ id }, rec);
  },
  async updateSchedule(id, patch) {
    const store = await tx('schedule', 'readwrite');
    const existing = await reqToPromise(store.get(id));
    if (!existing) return null;
    const merged = Object.assign({}, existing, patch, { updatedAt: new Date().toISOString() });
    await reqToPromise(store.put(merged));
    return merged;
  },
  async deleteSchedule(id) {
    const store = await tx('schedule', 'readwrite');
    await reqToPromise(store.delete(id));
  },
  async getSchedule(id) {
    const store = await tx('schedule', 'readonly');
    return reqToPromise(store.get(id));
  },
  async allSchedule() {
    const store = await tx('schedule', 'readonly');
    return reqToPromise(store.getAll());
  },
  async scheduleByDate(dateStr) {
    const store = await tx('schedule', 'readonly');
    const idx = store.index('date');
    return reqToPromise(idx.getAll(dateStr));
  },
  async scheduleBySite(cwsId) {
    const store = await tx('schedule', 'readonly');
    const idx = store.index('siteId');
    return reqToPromise(idx.getAll(cwsId));
  },
  async scheduleInRange(startStr, endStr) {
    const all = await DB.allSchedule();
    return all.filter((it) => it.date >= startStr && it.date <= endStr);
  },
  // 같은 현장 · 같은 날짜 · 같은 점검구분이면 기존 것으로 간주(점검결과 보존), 아니면 새로 추가
  async upsertScheduleFromExcel(item) {
    const all = await DB.allSchedule();
    const key = (it) => `${it.siteId || it.tempSiteName || ''}__${it.date}__${it.inspectionType}`;
    const found = all.find((it) => it.source === 'EXCEL' && key(it) === key(item));
    if (found) {
      const store = await tx('schedule', 'readwrite');
      const merged = Object.assign({}, found, {
        siteId: item.siteId,
        tempSiteName: item.tempSiteName,
        time: item.time || found.time,
        progressRate: item.progressRate ?? found.progressRate,
        sourceFile: item.sourceFile,
        updatedAt: new Date().toISOString(),
      });
      await reqToPromise(store.put(merged));
      return { record: merged, isNew: false };
    }
    const created = await DB.addSchedule(item);
    return { record: created, isNew: true };
  },

  async clearAll() {
    const db = await openDb();
    await Promise.all(['sites', 'schedule'].map((name) =>
      new Promise((resolve, reject) => {
        const req = db.transaction(name, 'readwrite').objectStore(name).clear();
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      })
    ));
  },
};
