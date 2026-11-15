// Service worker do Plano Alimentar 1.400: guarda o app para abrir sem internet.
const CACHE = 'plano1400-5456f6e042';
const FONTES = 'plano1400-fontes';
const APP = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png',
  './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== FONTES).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    if (req.mode === 'navigate') {
      // Com internet, pega a versão mais nova; sem internet, usa a guardada.
      e.respondWith(fetch(req).then(res => {
        if (res.ok) { const copia = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copia)); }
        return res;
      }).catch(() => caches.match('./index.html')));
    } else {
      e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
    }
    return;
  }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTES).then(c => c.match(req).then(hit => {
      const rede = fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
        return res;
      }).catch(() => hit);
      return hit || rede;
    })));
  }
});
