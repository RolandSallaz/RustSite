import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface LoginState {
  loggedIn: boolean
  group?: 'user' | 'admin'
}

const initialState: LoginState = {
  loggedIn: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state){ state.loggedIn = true}
    
  },
})

export default userSlice.reducer
