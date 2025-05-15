"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/apis/authApi";
import { User } from "@ebuddy/types/entities/user";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { ProfileHeaderMolecule } from "../molecules/ProfileHeaderMolecule";
import { ProfileDetailsMolecule } from "../molecules/ProfileDetailsMolecule";

interface ProfileContentOrganismProps {
  user: User | null;
}

export const ProfileContentOrganism: React.FC<ProfileContentOrganismProps> = ({
  user,
}) => {
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
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
      <ProfileHeaderMolecule user={user} onLogout={handleLogout} />

      <Divider sx={{ my: 3 }} />

      <ProfileDetailsMolecule user={user} />
    </Paper>
  );
};
