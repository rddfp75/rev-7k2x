const V='placas-v1';
const CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-180.png','lib/pdf-lib.min.js','lib/jszip.min.js','p/blancos.jpg','p/china.jpg','p/dacor.jpg','p/despiece.jpg','p/export2.jpg','p/export3.jpg','p/pulido.jpg','p/rojos.jpg','p/sangrado.jpg','p/zl.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
 const estatico=/\/(p|lib)\//.test(u.pathname)||/icon-/.test(u.pathname);
 if(estatico){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>{const c=x.clone();caches.open(V).then(ch=>ch.put(r,c));return x})));return}
 e.respondWith(fetch(r,{cache:'no-cache'}).then(x=>{const c=x.clone();caches.open(V).then(ch=>ch.put(r,c));return x}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))))});
