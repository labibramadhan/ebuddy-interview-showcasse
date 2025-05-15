"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useUpdateUserProfileMutation } from "@/apis/profileApi";
import Paper from "@mui/material/Paper";
import { ProfileEditFormMolecule } from "../molecules/ProfileEditFormMolecule";
import { User } from "@ebuddy/types/entities/user";
import { useRouter } from "next/navigation";

interface ProfileEditFormOrganismProps {
  userProfile: User | null;
}

export const ProfileEditFormOrganism: React.FC<
  ProfileEditFormOrganismProps
> = ({ userProfile }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  // Update user profile mutation
  const [updateUserProfile, { isLoading: isUpdating, error: updateError }] =
    useUpdateUserProfileMutation();

  // Set form values when profile data is loaded
  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || "");
    }
  }, [userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSuccessMessage(null);

    if (!user?.id) {
      setLocalError("User not authenticated");
      return;
    }

    try {
      await updateUserProfile({
        userData: {
          displayName,
        },
      }).unwrap();

      setSuccessMessage("Profile updated successfully");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
        router.push("/profile");
      }, 2000);
    } catch (err) {
      setLocalError((err as Error).message || "Failed to update profile");
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, sm: 4 },
        borderRadius: 2,
        mt: 2,
      }}
    >
      <ProfileEditFormMolecule
        displayName={displayName}
        email={userProfile?.email || null}
        isUpdating={isUpdating}
        successMessage={successMessage}
        error={
          localError ||
          (updateError ? "An error occurred while updating your profile" : null)
        }
        onDisplayNameChange={(e) => setDisplayName(e.target.value)}
        onSubmit={handleSubmit}
      />
    </Paper>
  );
};
