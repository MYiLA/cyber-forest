import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createStore, RootState } from "@store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "@router/main-router";
import { AuthProvider } from "@core/auth-provider/auth-provider";
import "./index.scss";
import { toggleFullScreen } from "@utils/full-screen-fn";
import { ErrorBoundary } from "@ui/error-boundary";

const container = document.getElementById("root");

declare global {
  interface Window {
    __PREPARED_STATE__: RootState;
  }
}

const preparedState =
  typeof window.__PREPARED_STATE__ === "object"
    ? JSON.parse(JSON.stringify(window.__PREPARED_STATE__))
    : {};

if (preparedState.user && preparedState.user.user) {
  localStorage.setItem("userData", JSON.stringify(preparedState.user.user));
}

export const store = createStore(preparedState);

const MainApp = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullScreenListener = (e: KeyboardEvent) => {
        if (e.key === "F9") {
          toggleFullScreen();
        }
      };
      window.addEventListener("keyup", fullScreenListener);
      return () => {
        window.removeEventListener("keyup", fullScreenListener);
      };
    }
  }, []);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <BrowserRouter>
            <AuthProvider>
              <MainRouter />
            </AuthProvider>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

if (import.meta.hot) {
  console.log("create");
  ReactDOM.createRoot(container as HTMLElement).render(<MainApp />);
} else {
  console.log("hydrate");
  ReactDOM.hydrateRoot(container as HTMLElement, <MainApp />);
}

if ("serviceWorker" in navigator && !import.meta.env.DEV) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js", { scope: "/" })
      .then(() => {
        console.log("Service worker registered");
      });
  });
}
