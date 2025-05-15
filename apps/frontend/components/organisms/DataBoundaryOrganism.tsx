"use client";

import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import type { SxProps, Theme } from "@mui/material/styles";
import { ErrorBoundaryMolecule } from "@/components/molecules/ErrorBoundaryMolecule";

interface DataBoundaryOrganismProps {
  children: ReactNode;
  isLoading?: boolean;
  error?: unknown;
  loadingMessage?: string;
  onReset?: () => void;
  sx?: SxProps<Theme>;
}

/**
 * DataBoundaryOrganism handles loading and error states for RTK Query
 * This component doesn't use Suspense but instead relies on isLoading prop
 */
export const DataBoundaryOrganism: React.FC<DataBoundaryOrganismProps> = ({
  children,
  isLoading,
  error,
  loadingMessage = "Loading data...",
  onReset,
  sx = {},
}) => {
  // Loading component
  const LoadingComponent = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={4}
      sx={sx}
    >
      <CircularProgress size={40} thickness={4} />
      <Typography variant="body2" color="text.secondary" mt={2}>
        {loadingMessage}
      </Typography>
    </Box>
  );

  // If loading, show loading component
  if (isLoading) {
    return LoadingComponent;
  }

  // If there's an error, show error boundary with the error
  if (error) {
    // Manually trigger error boundary by throwing the error
    throw error;
  }

  // If not loading and no error, just render children with error boundary protection
  return (
    <ErrorBoundaryMolecule onReset={onReset}>{children}</ErrorBoundaryMolecule>
  );
};
