interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<void | boolean[]>);
}

interface FetchEvent extends Event {
  readonly request: Request;
  respondWith(response: Promise<Response> | Response): Promise<Response>;
}

const CACHE_NAME = "cyber-forest-cache";
const URLS = [
  "/",
  "/login",
  "/registration",
  "/about",
  "/error",
  "/lobby",
  "/user-data",
  "/game",
  "/leader-board",
];

self.addEventListener("install", (event: ExtendableEvent) => {
  console.log("SW: installed");
});

const cacheUrls = (urls) => {
  caches
    .open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(urls);
    })
    .catch((err) => {
      throw err;
    });
};

const cacheAssets = () => {
  fetch("/manifest.json")
    .then((res) => res.json())
    .then((data) => {
      const result = new Set("");
      Object.values(data).forEach((value) => {
        const item = `/${value["file"].trim()}`;
        if (item !== "/service-worker.js") {
          result.add(item);
        }
      });
      const assets: string[] = Array.from(result);

      caches
        .open(CACHE_NAME)
        .then((cache) => {
          return cache.addAll(assets);
        })
        .catch((err) => {
          throw err;
        });
    });
};

const updateCaches = () => {
  setTimeout(() => {
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name === CACHE_NAME)
            .map((name) => {
              caches.delete(name);
            })
        );
      })
      .then(() => {
        cacheAssets();
        cacheUrls(URLS);
      });
  }, 1000);
};

self.addEventListener("activate", (event: ExtendableEvent) => {
  console.log("SW: activated");
  cacheAssets();
  cacheUrls(URLS);
});

self.addEventListener("fetch", (event: FetchEvent & ExtendableEvent) => {
  if (event.request.url.match("/api")) {
    const url = event.request.url;
    switch (true) {
      // Swagger docs
      case !!url.match("/api/docs"):
        return;
      // Login
      case !!url.match("/api/auth/signin") ||
        !!url.match("/api/oauth/yandex") ||
        !!url.match("/api/auth/user"):
        return fetch(event.request.clone())
          .then((res) => {
            res.ok && updateCaches();
            return res;
          })
          .catch((e) => e);
      // Logout
      case !!url.match("/api/auth/logout"):
        return fetch(event.request.clone())
          .then((res) => {
            res.ok && updateCaches();
            return res;
          })
          .catch((e) => e);
    }
  }

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache: Cache) => {
      return fetch(event.request.url)
        .then((fetchedResponse: Response) => {
          cache.put(event.request.url, fetchedResponse.clone());
          return fetchedResponse;
        })
        .catch(() => {
          return cache.match(event.request.url);
        });
    })
  );
});
