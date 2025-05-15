"use client";

import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

interface ProfileEditHeaderMoleculeProps {
  title: string;
}

export const ProfileEditHeaderMolecule: React.FC<
  ProfileEditHeaderMoleculeProps
> = ({ title }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Button
        component={Link}
        href="/profile"
        startIcon={<ArrowBackIcon />}
        sx={{ mr: 2 }}
      >
        Back
      </Button>
      <Typography component="h1" variant="h4">
        {title}
      </Typography>
    </Box>
  );
};
