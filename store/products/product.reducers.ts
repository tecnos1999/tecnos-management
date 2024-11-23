import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "../actionType/LoadingState";
import { Product } from "@/module/products/models/Product";

export interface ProductState {
  products: Product[];
  retrieveProductsState: LoadingState;
}

export const initialState: ProductState = {
  products: [],
  retrieveProductsState: LoadingState.NONE,
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    loadProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    retrieveProductsSuccess(state) {
      state.retrieveProductsState = LoadingState.SUCCES;
    },
    retrieveProductsLoading(state) {
      state.retrieveProductsState = LoadingState.LOADING;
    },
    retrieveProductsError(state) {
      state.retrieveProductsState = LoadingState.ERROR;
    },
  },
});

export const {
  loadProducts,
  retrieveProductsSuccess,
  retrieveProductsLoading,
  retrieveProductsError,
} = productSlice.actions;

export default productSlice;
