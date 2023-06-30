import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppDemo } from './app-demo'
import * as serviceWorkerRegistration from './service-worker-registration'
import './index.scss'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <AppDemo />
  </React.StrictMode>
)

serviceWorkerRegistration.register()
