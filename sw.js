const CACHE_NAME = 'Cache_Carrucel',
urlsToCache = [
    './',
    './CSS',
    './Imagenes',
    './main.js',
    './index.html',
    './script.js',
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache=>{
            return cache.addAll(urlsToCache).then(
                () => self.skipWaiting()
            );
        }).catch(err => console.log('Fallo regustro de cache', err))
    );
});


self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(cachesNames => {
            cachesNames.map( cachename => {
                if(cacheWhiteList.indexOf(cachename) === -1){
                    return caches.delete(cachename);
                }
            })
        }).then( () => self.clients.claim())
    )
})


self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then( res=>{
            if(res){
                return res;
            }
            
            return fetch(e.request);
        })
    )
});