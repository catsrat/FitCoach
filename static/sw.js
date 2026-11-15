// FitCoach service worker.
// It keeps no copy of the app, so every visit loads the live version. Its one
// job is to show a friendly page when the phone has no connection.
const CACHE = 'fitcoach-offline-1';
const OFFLINE = '/static/offline.html';

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.add(OFFLINE)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode !== 'navigate') return;   // API calls and images go straight to the network
  event.respondWith(fetch(event.request).catch(() => caches.match(OFFLINE)));
});
