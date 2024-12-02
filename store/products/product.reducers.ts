import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoadingState } from "../actionType/LoadingState";
import { ProductDTO } from "@/module/products/dto/ProductDTO";

export interface ProductState {
  products: ProductDTO[];
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
    loadProducts(state, action: PayloadAction<ProductDTO[]>) {
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
