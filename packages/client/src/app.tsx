import './app.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import React from 'react'
import { MainRouter } from '@router/main-router'
import store from '@store/store'
import { AuthProvider } from '@core/auth-provider/auth-provider'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <MainRouter />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
