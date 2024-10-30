import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import categorySlice from './category/category.reducers';
import subcategorySlice from './subcategory/subcategory.reducers';
import itemCategorySlice from './itemcategory/itemCategory.reducers';


const rootReducer = combineReducers({
    categoryState: categorySlice.reducer,
    subcategoryState : subcategorySlice.reducer,
    itemCategoryState : itemCategorySlice.reducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: {
               ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/FLUSH',
                    'persist/REGISTER',
                ],
            },
        }),
});


export const persistor = persistStore(store);

export default store;
