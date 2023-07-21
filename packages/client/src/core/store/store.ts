import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '@store/root-reducer'
import { store } from '@/entry-client'

export const createStore = (initialState: Record<string, unknown>) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: false,
      })
    },
    preloadedState: initialState,
  })
  return store
}

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
