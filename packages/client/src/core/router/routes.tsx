import { FC, ReactNode, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { TRootState } from '../store/store'
import { PATH } from '../config/constants'

import { BlankLayout } from '../../shared/layouts/blank-layout/blank-layout'
import { GameLayout } from '../../shared/layouts/game-layout/game-layout'

import {
  PageError,
  PageForgotPassword,
  PageGame,
  PageHome,
  PageLogin,
  PageRegister,
  PageResetPassword,
} from './router-pages'

const routes = [
  {
    path: PATH.HOME,
    element: <PageHome />,
    layout: 'blank',
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
    path: PATH.FORGOT_PASS,
    element: <PageForgotPassword />,
    layout: 'blank',
  },
  {
    path: PATH.RESET_PASS,
    element: <PageResetPassword />,
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
  const { authorized } = useSelector((store: TRootState) => store.user)
  const location = useLocation()

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
