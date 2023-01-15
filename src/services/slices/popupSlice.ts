import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface PopupState {
    isAddServerPopupOpened: boolean,
    isServerListOpened: boolean,
    isEditServerPopupOpened: boolean
    loading: boolean
}

const initialState: PopupState = {
    isAddServerPopupOpened: false,
    isServerListOpened: false,
    isEditServerPopupOpened: false,
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
        setEditServerPopupOpened(state, action: PayloadAction<boolean>) {
            state.isEditServerPopupOpened = action.payload;
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
