import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { MainRouter } from './core/router/main-router'
import { useSelector } from 'react-redux'
import { TRootState } from './core/store/store'
import { useEffect } from 'react'
import { TestNav } from './components/test-nav/test-nav'

function App() {
  const { themeName } = useSelector((store: TRootState) => store.theme)
  useEffect(() => {
    document.body.className = `body-${themeName}`
  }, [themeName])

  return (
    <BrowserRouter>
      <TestNav />
      <MainRouter />
    </BrowserRouter>
  )
}

export default App
