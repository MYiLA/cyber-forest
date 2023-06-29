interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void
}

interface FetchEvent extends Event {
  request: Request
  respondWith(response: Promise<Response> | Response): Promise<Response>
}

const CACHE_NAME = 'cyber-forest-cache'
const URLS = [
  '/',
  '/login',
  '/registration',
  '/lobby',
  '/lobby/table',
  '/user-data',
  '/error',
]

this.addEventListener('install', (event: ExtendableEvent) => {
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

this.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(name => caches.delete(name)))
    })
  )
})

this.addEventListener('fetch', (event: FetchEvent & ExtendableEvent) => {
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
