import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface PopupState {
    isAddServerPopupOpened: boolean
}

const initialState: PopupState = {
    isAddServerPopupOpened: false
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setAddServerPopupOpened(state, action: PayloadAction<boolean>) {
            state.isAddServerPopupOpened = action.payload;
        },
    },
})

export default popupSlice.reducer
