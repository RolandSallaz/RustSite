import userReducer from './slices/userSlice'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import popupReducer from './slices/popupSlice'
import serverReducer from './slices/serverSlice'

export const rootReducer = combineReducers({
  user: userReducer,
  popups: popupReducer,
  server: serverReducer,
})

export function setupStore() {
  return configureStore({ reducer: rootReducer })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
