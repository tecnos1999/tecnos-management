import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category } from "@/module/category/models/Category";
import { LoadingState } from "../actionType/LoadingState";

export interface CategoryState {
    categories: Category[];
    retrieveCategoriesState: LoadingState;
}

export const initialState: CategoryState = {
    categories: [],
    retrieveCategoriesState: LoadingState.NONE,
};

const categorySlice = createSlice({
    name: "Category",
    initialState: initialState,
    reducers: {
        loadCategories(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload;
        },

        retrieveCategoriesSuccess(state) {
            state.retrieveCategoriesState = LoadingState.SUCCES;
        },

        retrieveCategoriesLoading(state) {
            state.retrieveCategoriesState = LoadingState.LOADING;
        },

        retrieveCategoriesError(state) {
            state.retrieveCategoriesState = LoadingState.ERROR;
        },
    },
});

export const {
    loadCategories,
    retrieveCategoriesError,
    retrieveCategoriesLoading,
    retrieveCategoriesSuccess,
} = categorySlice.actions;

export default categorySlice;
