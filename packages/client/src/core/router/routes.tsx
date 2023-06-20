import { FC, ReactNode, Fragment, lazy } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { TRootState } from '../store/store'
import { PATH } from '../config/constants'

import { BlankLayout } from '../../shared/layouts/blank-layout/blank-layout'
import { GameLayout } from '../../shared/layouts/game-layout/game-layout'

const PageHome = lazy(() =>
  import('../../pages/page-home/page-home').then(module => ({
    default: module.PageHome,
  }))
)

const PageResetPassword = lazy(() =>
  import('../../pages/auth/page-reset-password/page-reset-password').then(
    module => ({
      default: module.PageResetPassword,
    })
  )
)

const PageForgotPassword = lazy(() =>
  import('../../pages/auth/page-forgot-password/page-forgot-password').then(
    module => ({
      default: module.PageForgotPassword,
    })
  )
)

const PageRegister = lazy(() =>
  import('../../pages/auth/page-register/page-register').then(module => ({
    default: module.PageRegister,
  }))
)

const PageLogin = lazy(() =>
  import('../../pages/auth/page-login/page-login').then(module => ({
    default: module.PageLogin,
  }))
)

const PageGame = lazy(() =>
  import('../../pages/page-game/page-game').then(module => ({
    default: module.PageGame,
  }))
)

const PageError = lazy(() =>
  import('../../pages/page-error/page-error').then(module => ({
    default: module.PageError,
  }))
)

const routes = [
  {
    path: PATH.HOME,
    element: <PageHome />,
    layout: 'blank',
  },
  {
    path: PATH.GAME,
    element: <PageGame />,
    layout: 'game',
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
    path: PATH.FORGOT_PASSWORD,
    element: <PageForgotPassword />,
    layout: 'blank',
  },
  {
    path: PATH.RESET_PASSWORD,
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
