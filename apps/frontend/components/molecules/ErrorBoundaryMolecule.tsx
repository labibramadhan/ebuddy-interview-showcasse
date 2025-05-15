"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface ErrorBoundaryMoleculeProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryMoleculeState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundaryMolecule extends Component<
  ErrorBoundaryMoleculeProps,
  ErrorBoundaryMoleculeState
> {
  constructor(props: ErrorBoundaryMoleculeProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryMoleculeState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  resetErrorBoundary = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });

    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Paper
          elevation={3}
          sx={{
            p: 3,
            m: 2,
            maxWidth: 500,
            mx: "auto",
            borderLeft: "4px solid #f44336",
          }}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <ErrorOutlineIcon color="error" sx={{ mr: 1, fontSize: 28 }} />
            <Typography variant="h6" color="error">
              Something went wrong
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" paragraph>
            {this.state.error?.message || "An unexpected error occurred"}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={this.resetErrorBoundary}
            fullWidth
          >
            Try again
          </Button>
        </Paper>
      );
    }

    return this.props.children;
  }
}
