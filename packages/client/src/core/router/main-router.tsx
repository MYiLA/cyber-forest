import { Fragment, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { getRoutes } from './routes'
import { Loading } from '../../shared/components/loading/loading'

export const MainRouter = () => {
  const location = useLocation()

  return (
    <Fragment>
      <Suspense fallback={<Loading />}>
        <Routes location={location}>
          {getRoutes().map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Routes>
      </Suspense>
    </Fragment>
  )
}