interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<void | boolean[]>)
}

interface FetchEvent extends Event {
  request: Request
  respondWith(response: Promise<Response> | Response): Promise<Response>
}

const CACHE_NAME = 'cyber-forest-cache'
const URLS = ['/', '/error']

self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('SW: installed')
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS)
      })
      .catch(err => {
        throw err
      })
  )
})

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('SW: activated')
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name === CACHE_NAME)
          .map(name => caches.delete(name))
      )
    })
  )
})

self.addEventListener('fetch', (event: FetchEvent & ExtendableEvent) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()
      return fetch(fetchRequest)
        .then(response => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response
          }

          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache)
          })
          return response
        })
        .catch(() => null)
    })
  )
})
