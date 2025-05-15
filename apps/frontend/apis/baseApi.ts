import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { auth } from "../config/firebase";
import { env } from "@/config/env";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: env.API_BASE_URL,
    prepareHeaders: async (headers) => {
      await auth.authStateReady();

      // Add auth token to request if available
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken(false);
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
        } catch (error) {
          console.error("Error getting auth token:", error);
        }
      }
      return headers;
    },
    // Handle response errors
    responseHandler: async (response) => {
      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const errorMessage = data?.message || response.statusText;
        throw new Error(errorMessage);
      }
      return response.json();
    },
  }),
  tagTypes: ["User", "Profile"],
  endpoints: () => ({}),
});
