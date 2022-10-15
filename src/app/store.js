import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../features/api/apiSlice"
import filterReducer from "../features/filters/filterSlice";

export const store = configureStore({
    reducer : {
        filters : filterReducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    middleware : (getDefaultMiddlewares) => 
        getDefaultMiddlewares().concat(apiSlice.middleware),
})