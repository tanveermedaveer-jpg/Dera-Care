const CACHE_NAME = 'deracare-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './terms.html',
  './privacy.html',
  './css/style.css',
  './js/app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// 1. Install Event: Cache Core Static Files
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching core PWA assets (deracare-v2)');
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch(err => console.log('[ServiceWorker] Cache addAll error:', err))
  );
});

// 2. Activate Event: Purge All Old Broken Caches Immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[ServiceWorker] Deleting old broken cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch Event: Network-First Strategy with Cache Fallback for Navigation/HTML
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests or backend API calls
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) {
    return;
  }

  const isNavigation = event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html');

  if (isNavigation) {
    // Network-First Strategy for HTML Navigation to ensure fresh deployment load
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          console.log('[ServiceWorker] Network failed; returning cached index.html fallback');
          return caches.match(event.request).then(cached => cached || caches.match('./index.html') || caches.match('./'));
        })
    );
  } else {
    // Stale-While-Revalidate Strategy for Static Assets (CSS, JS, PNG)
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
  }
});
