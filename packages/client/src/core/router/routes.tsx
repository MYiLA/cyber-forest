import { FC, ReactNode, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import {
  PageError,
  PageGame,
  PageHome,
  PageLogin,
  PageRegister,
} from '@router/router-pages'
import { PATH } from '@config/constants'
import { RootState } from '@store/store'
import { BlankLayout } from '@layouts/blank-layout/blank-layout'
import { GameLayout } from '@layouts/game-layout/game-layout'

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

  const getUserState = (store: RootState) => store.user
  const { authorized } = useSelector(getUserState)

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
