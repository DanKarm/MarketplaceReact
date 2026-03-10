import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";
import type { ILoginUser, IRegistrationUser } from "../entity/IUser";
import { AccessTokenStorage } from "../services/AuthStorage";
import { setAuth } from "../app/isAuthSlice";

interface LoginResponse {
    token: string;
}

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery,
    endpoints: (build) => ({

        login: build.mutation<LoginResponse, ILoginUser>({
            query: (body) => ({
                url: "Authentication/Login",
                method: "POST",
                body,
            }),

            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    AccessTokenStorage.set(data.token);

                    dispatch(setAuth(true));

                } catch {}
            },
        }),

        registration: build.mutation<void, IRegistrationUser>({
            query: (body) => ({
                url: "Authentication/Registration",
                method: "POST",
                body,
            }),
        }),

    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
} = usersApi;