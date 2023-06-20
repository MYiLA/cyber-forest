import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { MainRouter } from './core/router/main-router'
import { Provider, useSelector } from 'react-redux'
import store, { TRootState } from './core/store/store'
import React, { useEffect } from 'react'
import { TestNav } from './components/test-nav/test-nav'

function App() {
  // const { themeName } = useSelector((store: TRootState) => store.theme)
  // useEffect(() => {
  //   document.body.className = `body-${themeName}`
  // }, [themeName])

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
