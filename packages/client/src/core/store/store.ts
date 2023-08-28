import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@store/root-reducer";
import { store } from "@/entry-client";

export const createStore = (initialState: Record<string, unknown>) =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState: initialState,
  });

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}
