import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@store/root-reducer";
import { store } from "@/entry-client";

export const createStore = (initialState: Record<string, unknown>) => {
  const configuredStore = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState: initialState,
  });
  return configuredStore;
};

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

declare global {
  type RootState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;
}
