import React from "react";
import { ProfileEditFormMolecule } from "./ProfileEditFormMolecule";

describe("<ProfileEditFormMolecule />", () => {
  it("renders with default props", () => {
    const props = {
      displayName: "Test User",
      email: "test@example.com",
      isUpdating: false,
      successMessage: null,
      error: null,
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<ProfileEditFormMolecule {...props} />);

    // Check that form elements exist
    cy.get("input[value='Test User']").should("exist").and("not.be.disabled");
    cy.get("input[value='test@example.com']")
      .should("exist")
      .and("be.disabled");
    cy.get("button[type='submit']")
      .should("exist")
      .and("contain", "Save Changes");

    // Success and error alerts should not be visible
    cy.get("div.MuiAlert-standardSuccess").should("not.exist");
    cy.get("div.MuiAlert-standardError").should("not.exist");
  });

  it("renders with success message", () => {
    const props = {
      displayName: "Test User",
      email: "test@example.com",
      isUpdating: false,
      successMessage: "Profile updated successfully!",
      error: null,
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<ProfileEditFormMolecule {...props} />);

    // Success alert should be visible with the correct message
    cy.get("div.MuiAlert-standardSuccess")
      .should("exist")
      .within(() => {
        cy.get("p").should("contain", "Profile updated successfully!");
      });
  });

  it("renders with error message", () => {
    const props = {
      displayName: "Test User",
      email: "test@example.com",
      isUpdating: false,
      successMessage: null,
      error: "Failed to update profile",
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<ProfileEditFormMolecule {...props} />);

    // Error alert should be visible with the correct message
    cy.get("div.MuiAlert-standardError")
      .should("exist")
      .within(() => {
        cy.get("p").should("contain", "Failed to update profile");
      });
  });

  it("renders in updating state", () => {
    const props = {
      displayName: "Test User",
      email: "test@example.com",
      isUpdating: true,
      successMessage: null,
      error: null,
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<ProfileEditFormMolecule {...props} />);

    // Display name input should be disabled
    cy.get("input[value='Test User']").should("be.disabled");

    // Button should be disabled and show loading indicator
    cy.get("button[type='submit']")
      .should("be.disabled")
      .find("span.MuiCircularProgress-root")
      .should("exist");
  });

  it("calls onDisplayNameChange when display name input changes", () => {
    const onDisplayNameChange = cy.stub().as("onDisplayNameChange");
    const props = {
      displayName: "Test User",
      email: "test@example.com",
      isUpdating: false,
      successMessage: null,
      error: null,
      onDisplayNameChange,
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<ProfileEditFormMolecule {...props} />);
    cy.get("input[value='Test User']").clear().type("New Name");
    cy.get("@onDisplayNameChange").should("have.been.called");
  });

  it("calls onSubmit when form is submitted", () => {
    const onSubmit = cy.stub().as("onSubmit");
    const props = {
      displayName: "Test User",
      email: "test@example.com",
      isUpdating: false,
      successMessage: null,
      error: null,
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onSubmit,
    };

    cy.mount(<ProfileEditFormMolecule {...props} />);
    // Submit the form
    cy.get("form").submit();
    cy.get("@onSubmit").should("have.been.called");
  });

  it("displays avatar with user's display name", () => {
    const props = {
      displayName: "Test User",
      email: "test@example.com",
      isUpdating: false,
      successMessage: null,
      error: null,
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<ProfileEditFormMolecule {...props} />);
    cy.get("div.MuiAvatar-root")
      .should("exist")
      .and("have.attr", "alt", "Test User");
  });

  it("displays avatar with 'User' alt text when displayName is empty", () => {
    const props = {
      displayName: "",
      email: "test@example.com",
      isUpdating: false,
      successMessage: null,
      error: null,
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<ProfileEditFormMolecule {...props} />);
    cy.get("div.MuiAvatar-root")
      .should("exist")
      .and("have.attr", "alt", "User");
  });
});
