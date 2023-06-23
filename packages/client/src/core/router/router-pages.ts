import { lazy } from 'react'

export const PageHome = lazy(() =>
  import('@pages/page-home/page-home').then(module => ({
    default: module.PageHome,
  }))
)

export const PageRegister = lazy(() =>
  import('@pages/auth/page-register/page-register').then(module => ({
    default: module.PageRegister,
  }))
)

export const PageLogin = lazy(() =>
  import('@pages/auth/page-login/page-login').then(module => ({
    default: module.PageLogin,
  }))
)

export const PageGame = lazy(() =>
  import('@pages/page-game/page-game').then(module => ({
    default: module.PageGame,
  }))
)

export const PageError = lazy(() =>
  import('@pages/page-error/page-error').then(module => ({
    default: module.PageError,
  }))
)
