import { createSelector } from "@reduxjs/toolkit";
import { SubcategoryState } from "./subcategory.reducers";

interface RootState {
    subcategoryState: SubcategoryState; 
}

export const selectSubcategoriesState = (state: RootState) => state.subcategoryState;

export const selectSubcategories = createSelector(
    selectSubcategoriesState,
    (subcategoryState) => subcategoryState.subcategories
);

export const selectRetrieveSubcategoriesState = createSelector(
    selectSubcategoriesState,
    (subcategoryState): typeof subcategoryState.retrieveSubcategoriesState => subcategoryState.retrieveSubcategoriesState
);