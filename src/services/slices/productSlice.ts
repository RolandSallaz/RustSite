import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IProductData} from "../../interfaces";

export interface IProductState {
    products: IProductData[]
}

const initialState: IProductState = {
    products: [],
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getProducts(state, action: PayloadAction<IProductData[]>) {
            state.products = action.payload
        },
    },
})

export default productSlice.reducer
