import { precacheAndRoute } from 'workbox-precaching';

// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST);


// @ts-ignore
self.addEventListener('install', async (event) => {
    const cache = await caches.open('cache-v1')
    await cache.addAll([
        "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
        "/vite.svg"
    ])
})


// 

const apiOfflineFallbacks = [
    'https://calendar-app-backend-atro.onrender.com/api/auth/renew',
    'https://calendar-app-backend-atro.onrender.com/api/events',
]

self.addEventListener('fetch', (event: any) => {



    if (!apiOfflineFallbacks.includes(event.request.url)) return

    const response = fetch(event.request).then(res => {
        if (!res) {
            return caches.match(event.request)
        }
        // Guardar en cache la respuesta
        caches.open('cache-dynamic').then((cache: any) => {
            cache.put(event.request, res)
        })

        return res.clone()
        // @ts-ignore
    }).catch(err => {
        console.log('Offline response')
        return caches.match(event.request)
    })


    event.respondWith(response)


})