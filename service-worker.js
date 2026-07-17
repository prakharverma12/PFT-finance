const CACHE_NAME = 'panda-ledger-v1';
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

// Network-first for GitHub API calls (never cache live financial data).
// Cache-first for the local app shell so the UI still opens offline.
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
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
