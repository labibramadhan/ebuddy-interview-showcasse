"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { User } from "@ebuddy/types/entities/user";

interface ProfileHeaderMoleculeProps {
  user: User | null;
  onLogout: () => void;
}

export const ProfileHeaderMolecule: React.FC<ProfileHeaderMoleculeProps> = ({
  user,
  onLogout,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "center", sm: "flex-start" },
        mb: 3,
        gap: { xs: 2, sm: 0 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Avatar
          alt={user?.displayName || "User"}
          sx={{
            width: { xs: 70, sm: 80 },
            height: { xs: 70, sm: 80 },
            mb: { xs: 1, sm: 0 },
            mr: { xs: 0, sm: 2 },
          }}
        />
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            {user?.displayName || "No Name"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          gap: { xs: 2, sm: 1 },
        }}
      >
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          component={Link}
          href="/profile/edit"
          size="small"
          sx={{
            minWidth: { xs: "120px", sm: "auto" },
          }}
        >
          Edit Profile
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={onLogout}
          size="small"
          sx={{
            minWidth: { xs: "120px", sm: "auto" },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};
