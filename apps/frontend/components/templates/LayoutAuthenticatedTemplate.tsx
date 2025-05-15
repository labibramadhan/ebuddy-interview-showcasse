"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function LayoutAuthenticatedTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, initialized, loading } = useSelector(
    (state: RootState) => state.auth,
  );

  // Redirect to login if not authenticated after auth is initialized
  useEffect(() => {
    const pathname = window.location.pathname;
    if (initialized && !loading) {
      if (!user) {
        // Only redirect if not already on login or register pages
        if (!pathname.includes("/login") && !pathname.includes("/register")) {
          router.push("/login");
        }
      } else {
        if (
          pathname.includes("/login") ||
          pathname.includes("/register") ||
          pathname === "/"
        ) {
          router.push("/profile");
        }
      }
    }
  }, [user, initialized, loading, router]);

  // Show loading state while auth is initializing
  if (!initialized || loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress size={40} thickness={4} />
        <Typography variant="body2" color="text.secondary" mt={2}>
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  // Render children if authenticated
  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Container
        maxWidth="xl"
        sx={{
          minHeight: "100vh",
          py: 2,
          backgroundColor: "#ffffff",
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
