import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './index.scss'
import * as serviceWorkerRegistration from './service-worker-registration'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

serviceWorkerRegistration.register()
