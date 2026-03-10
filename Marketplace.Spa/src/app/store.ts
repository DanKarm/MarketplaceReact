import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../api/ProductApiBQ";
import { usersApi } from "../api/userApiBQ.ts";
import { cartApi } from "../api/CartApi";
import authReducer from "./isAuthSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,

        [productsApi.reducerPath]: productsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            productsApi.middleware,
            usersApi.middleware,
            cartApi.middleware
        ),

    devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;