import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from "../../interfaces";
import {groups} from "../../utils/enums";

interface LoginState {
    loggedIn: boolean
    error: string
    loading: boolean
    user: IUser
}

const initialState: LoginState = {
    loggedIn: false,
    error: '',
    loading: false,
    user: {
        balance: 0,
        group: groups.USER,
        name: '',
        photos: [],
        steamId: 0
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser>) {
            state.loggedIn = true
            state.user = action.payload
        },
        fetching(state) {
            state.loading = true
        },
        fetchingError(state, action: PayloadAction<Error>) {
            state.loading = false
            state.error = action.payload.message
        }
    },
})

export default userSlice.reducer
