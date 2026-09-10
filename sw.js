// 온라인일 땐 항상 최신 파일을 받아오고(네트워크 우선), 오프라인일 때만 캐시로 대체한다.
// 캐시 우선 방식은 배포한 새 버전이 있어도 계속 옛 버전을 보여주는 문제가 있어 바꿨다.
const CACHE = 'inspection-notebook-v8';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/db.js',
  './js/excel.js',
  './js/views.js',
  './js/app.js',
  './vendor/xlsx.full.min.js',
  './vendor/fflate.umd.js',
  './vendor/exceljs.min.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    // cache:'no-store'가 없으면 브라우저 자체 HTTP 캐시가 이 fetch를 가로채 옛 파일을 줄 수 있어(SW 캐시와 별개) 명시적으로 껐다.
    fetch(e.request, { cache: 'no-store' }).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
