import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { baseApi } from "./baseApi";
import { auth } from "../config/firebase";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { User } from "@ebuddy/types/entities/user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
}

export const firebaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login with email and password
    login: builder.mutation<User, LoginRequest>({
      queryFn: async ({ email, password }) => {
        try {
          const userCredential: UserCredential =
            await signInWithEmailAndPassword(auth, email, password);

          const firebaseUser = userCredential.user;

          // Convert Firebase user to our User type
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || null,
            displayName: firebaseUser.displayName || null,
            createdAt:
              firebaseUser.metadata.creationTime || new Date().toISOString(),
            updatedAt:
              firebaseUser.metadata.lastSignInTime || new Date().toISOString(),
          };

          return { data: user };
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

    // Register with email and password
    register: builder.mutation<User, RegisterRequest>({
      queryFn: async ({ email, password, displayName }) => {
        try {
          const userCredential: UserCredential =
            await createUserWithEmailAndPassword(auth, email, password);

          const firebaseUser = userCredential.user;

          // Convert Firebase user to our User type
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || null,
            displayName: displayName || null,
            createdAt:
              firebaseUser.metadata.creationTime || new Date().toISOString(),
            updatedAt:
              firebaseUser.metadata.lastSignInTime || new Date().toISOString(),
          };

          return { data: user };
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

export const { useLoginMutation, useRegisterMutation } = firebaseApi;
