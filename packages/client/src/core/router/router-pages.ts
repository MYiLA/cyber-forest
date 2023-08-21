import { ComponentType, lazy, LazyExoticComponent } from "react";

type LazyResult = LazyExoticComponent<ComponentType<Record<string, unknown>>>;

const mainLazy = import.meta.env.SSR
  ? async (module: () => Awaited<object>) => {
      const tmp = await module();
      if ("default" in tmp) {
        return tmp.default;
      }
      return lazy;
    }
  : lazy;

export const PageHome = (await mainLazy(
  () => import("@pages/page-home/page-home")
)) as LazyResult;

export const PageInfo = (await mainLazy(
  () => import("@pages/page-about/page-about")
)) as LazyResult;

export const PageRegister = (await mainLazy(
  () => import("@pages/auth/page-register/page-register")
)) as LazyResult;

export const PageLogin = (await mainLazy(
  () => import("@pages/auth/page-login/page-login")
)) as LazyResult;

export const PageGame = (await mainLazy(
  () => import("@pages/page-game/page-game")
)) as LazyResult;

export const PageError = (await mainLazy(
  () => import("@pages/page-error/page-error")
)) as LazyResult;

export const PageLobby = lazy(() =>
  import("../../pages/page-lobby/page-lobby").then((module) => ({
    default: module.PageLobby,
  }))
);

export const PageSettings = lazy(() =>
  import("@pages/page-settings/page-settings").then((module) => ({
    default: module.PageSettings,
  }))
);
