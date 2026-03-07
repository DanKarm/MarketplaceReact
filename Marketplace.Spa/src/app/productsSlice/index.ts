import {createSlice, type PayloadAction} from "@reduxjs/toolkit";//подчеркунло красным PayloadAction
import type { IProduct } from "../../entity/IProduct";

interface ProductsState {
    products: IProduct[];
}

const initialState: ProductsState = {
    products: [],
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<IProduct[]>) {
            state.products = action.payload;
        },
        clearProducts(state) {
            state.products = [];
        },
    },
});

export const { setProducts, clearProducts } = productsSlice.actions;

export default productsSlice.reducer;