const CACHE_NAME = 'panda-ledger-v2';
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// GitHub API: network-only, never cache live financial data.
// App shell: network-first, so an installed PWA always gets the latest
// deployed version when online. The cache is only a fallback for offline use.
self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  if (url.includes('api.github.com')) {
    event.respondWith(fetch(event.request).catch(() => new Response(
      JSON.stringify({ message: 'Offline: cannot reach GitHub right now.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseCopy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseCopy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
