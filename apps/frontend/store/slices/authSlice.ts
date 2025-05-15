import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@ebuddy/types/entities/user";

// Define the auth state interface
interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean; // Flag to track if Firebase Auth has completed initialization
}

// Initial state
const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  initialized: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: AuthState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state: AuthState) => {
      state.error = null;
    },
    setInitialized: (state: AuthState) => {
      state.initialized = true;
      state.loading = false; // Once initialized, no longer loading
    },
  },
});

export const { setUser, setLoading, setError, clearError, setInitialized } =
  authSlice.actions;
export default authSlice.reducer;
