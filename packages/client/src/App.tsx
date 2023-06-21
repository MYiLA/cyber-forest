import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { MainRouter } from './core/router/main-router'
import { Provider } from 'react-redux'
import store from './core/store/store'
import React from 'react'
import { TestNav } from './components/test-nav/test-nav'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <TestNav />
        <MainRouter />
      </BrowserRouter>
    </Provider>
  )
}

export default App
