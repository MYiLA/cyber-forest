import './app.css'
import { BrowserRouter } from 'react-router-dom'
import { MainRouter } from './core/router/main-router'
import { Provider } from 'react-redux'
import store from './core/store/store'
import React from 'react'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </Provider>
  )
}

export default App
