"use client";

import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { User } from "@ebuddy/types/entities/user";
import { format } from "date-fns";

interface ProfileDetailsMoleculeProps {
  user: User | null;
}

export const ProfileDetailsMolecule: React.FC<ProfileDetailsMoleculeProps> = ({
  user,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" color="text.secondary">
          User ID
        </Typography>
        <Typography variant="body1">{user?.id}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" color="text.secondary">
          Email
        </Typography>
        <Typography variant="body1">{user?.email}</Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" color="text.secondary">
          Created
        </Typography>
        <Typography variant="body1">
          {user?.createdAt ? format(new Date(user.createdAt), "PPP") : "N/A"}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" color="text.secondary">
          Last Updated
        </Typography>
        <Typography variant="body1">
          {user?.updatedAt ? format(new Date(user.updatedAt), "PPP") : "N/A"}
        </Typography>
      </Grid>
    </Grid>
  );
};
