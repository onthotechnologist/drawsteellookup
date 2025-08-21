/* Draw Steel Lookup — Service Worker v3.7.0
   - Network-first for HTML (fresh deployments show up immediately)
   - Cache-first for static assets (fast & offline)
   - Versioned caches + skipWaiting/clients.claim
*/

const APP_VERSION = '3.7.0';
const CACHE_STATIC  = `dsl-static-${APP_VERSION}`;
const CACHE_RUNTIME = `dsl-runtime-${APP_VERSION}`;

const CORE_ASSETS = [
  '/',                // for GH Pages use: '/<repo>/' or just 'index.html'
  '/index.html',
  '/manifest.webmanifest?v=3.7.0',
  '/icons/icon-180.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

const isSameOrigin = (url) => self.location.origin === (new URL(url)).origin;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(CORE_ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => {
      if (k !== CACHE_STATIC && k !== CACHE_RUNTIME) return caches.delete(k);
    }));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET') return;

  const isNav = request.mode === 'navigate' ||
                (request.headers.get('accept') || '').includes('text/html');

  if (isNav) {
    event.respondWith(networkFirstHTML(request));
    return;
  }

  const isStatic = isSameOrigin(url) && /\.(?:css|js|mjs|png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|otf)$/.test(url.pathname);
  if (isStatic) {
    event.respondWith(cacheFirstStatic(request));
    return;
  }
});

async function networkFirstHTML(req) {
  try {
    const fresh = await fetch(req, { cache: 'no-store' });
    const runtime = await caches.open(CACHE_RUNTIME);
    runtime.put(req, fresh.clone());
    return fresh;
  } catch (err) {
    const cached = await caches.match(req);
    if (cached) return cached;
    return caches.match('/index.html') || new Response('Offline', { status: 503 });
  }
}

async function cacheFirstStatic(req) {
  const cached = await caches.match(req);
  if (cached) return cached;

  const res = await fetch(req);
  if (res && res.ok && isSameOrigin(req.url)) {
    const staticCache = await caches.open(CACHE_STATIC);
    staticCache.put(req, res.clone());
  }
  return res;
}
