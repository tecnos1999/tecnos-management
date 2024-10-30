import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ItemCategory } from "@/module/itemcategory/models/ItemCategory";
import { LoadingState } from "../actionType/LoadingState";

export interface ItemCategoryState {
    itemCategories: ItemCategory[];
    retrieveItemCategoriesState: LoadingState;
}

export const initialState: ItemCategoryState = {
    itemCategories: [],
    retrieveItemCategoriesState: LoadingState.NONE,
};

const itemCategorySlice = createSlice({
    name: "ItemCategory",
    initialState: initialState,
    reducers: {
        loadItemCategories(state, action: PayloadAction<ItemCategory[]>) {
            state.itemCategories = action.payload;
        },

        retrieveItemCategoriesSuccess(state) {
            state.retrieveItemCategoriesState = LoadingState.SUCCES;
        },

        retrieveItemCategoriesLoading(state) {
            state.retrieveItemCategoriesState = LoadingState.LOADING;
        },

        retrieveItemCategoriesError(state) {
            state.retrieveItemCategoriesState = LoadingState.ERROR;
        },
    },
});

export const {
    loadItemCategories,
    retrieveItemCategoriesSuccess,
    retrieveItemCategoriesLoading,
    retrieveItemCategoriesError
} = itemCategorySlice.actions;

export default itemCategorySlice;

