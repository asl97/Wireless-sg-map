const cacheName = 'asl97-wireless-sg-v0.1';
const filesToCache = [
  './',
  './LICENSE',
  './README.md',
  './index.html',
  './lib/leaflet/leaflet.css',
  './lib/leaflet/leaflet.js',
  './lib/leaflet.markercluster/MarkerCluster.css',
  './lib/leaflet.markercluster/MarkerCluster.Default.css',
  './lib/leaflet.markercluster/leaflet.markercluster-src.js',
  './lib/leaflet-gps/dist/gps-icon.svg',
  './lib/leaflet-gps/dist/leaflet-gps.src.css',
  './lib/leaflet-gps/dist/leaflet-gps.src.js',
]

// the event handler for the activate event
self.addEventListener('activate', e => self.clients.claim());

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});

// the event handler for the install event 
// typically used to cache assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(filesToCache))
  );
});

// the fetch event handler, to intercept requests and serve all 
// static assets from the cache
self.addEventListener('fetch', e => {
  caches.open(cacheName).then( cache => {
    e.respondWith(
      cache.match(e.request).then(response => response ? response : fetch(e.request))
    )
  })
});
