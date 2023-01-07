import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IAppState {
    darkMode:boolean;
}
const initialState: IAppState = {
    darkMode:false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDarkMode(state, action: PayloadAction<boolean>) {
            state.darkMode = action.payload
        },
    },
})

export default appSlice.reducer
