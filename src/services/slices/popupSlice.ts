import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface PopupState {
    isAddServerPopupOpened: boolean,
    isServerListOpened: boolean,
    loading: boolean
}

const initialState: PopupState = {
    isAddServerPopupOpened: false,
    isServerListOpened: false,
    loading: false,
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setAddServerPopupOpened(state, action: PayloadAction<boolean>) {
            state.isAddServerPopupOpened = action.payload;
        },
        setServerListOpened(state, action: PayloadAction<boolean>) {
            state.isServerListOpened = action.payload;
        },
        fetching(state) {
            state.loading = true
        },
        fetchingError(state, action: PayloadAction<Error>) {
            state.loading = false
        }
    },
})

export default popupSlice.reducer
