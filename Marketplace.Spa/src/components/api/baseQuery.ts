import {
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { AccessTokenStorage } from "../../services/AuthStorage";

const BASE_URL = "https://localhost:44367/";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const token = AccessTokenStorage.get();

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
    },
});


const baseQueryWithLogout: typeof baseQuery = async (
    args,
    api,
    extraOptions
) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        AccessTokenStorage.clear();
    }

    return result;
};

export default baseQueryWithLogout;