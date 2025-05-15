"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setError } from "@/store/slices/authSlice";
import { LoginFormMolecule } from "../../molecules/login/LoginFormMolecule";
import { useLoginMutation } from "@/apis/firebaseApi";

export const LoginFormOrganism: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setLocalError] = useState<string | null>(null);

  // Use the login mutation hook from firebaseApi
  const [login, { isLoading: loading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    try {
      await login({ email, password }).unwrap();
      router.push("/profile");
    } catch (err) {
      const errorMessage = (err as Error).message || "Failed to login";
      setLocalError(errorMessage);
      dispatch(setError(errorMessage));
    }
  };

  return (
    <LoginFormMolecule
      email={email}
      password={password}
      loading={loading}
      error={error}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onSubmit={handleLogin}
    />
  );
};
