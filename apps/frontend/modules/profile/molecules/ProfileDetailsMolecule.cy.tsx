import React from "react";
import { ProfileDetailsMolecule } from "./ProfileDetailsMolecule";
import { User } from "@ebuddy/types/entities/user";
import { format } from "date-fns";

describe("<ProfileDetailsMolecule />", () => {
  it("renders with user data", () => {
    const mockUser: User = {
      id: "user123",
      email: "test@example.com",
      displayName: "Test User",
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-02T00:00:00.000Z",
    };

    cy.mount(<ProfileDetailsMolecule user={mockUser} />);

    // Check that user details are displayed correctly
    cy.contains("User ID").should("exist");
    cy.contains("user123").should("exist");

    cy.contains("Email").should("exist");
    cy.contains("test@example.com").should("exist");

    cy.contains("Created").should("exist");
    cy.contains(format(new Date(mockUser.createdAt), "PPP")).should("exist");

    cy.contains("Last Updated").should("exist");
    cy.contains(format(new Date(mockUser.updatedAt), "PPP")).should("exist");
  });

  it("renders with null user", () => {
    cy.mount(<ProfileDetailsMolecule user={null} />);

    // Check that labels exist but values are empty
    cy.contains("User ID").should("exist");
    cy.contains("Email").should("exist");
    cy.contains("Created").should("exist");
    cy.contains("Last Updated").should("exist");

    // Check for N/A in date fields
    cy.contains("N/A").should("exist");
  });

  it("handles missing date fields", () => {
    const mockUser: User = {
      id: "user123",
      email: "test@example.com",
      displayName: "Test User",
      // Omitting createdAt and updatedAt
    };

    cy.mount(<ProfileDetailsMolecule user={mockUser} />);

    // Check that N/A is displayed for missing dates
    cy.contains("Created").parent().contains("N/A").should("exist");
    cy.contains("Last Updated").parent().contains("N/A").should("exist");
  });
});
