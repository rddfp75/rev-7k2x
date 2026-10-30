/* Service worker mínimo: siempre pide la versión más nueva a internet; solo usa la copia guardada si no hay conexión. */
const C="rev-v1";
self.addEventListener("install",e=>{self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(self.clients.claim())});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET"||!e.request.url.startsWith(self.location.origin))return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(C).then(k=>k.put(e.request,c)).catch(()=>{});return r}).catch(()=>caches.match(e.request)))});
