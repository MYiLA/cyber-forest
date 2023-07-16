import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, RootState } from '@store/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { MainRouter } from '@router/main-router'
import { AuthProvider } from '@core/auth-provider/auth-provider'
import xssFilters from 'xss-filters'
// import * as serviceWorkerRegistration from './service-worker-registration'
import './index.scss'
import { toggleFullScreen } from '@utils/full-screen-fn'

const container = document.getElementById('root')

declare global {
  interface Window {
    __PREPARED_STATE__: RootState
  }
}

export const store = createStore(
  typeof window.__PREPARED_STATE__ === 'object'
    ? JSON.parse(
        xssFilters.inHTMLData(JSON.stringify(window.__PREPARED_STATE__))
      )
    : {}
)

const MainApp = () => {
  const fullScreenListener = (e: KeyboardEvent) => {
    if (e.key === 'F9') {
      toggleFullScreen()
    }
  }

  useEffect(() => {
    window.addEventListener('keyup', fullScreenListener)

    return function clean() {
      window.removeEventListener('keyup', fullScreenListener)
    }
  }, [])

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <MainRouter />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
}

if (import.meta.hot) {
  console.log('create')
  ReactDOM.createRoot(container as HTMLElement).render(<MainApp />)
} else {
  console.log('hydrate')
  ReactDOM.hydrateRoot(container as HTMLElement, <MainApp />)
}

// import.meta.env.DEV
//   ? serviceWorkerRegistration.unregister()
//   : serviceWorkerRegistration.register()
