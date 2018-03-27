const staticCacheName = 'mws-r-static-v2';

this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                '/',
                'index.html',
                'img/1.jpg',
                'img/2.jpg',
                'img/3.jpg',
                'img/4.jpg',
                'img/5.jpg',
                'img/6.jpg',
                'img/7.jpg',
                'img/8.jpg',
                'img/9.jpg',
                'img/10.jpg',
                'css/styles.css',
                '/restaurant.html',
                'data/restaurants.json',
                'js/main.js',
                'js/dbhelper.js',
                'js/restaurant_info.js',
                'js/sw_utils.js'
            ]);
        }).catch(function (error) {
            console.log(error)
        })
    );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (resp) {
                if (resp) return resp;

                return fetch(event.request).then(function (response) {
                    return caches.open(staticCacheName)
                        .then(function (cache) {
                            if(event.request.url.endsWith('.jpg')) {
                                cache.put(event.request, response.clone());
                            }
                            return response;
                        })
                })
            })
    );
});

this.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('mws-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});