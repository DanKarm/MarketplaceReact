import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import type { IProduct } from "../entity/IProduct";

interface GetProductsParams {
    page?: number;
    pageSize?: number;
    search?: string;
}

interface GetProductsResponse {
    items: IProduct[];
    totalCount: number;
    page: number;
    pageSize: number;
}

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({

        getProducts: builder.query<GetProductsResponse, GetProductsParams | void>({
            query: (params) => ({
                url: "api/Product",
                params: {
                    page: 1,
                    pageSize: 10,
                    ...params,
                },
            }),
        }),

        getProductById: builder.query<IProduct, number>({
            query: (id) => `api/Product/${id}`,
        }),

    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
} = productsApi;