import { signOut } from "firebase/auth";
import { baseApi } from "./baseApi";
import { auth } from "../config/firebase";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Logout user
    logout: builder.mutation<null, void>({
      queryFn: async () => {
        try {
          await signOut(auth);
          return { data: null };
        } catch (error) {
          const e = error as Error;
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: e.message,
            } as FetchBaseQueryError,
          };
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLogoutMutation } = authApi;
