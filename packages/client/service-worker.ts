interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<void | boolean[]>)
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
  '/about',
  '/error',
  '/lobby',
  '/user-data',
  '/game',
  '/leader-board',
]

self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('SW: installed', event)
})

const cacheUrls = urls => {
  caches
    .open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(urls)
    })
    .catch(err => {
      throw err
    })
}

const cacheAssets = () => {
  fetch('/manifest.json')
    .then(res => res.json())
    .then(data => {
      const result = new Set('')
      Object.values(data).forEach(value => {
        const item = `/${value['file'].trim()}`
        if (item !== '/service-worker.js') {
          result.add(item)
        }
      })
      const assets: string[] = Array.from(result)

      caches
        .open(CACHE_NAME)
        .then(cache => {
          return cache.addAll(assets)
        })
        .catch(err => {
          throw err
        })
    })
}

const updateCahes = () => {
  setTimeout(() => {
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name === CACHE_NAME)
            .map(name => {
              caches.delete(name)
            })
        )
      })
      .then(() => {
        cacheAssets()
        cacheUrls(URLS)
      })
  }, 1000)
}

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('SW: activated', event)
  cacheAssets()
  cacheUrls(URLS)
})

self.addEventListener('fetch', (event: FetchEvent & ExtendableEvent) => {
  if (event.request.url.match('/api')) {
    const url = event.request.url
    switch (true) {
      // Swagger docs
      case !!url.match('/api/docs'):
        return
      // Login
      case !!url.match('/api/auth/signin'):
        return fetch(event.request)
          .then(res => {
            res.ok && updateCahes()
            return res
          })
          .catch(e => e)
      // Logout
      case !!url.match('/api/auth/logout'):
        return fetch(event.request)
          .then(res => {
            res.ok && updateCahes()
            return res
          })
          .catch(e => e)
    }
  }

  if (event.request.method !== 'GET') {
    return
  }

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
