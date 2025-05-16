import React from "react";
import { LoginFormMolecule } from "./LoginFormMolecule";

describe("<LoginFormMolecule />", () => {
  beforeEach(() => {
    // Reset stubs before each test
    cy.stub().as("onEmailChange");
    cy.stub().as("onPasswordChange");
    cy.stub().as("onSubmit");
  });

  it("renders with default props", () => {
    const props = {
      email: "",
      password: "",
      loading: false,
      error: null,
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<LoginFormMolecule {...props} />);

    // Check that form elements exist
    cy.get("input#email").should("exist");
    cy.get("input#password").should("exist");
    cy.get("button[type='submit']").should("exist").and("contain", "Sign In");

    // Error alert should not be visible
    cy.get("div.MuiAlert-root").should("not.exist");
  });

  it("renders with error message", () => {
    const props = {
      email: "",
      password: "",
      loading: false,
      error: "Invalid credentials",
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<LoginFormMolecule {...props} />);

    // Error alert should be visible with the correct message
    cy.get("div.MuiAlert-root")
      .should("exist")
      .within(() => {
        cy.get("p").should("contain", "Invalid credentials");
      });
  });

  it("renders in loading state", () => {
    const props = {
      email: "",
      password: "",
      loading: true,
      error: null,
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<LoginFormMolecule {...props} />);

    // Form inputs should be disabled
    cy.get("input#email").should("be.disabled");
    cy.get("input#password").should("be.disabled");

    // Button should be disabled and show loading indicator
    cy.get("button[type='submit']")
      .should("be.disabled")
      .find("span.MuiCircularProgress-root")
      .should("exist");
  });

  it("calls onEmailChange when email input changes", () => {
    const onEmailChange = cy.stub().as("onEmailChange");
    const props = {
      email: "",
      password: "",
      loading: false,
      error: null,
      onEmailChange,
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<LoginFormMolecule {...props} />);
    cy.get("input#email").type("test@example.com");
    cy.get("@onEmailChange").should("have.been.called");
  });

  it("calls onPasswordChange when password input changes", () => {
    const onPasswordChange = cy.stub().as("onPasswordChange");
    const props = {
      email: "",
      password: "",
      loading: false,
      error: null,
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange,
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<LoginFormMolecule {...props} />);
    cy.get("input#password").type("password123");
    cy.get("@onPasswordChange").should("have.been.called");
  });

  it("calls onSubmit when form is submitted", () => {
    const onSubmit = cy.stub().as("onSubmit");
    const props = {
      email: "",
      password: "",
      loading: false,
      error: null,
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onSubmit,
    };

    cy.mount(<LoginFormMolecule {...props} />);
    // Submit the form
    cy.get("form").submit();
    cy.get("@onSubmit").should("have.been.called");
  });

  it("displays sign up link", () => {
    const props = {
      email: "",
      password: "",
      loading: false,
      error: null,
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onSubmit: cy.stub().as("onSubmit"),
    };

    cy.mount(<LoginFormMolecule {...props} />);
    cy.contains("Don't have an account? Sign Up")
      .should("exist")
      .and("have.attr", "href", "/register");
  });
});
