export function register() {
  window.addEventListener('load', () => {
    const swUrl = './assets/service-worker.js'
    navigator.serviceWorker
      .register(swUrl)
      .catch(() => console.log('Ошибка активации ServiceWorker'))
  })
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(reg => reg.unregister())
      .catch(() => console.log('Ошибка деактивации ServiceWorker'))
  }
}
