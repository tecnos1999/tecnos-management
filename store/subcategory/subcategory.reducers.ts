import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Subcategory } from "@/module/subcategory/models/Subcategory";
import { LoadingState } from "../actionType/LoadingState";

export interface SubcategoryState {
    subcategories: Subcategory[];
    retrieveSubcategoriesState: LoadingState;
}

export const initialState: SubcategoryState = {
    subcategories: [],
    retrieveSubcategoriesState: LoadingState.NONE,
};

const subcategorySlice = createSlice({
    name: "Subcategory",
    initialState: initialState,
    reducers: {
        loadSubcategories(state, action: PayloadAction<Subcategory[]>) {
            state.subcategories = action.payload;
        },

        retrieveSubcategoriesSuccess(state) {
            state.retrieveSubcategoriesState = LoadingState.SUCCES;
        },

        retrieveSubcategoriesLoading(state) {
            state.retrieveSubcategoriesState = LoadingState.LOADING;
        },

        retrieveSubcategoriesError(state) {
            state.retrieveSubcategoriesState = LoadingState.ERROR;
        },
    },
});

export const { loadSubcategories, retrieveSubcategoriesError, retrieveSubcategoriesLoading, retrieveSubcategoriesSuccess } = subcategorySlice.actions;
export default subcategorySlice;