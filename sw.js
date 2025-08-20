// Draw Steel Lookup — Service Worker v3.6
const CACHE = 'draw-steel-lookup-v3-6';
const ASSETS = [
'./',
'./index.html?v=3.6',
'./manifest.webmanifest?v=3.6',
'./icons/icon-180.png',
'./icons/icon-192.png',
'./icons/icon-512.png'
];
self.addEventListener('install', (event) => {
event.waitUntil((async () => {
const cache = await caches.open(CACHE);
await cache.addAll(ASSETS);
self.skipWaiting();
})());
});
self.addEventListener('activate', (event) => {
event.waitUntil((async () => {
const keys = await caches.keys();
await Promise.all(keys.map(k => (k === CACHE ? null : caches.delete(k))));
self.clients.claim();
})());
});
self.addEventListener('fetch', (event) => {
if (event.request.method !== 'GET') return;
const url = new URL(event.request.url);
event.respondWith((async () => {
const cached = await caches.match(event.request);
try {
const network = await fetch(event.request);
if (url.origin === location.origin) {
const copy = network.clone();
const cache = await caches.open(CACHE);
cache.put(event.request, copy);
}
});