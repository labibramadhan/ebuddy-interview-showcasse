"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetUserProfileQuery } from "@/apis/profileApi";
import { DataBoundaryOrganism } from "@/components/organisms/DataBoundaryOrganism";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ProfileContentOrganism } from "../organisms/ProfileContentOrganism";

export const ProfileTemplate: React.FC = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Fetch user profile from backend API
  const {
    data: userProfile,
    isLoading,
    error,
  } = useGetUserProfileQuery(undefined, { skip: !user?.id });

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3 } }}>
      <Box sx={{ mt: { xs: 3, sm: 4 }, mb: { xs: 3, sm: 4 } }}>
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" } }}
        >
          User Profile
        </Typography>

        <DataBoundaryOrganism
          isLoading={isLoading}
          error={error}
          loadingMessage="Loading profile data..."
        >
          <ProfileContentOrganism user={userProfile || null} />
        </DataBoundaryOrganism>
      </Box>
    </Container>
  );
};
