import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: baseQuery,
    tagTypes: ["Cart"],
    endpoints: (build) => ({

        getCart: build.query<any, void>({
            query: () => ({
                url: "api/cart",
                method: "GET",
            }),
            providesTags: ["Cart"],
        }),

        addToCart: build.mutation<any, { productId: number; quantity: number }>({
            query: (body) => ({
                url: "api/cart/add",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Cart"],
        }),

        updateCartItem: build.mutation<any, { productId: number; quantity: number }>({
            query: ({ productId, quantity }) => ({
                url: `api/cart/update?productId=${productId}&quantity=${quantity}`,
                method: "PUT",
            }),
            invalidatesTags: ["Cart"],
        }),

        removeCartItem: build.mutation<any, number>({
            query: (productId) => ({
                url: `api/cart/remove?productId=${productId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),

        clearCart: build.mutation<void, void>({
            query: () => ({
                url: "api/cart/clear",
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),

    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useRemoveCartItemMutation,
    useClearCartMutation,
} = cartApi;