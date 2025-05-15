"use client";

import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { setUser, setInitialized } from "@/store/slices/authSlice";
import { User } from "@ebuddy/types/entities/user";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider component to initialize and listen for auth state changes.
 * This ensures the auth state persists between page refreshes.
 */
export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    let authInitialized = false;

    // Set up persistent auth state listener
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          // Map Firebase user to our domain User model
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            createdAt:
              firebaseUser.metadata.creationTime || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          dispatch(setUser(user));
        } else {
          dispatch(setUser(null));
        }

        // Mark auth as initialized after first callback if not already done
        if (!authInitialized) {
          authInitialized = true;
          dispatch(setInitialized());
        }
      },
      (error) => {
        // Handle initialization error
        console.error("Firebase auth error:", error);
        if (!authInitialized) {
          authInitialized = true;
          dispatch(setInitialized()); // Still mark as initialized so the app doesn't hang
        }
      },
    );

    // Use authStateReady to ensure we know when Firebase has determined the initial state
    // This resolves immediately if the state is already available
    auth
      .authStateReady()
      .then(() => {
        if (!authInitialized) {
          authInitialized = true;
          dispatch(setInitialized());
        }
      })
      .catch((error) => {
        console.error("Auth state ready error:", error);
        if (!authInitialized) {
          authInitialized = true;
          dispatch(setInitialized());
        }
      });

    // Clean up subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  // Render children once auth is initialized
  return <>{children}</>;
}
