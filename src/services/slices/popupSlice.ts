import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IProductData} from "../../interfaces";

interface PopupState {
    isAddServerPopupOpened: boolean,
    isServerListOpened: boolean,
    isEditServerPopupOpened: boolean,
    isEditProductPopupOpened: boolean,
    buyProductPopup: IProductData | null,
    loading: boolean
}

const initialState: PopupState = {
    isAddServerPopupOpened: false,
    isServerListOpened: false,
    isEditProductPopupOpened: false,
    isEditServerPopupOpened: false,
    buyProductPopup: null,
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
        setEditProductPopupOpened(state, action: PayloadAction<boolean>) {
            state.isEditProductPopupOpened = action.payload;
        },
        setBuyProductPopupData(state, action: PayloadAction<IProductData | null>) {
            state.buyProductPopup = action.payload;
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
