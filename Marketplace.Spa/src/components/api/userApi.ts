import {createApi} from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery.ts";
interface RegistrationRequest {
    username: string;
    email: string;
    password: string;
    phone: string;
}

interface RegistrationResponse {
    id: number;
    username: string;
    email: string;
    phone: string;
}
export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        registration: builder.mutation<RegistrationResponse, RegistrationRequest>({
            query: (user) => ({//тут ругаеться
                url: "/Authentication/Registration",
                method: "POST",
                body: user,
            }),
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/Authentication/Login",
                method: "POST",
                body,
            }),
        }),

    }),
});

export const {
    useRegistrationMutation,
    useLoginMutation,
} = usersApi;
