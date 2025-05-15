"use client";

import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

interface LoginFormMoleculeProps {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginFormMolecule: React.FC<LoginFormMoleculeProps> = ({
  email,
  password,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {error}
          </Typography>
        </Alert>
      )}

      <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={onEmailChange}
          disabled={loading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={onPasswordChange}
          disabled={loading}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Sign In"}
        </Button>

        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/register">
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer" }}
              >
                {"Don't have an account? Sign Up"}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
