"use client";

import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

interface ProfileEditFormMoleculeProps {
  displayName: string;
  email: string | null;
  isUpdating: boolean;
  successMessage: string | null;
  error: string | null;
  onDisplayNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const ProfileEditFormMolecule: React.FC<
  ProfileEditFormMoleculeProps
> = ({
  displayName,
  email,
  isUpdating,
  successMessage,
  error,
  onDisplayNameChange,
  onSubmit,
}) => {
  return (
    <>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {successMessage}
          </Typography>
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {error}
          </Typography>
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Avatar alt={displayName || "User"} sx={{ width: 100, height: 100 }} />
      </Box>

      <Box component="form" onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Display Name"
              value={displayName}
              onChange={onDisplayNameChange}
              disabled={isUpdating}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={email || ""}
              disabled
              helperText="Email cannot be changed"
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isUpdating}
              sx={{ py: 1.5 }}
            >
              {isUpdating ? <CircularProgress size={24} /> : "Save Changes"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
