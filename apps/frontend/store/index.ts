import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { baseApi } from "../apis/baseApi";

// Configure the Redux store with our reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  // Add middleware including RTK Query's middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types to prevent serialization errors with Firebase instances
        ignoredActions: ["auth/login/fulfilled", "auth/register/fulfilled"],
      },
    }).concat(baseApi.middleware),
});

// Infer the RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
