const CACHE_NAME = 'mokled-cache-v37';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/georgian-converter.html',
  '/loan-calculator.html',
  '/pdf-tools.html',
  '/postal-codes.html',
  '/number-to-words.html',
  '/salary-calculator.html',
  '/iban-validator.html',
  '/vat-calculator.html',
  '/qr-generator.html',
  '/text-tools.html',
  '/date-calculator.html',
  '/image-tools.html',
  '/404.html',
  '/css/styles.css',
  '/js/core.js',
  '/js/common.js',
  '/js/postal-data.js',
  '/manifest.json'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CORE_ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; }).map(function (k) { return caches.delete(k); })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(function (networkResp) {
        if (networkResp && networkResp.status === 200 && event.request.url.startsWith(self.location.origin)) {
          const respClone = networkResp.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, respClone);
          });
        }
        return networkResp;
      })
      .catch(function () {
        return caches.match(event.request).then(function (cached) {
          return cached || caches.match('/index.html');
        });
      })
  );
});