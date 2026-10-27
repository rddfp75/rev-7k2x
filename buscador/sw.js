const V='buscador-v9';
const FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png',"p/blancos.jpg","p/china.jpg","p/dacor.jpg","p/despiece.jpg","p/export2.jpg","p/export3.jpg","p/pulido.jpg","p/rojos.jpg","p/sangrado.jpg","p/zl.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin!==location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||(e.request.mode==='navigate'?caches.match('index.html'):null)||fetch(e.request)));
});
