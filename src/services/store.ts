import userReducer from './slices/userSlice'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  user: userReducer,
})

export function setupStore() {
  return configureStore({ reducer: rootReducer })
}

export type AppState = ReturnType<typeof rootReducer>
