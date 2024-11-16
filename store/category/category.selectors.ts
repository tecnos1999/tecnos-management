import { createSelector } from "@reduxjs/toolkit";
import { CategoryState } from "./category.reducers";

interface RootState {
    categoryState: CategoryState;
}

export const selectCategoriesState = (state: RootState) => state.categoryState;

export const selectCategories = createSelector(
    selectCategoriesState,
    (categoryState) => categoryState.categories
);

export const selectRetrieveCategoriesState = createSelector(
    selectCategoriesState,
    (categoryState): typeof categoryState.retrieveCategoriesState => categoryState.retrieveCategoriesState
);
