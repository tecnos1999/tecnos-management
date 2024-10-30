import { createSelector } from "@reduxjs/toolkit";
import { ItemCategoryState } from "./itemCategory.reducers";

interface RootState {
    itemCategoryState: ItemCategoryState;
}

export const selectItemCategoryState = (state: RootState): ItemCategoryState => state.itemCategoryState;

export const selectItemCategories = createSelector(
    selectItemCategoryState,
    (itemCategoryState) => itemCategoryState.itemCategories
);

export const selectRetrieveItemCategoriesState = createSelector(
    selectItemCategoryState,
    (itemCategoryState): typeof itemCategoryState.retrieveItemCategoriesState => itemCategoryState.retrieveItemCategoriesState
);


