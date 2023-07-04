import { lazy } from 'react'

const mainLazy = import.meta.env.SSR
  ? async (module: () => Awaited<any>) => {
      const tmp = await module()
      return tmp.default
    }
  : lazy

export const PageHome = await mainLazy(
  () => import('@pages/page-home/page-home')
)

export const PageRegister = await mainLazy(
  () => import('@pages/auth/page-register/page-register')
)

export const PageLogin = await mainLazy(
  () => import('@pages/auth/page-login/page-login')
)

export const PageGame = await mainLazy(
  () => import('@pages/page-game/page-game')
)

export const PageError = await mainLazy(
  () => import('@pages/page-error/page-error')
)
