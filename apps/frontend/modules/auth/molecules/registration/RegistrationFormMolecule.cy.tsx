import React from "react";
import { RegistrationFormMolecule } from "./RegistrationFormMolecule";

describe("<RegistrationFormMolecule />", () => {
  it("renders with default props", () => {
    const props = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      error: null,
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onConfirmPasswordChange: cy.stub().as("onConfirmPasswordChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<RegistrationFormMolecule {...props} />);

    // Check that form elements exist
    cy.get("input#displayName").should("exist");
    cy.get("input#email").should("exist");
    cy.get("input#password").should("exist");
    cy.get("input#confirmPassword").should("exist");
    cy.get("button[type='submit']").should("exist").and("contain", "Register");

    // Error alert should not be visible
    cy.get("div.MuiAlert-root").should("not.exist");
  });

  it("renders with error message", () => {
    const props = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      error: "Email already in use",
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onConfirmPasswordChange: cy.stub().as("onConfirmPasswordChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<RegistrationFormMolecule {...props} />);

    // Error alert should be visible with the correct message
    cy.get("div.MuiAlert-root")
      .should("exist")
      .should("contain", "Email already in use");
  });

  it("renders in loading state", () => {
    const props = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: true,
      error: null,
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onConfirmPasswordChange: cy.stub().as("onConfirmPasswordChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<RegistrationFormMolecule {...props} />);

    // Form inputs should be disabled
    cy.get("input#displayName").should("be.disabled");
    cy.get("input#email").should("be.disabled");
    cy.get("input#password").should("be.disabled");
    cy.get("input#confirmPassword").should("be.disabled");

    // Button should be disabled and show loading indicator
    cy.get("button[type='submit']")
      .should("be.disabled")
      .find("span.MuiCircularProgress-root")
      .should("exist");
  });

  it("calls onDisplayNameChange when display name input changes", () => {
    const onDisplayNameChange = cy.stub().as("onDisplayNameChange");
    const props = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      error: null,
      onDisplayNameChange,
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onConfirmPasswordChange: cy.stub().as("onConfirmPasswordChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<RegistrationFormMolecule {...props} />);
    cy.get("input#displayName").type("John Doe");
    cy.get("@onDisplayNameChange").should("have.been.called");
  });

  it("calls onEmailChange when email input changes", () => {
    const onEmailChange = cy.stub().as("onEmailChange");
    const props = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      error: null,
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onEmailChange,
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onConfirmPasswordChange: cy.stub().as("onConfirmPasswordChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<RegistrationFormMolecule {...props} />);
    cy.get("input#email").type("test@example.com");
    cy.get("@onEmailChange").should("have.been.called");
  });

  it("calls onPasswordChange when password input changes", () => {
    const onPasswordChange = cy.stub().as("onPasswordChange");
    const props = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      error: null,
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange,
      onConfirmPasswordChange: cy.stub().as("onConfirmPasswordChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<RegistrationFormMolecule {...props} />);
    cy.get("input#password").type("password123");
    cy.get("@onPasswordChange").should("have.been.called");
  });

  it("calls onConfirmPasswordChange when confirm password input changes", () => {
    const onConfirmPasswordChange = cy.stub().as("onConfirmPasswordChange");
    const props = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      error: null,
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onConfirmPasswordChange,
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<RegistrationFormMolecule {...props} />);
    cy.get("input#confirmPassword").type("password123");
    cy.get("@onConfirmPasswordChange").should("have.been.called");
  });

  it("calls onSubmit when form is submitted", () => {
    const onSubmit = cy.stub().as("onSubmit");
    const props = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      error: null,
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onConfirmPasswordChange: cy.stub().as("onConfirmPasswordChange"),
      onSubmit,
    };

    cy.mount(<RegistrationFormMolecule {...props} />);
    // Submit the form
    cy.get("form").submit();
    cy.get("@onSubmit").should("have.been.called");
  });

  it("displays sign in link", () => {
    const props = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      error: null,
      onDisplayNameChange: cy.stub().as("onDisplayNameChange"),
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onConfirmPasswordChange: cy.stub().as("onConfirmPasswordChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<RegistrationFormMolecule {...props} />);
    cy.contains("Already have an account? Sign In")
      .should("exist")
      .and("have.attr", "href", "/login");
  });
});
