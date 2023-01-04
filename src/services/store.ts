import userReducer from './slices/userSlice'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import popupReducer from "./slices/popupSlice";

export const rootReducer = combineReducers({
  user: userReducer,
  popups:popupReducer,
})

export function setupStore() {
  return configureStore({ reducer: rootReducer })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']