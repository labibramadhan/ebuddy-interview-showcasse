"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setError } from "@/store/slices/authSlice";
import { RegistrationFormMolecule } from "../../molecules/registration/RegistrationFormMolecule";
import { useRegisterMutation } from "@/apis/firebaseApi";

export const RegistrationFormOrganism: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setLocalError] = useState<string | null>(null);

  // Use the register mutation hook from firebaseApi
  const [register, { isLoading: loading }] = useRegisterMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Validate password match
    if (password !== confirmPassword) {
      setLocalError("Passwords don't match");
      return;
    }

    try {
      // Register user using the firebaseApi
      await register({
        email,
        password,
        displayName,
      }).unwrap();

      // Navigate to profile page after successful registration
      router.push("/profile");
    } catch (err) {
      const errorMessage = (err as Error).message || "Failed to register";
      setLocalError(errorMessage);
      dispatch(setError(errorMessage));
    }
  };

  return (
    <RegistrationFormMolecule
      displayName={displayName}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      loading={loading}
      error={error}
      onDisplayNameChange={(e) => setDisplayName(e.target.value)}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
      onSubmit={handleRegister}
    />
  );
};
