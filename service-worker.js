const CACHE_NAME = "navetta-v07";

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll([
                    "./",
                    "./index.html",
                    "./manifest.json",
                    "./icon-192.png",
                    "./icon-512.png"
                ]);
            })
    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(
                keys.map(key => {

                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }

                })
            );

        })

    );

    return self.clients.claim();

});

self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)

            .then(response => {

                return response;

            })

            .catch(() => {

                return caches.match(event.request);

            })

    );

});
