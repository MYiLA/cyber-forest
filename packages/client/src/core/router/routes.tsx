import { FC, ReactNode, Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
  PageError,
  PageGame,
  PageHome,
  PageInfo,
  PageLobby,
  PageLogin,
  PageRegister,
  PageSettings,
} from "@router/router-pages";
import { PATH } from "@config/constants";
import { RootState } from "@store/store";
import { BlankLayout } from "@layouts/blank-layout/blank-layout";
import { GameLayout } from "@layouts/game-layout/game-layout";
import { PageLeaderboard } from "@pages/leaderboard";

const routes = [
  {
    path: PATH.HOME,
    element: <PageHome />,
    layout: "game",
  },
  {
    path: PATH.ABOUT,
    element: <PageInfo />,
    layout: "game",
    protected: false,
  },
  {
    path: PATH.USER,
    element: <PageSettings />,
    layout: "game",
    protected: true,
  },
  {
    path: PATH.LOBBY,
    element: <PageLobby />,
    layout: "game",
    protected: true,
  },
  {
    path: PATH.USER,
    element: <></>,
    layout: "blank",
    protected: true,
  },
  {
    path: PATH.TOPIC,
    element: <></>,
    layout: "blank",
    protected: true,
  },
  {
    path: PATH.LOGIN,
    element: <PageLogin />,
    layout: "blank",
  },
  {
    path: PATH.REGISTER,
    element: <PageRegister />,
    layout: "blank",
  },
  {
    path: PATH.GAME,
    element: <PageGame />,
    layout: "blank",
    protected: true,
  },
  {
    path: PATH.ERROR,
    element: <PageError />,
    layout: "blank",
  },
  {
    path: PATH.ERROR500,
    element: <PageError error="500" />,
    layout: "blank",
  },
  {
    path: PATH.LEADER_BOARD,
    element: <PageLeaderboard />,
    layout: "blank",
    protected: true,
  },
  {
    path: "*",
    element: <PageError />,
    layout: "blank",
  },
];

const ProtectedRouteElement: FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();

  const getUserState = (store: RootState) => store.user;
  const { authorized } = useSelector(getUserState);

  if (authorized) {
    return <>{children}</>;
  }
  return (
    <Navigate to={PATH.LOGIN} replace state={{ redirect: location.pathname }} />
  );
};

export const getRoutes = () => {
  const layouts: { [key: string]: FC } = {
    blank: BlankLayout,
    game: GameLayout,
  };

  return routes.map((route) => {
    const Layout = route.layout ? layouts[route.layout] : BlankLayout;
    return {
      ...route,
      element: route.protected ? (
        <ProtectedRouteElement>
          <Layout>{route.element}</Layout>
        </ProtectedRouteElement>
      ) : (
        <Layout>{route.element}</Layout>
      ),
    };
  });
};
