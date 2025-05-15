import { baseApi } from "./baseApi";
import { User } from "@ebuddy/types/entities/user";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, unknown>({
      query: () => ({
        url: `/profile`,
        method: "GET",
      }),
      providesTags: () => [{ type: "Profile" }],
    }),

    updateUserProfile: builder.mutation<User, { userData: Partial<User> }>({
      query: ({ userData }) => ({
        url: `/profile`,
        method: "POST",
        body: userData,
      }),
      invalidatesTags: () => [{ type: "Profile" }],
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } =
  profileApi;
