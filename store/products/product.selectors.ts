import { createSelector } from "@reduxjs/toolkit";
import { ProductState } from "./product.reducers";

interface RootState {
  productState: ProductState;
}

export const selectProductState = (state: RootState): ProductState =>
  state.productState;

export const selectProducts = createSelector(
  selectProductState,
  (productState) => productState.products
);

export const selectRetrieveProductsState = createSelector(
  selectProductState,
  (productState) => productState.retrieveProductsState
);
