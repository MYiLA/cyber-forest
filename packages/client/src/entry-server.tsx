import React from "react";
import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { AuthProvider } from "@core/auth-provider/auth-provider";
import { MainRouter } from "@router/main-router";
import { userGetInfo } from "@store/reducers/user-reducer";
import { createStore } from "@store/store";
import { ToastContainer } from "react-toastify";

export async function render(url: string, cookies: Record<string, string>) {
  const store = createStore({});
  await store.dispatch(userGetInfo(cookies));
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <AuthProvider>
            <MainRouter />
          </AuthProvider>
        </StaticRouter>
      </Provider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </React.StrictMode>
  );

  const state = `
    <script>
        window.__PREPARED_STATE__ = ${JSON.stringify(store.getState()).replace(
          /</g,
          "\\u003c"
        )}
    </script>`;

  return { html, state, head: "" };
}
