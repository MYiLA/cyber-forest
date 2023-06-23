import { FC, ReactNode, Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { TRootState } from '../store/store'
import { PATH } from '../config/constants'

import { BlankLayout } from '../../shared/layouts/blank-layout/blank-layout'
import { GameLayout } from '../../shared/layouts/game-layout/game-layout'

import {
  PageError,
  PageGame,
  PageHome,
  PageLogin,
  PageRegister,
} from './router-pages'
import { useAuth } from '../../shared/hooks/use-auth'
import { Loading } from '../../shared/ui/loading/loading'

const routes = [
  {
    path: PATH.HOME,
    element: <PageHome />,
    layout: 'game',
  },
  {
    path: PATH.LOBBY,
    element: <PageGame />,
    layout: 'game',
    protected: true,
  },
  {
    path: PATH.USER,
    element: <></>,
    layout: 'blank',
    protected: true,
  },
  {
    path: PATH.TABLE,
    element: <></>,
    layout: 'blank',
    protected: true,
  },
  {
    path: PATH.LOGIN,
    element: <PageLogin />,
    layout: 'blank',
  },
  {
    path: PATH.REGISTER,
    element: <PageRegister />,
    layout: 'blank',
  },
  {
    path: PATH.ERROR,
    element: <PageError />,
    layout: 'blank',
  },
  {
    path: '*',
    element: <PageError />,
    layout: 'blank',
  },
]

const ProtectedRouteElement: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation()

  const { authorized } = useSelector((store: TRootState) => store.user)
  const { checkAuth, authChecked } = useAuth()

  useEffect(() => {
    if (!authChecked && !authorized) {
      checkAuth()
    }
  }, [authorized, authChecked, checkAuth])

  if (!authChecked) {
    return <Loading />
  }

  if (authorized) {
    return <Fragment>{children}</Fragment>
  } else {
    return (
      <Navigate
        to={PATH.LOGIN}
        replace
        state={{ redirect: location.pathname }}
      />
    )
  }
}

export const getRoutes = () => {
  const layouts: { [key: string]: FC } = {
    blank: BlankLayout,
    game: GameLayout,
  }

  return routes.map(route => {
    const Layout = route.layout ? layouts[route.layout] : BlankLayout
    return {
      ...route,
      element: route.protected ? (
        <ProtectedRouteElement>
          <Layout>{route.element}</Layout>
        </ProtectedRouteElement>
      ) : (
        <Layout>{route.element}</Layout>
      ),
    }
  })
}
