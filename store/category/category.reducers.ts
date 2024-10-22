import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category } from "@/module/category/models/Category";
import { LoadingState } from "../actionType/LoadingState";

export interface CategoryState {
    categories: Category[];
    retrieveCategorysState: LoadingState;
   
}

export const initialState: CategoryState = {
    categories: [],
    retrieveCategorysState: LoadingState.NONE,
};

const categorySlice = createSlice({
    name: "Category",
    initialState: initialState,
    reducers: {
        loadCategorys(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload;
        },

        retrieveCategorysSuccess(state) {
            state.retrieveCategorysState = LoadingState.SUCCES
        },

        retrieveCategorysLoading(state) {
            state.retrieveCategorysState = LoadingState.LOADING;
        },

        retrieveCategorysError(state) {
            state.retrieveCategorysState = LoadingState.ERROR;
        },

    },
});

export const { loadCategorys, retrieveCategorysError, retrieveCategorysLoading, retrieveCategorysSuccess } = categorySlice.actions;
export default categorySlice;
