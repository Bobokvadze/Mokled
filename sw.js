const CACHE_NAME = 'mokled-cache-v68';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/georgian-converter.html',
  '/loan-calculator.html',
  '/loan-comparison.html',
  '/pdf-tools.html',
  '/djvu-to-pdf.html',
  '/postal-codes.html',
  '/number-to-words.html',
  '/salary-calculator.html',
  '/iban-validator.html',
  '/vat-calculator.html',
  '/qr-generator.html',
  '/text-tools.html',
  '/date-calculator.html',
  '/image-tools.html',
  '/currency-converter.html',
  '/deposit-calculator.html',
  '/tax-penalty-calculator.html',
  '/invoice-generator.html',
  '/data-converter.html',
  '/password-generator.html',
  '/about.html',
  '/404.html',
  '/css/styles.css',
  '/js/core.js',
  '/js/common.js',
  '/js/djvu.min.js',
  '/js/postal-data.js',
  '/js/vendor/pdf-lib.min.js',
  '/assets/fonts/noto-sans-georgian-georgian-wght-normal.woff2',
  '/assets/fonts/noto-sans-georgian-latin-wght-normal.woff2',
  '/assets/fonts/noto-sans-georgian-latin-ext-wght-normal.woff2',
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
  // გარე მოთხოვნებს (ეროვნული ბანკის API, CDN) SW არ ეხება - ოფლაინში მათ HTML პასუხი არ უნდა დაუბრუნდეთ
  if (!event.request.url.startsWith(self.location.origin)) return;
  const isNavigation = event.request.mode === 'navigate';
  event.respondWith(
    fetch(event.request)
      .then(function (networkResp) {
        if (networkResp && networkResp.status === 200) {
          const respClone = networkResp.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, respClone);
          });
        }
        return networkResp;
      })
      .catch(function () {
        return caches.match(event.request).then(function (cached) {
          if (cached) return cached;
          return isNavigation ? caches.match('/index.html') : Response.error();
        });
      })
  );
});