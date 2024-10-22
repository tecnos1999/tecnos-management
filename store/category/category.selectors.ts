import { createSelector } from "@reduxjs/toolkit";
import { CategoryState } from "./category.reducers";

interface RootState {
    categoryState: CategoryState; 
}

export const selectCategorysState = (state: RootState) => state.categoryState;

export const selectCategorys = createSelector(
    selectCategorysState,
    (categoryState) => categoryState.categories
);

export const selectRetrieveCategorysState = createSelector(
    selectCategorysState,
    (categoryState): typeof categoryState.retrieveCategorysState => categoryState.retrieveCategorysState
);


