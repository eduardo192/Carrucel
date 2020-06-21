
// Consultar para sevise worker https://developers.google.com/web/fundamentals/primers/service-workers?hl=es

const CACHE_NAME = 'Cache_Carrucel',
urlsToCache = [
    './Imagenes/imagen1.jpg',
    './Imagenes/imagen2.jpg',
    './Imagenes/imagen3.jpg',
    './Imagenes/imagen4.jpg',
    './Imagenes/imagen5.jpg',
    './JS/carrucel.js', 
    './JS/storage',
    './manifest.json',
    './script.js',
    './sw.js',
    './index.html'
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
