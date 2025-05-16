// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import { mount } from "cypress/react";
import React from "react";

// Import RootLayout dependencies
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/providers/AuthProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import { MountOptions, MountReturn } from "cypress/react";

// Initialize fonts (same as in RootLayout)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Augment the Cypress namespace to include type definitions for
// your custom command.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      /**
       * Mounts a React component wrapped in RootLayout providers
       * @param component - The React component to mount
       * @param options - Additional options to pass to mount
       */
      mountWithLayout(
        component: React.ReactNode,
        options?: MountOptions,
      ): Chainable<MountReturn>;
    }
  }
}

// Original mount command
Cypress.Commands.add("mount", mount);

// Create a wrapper component for RootLayout
function createRootLayoutWrapper(component: React.ReactNode) {
  // This function returns a JSX element that wraps the component with all providers
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <ThemeProvider>
            <AuthProvider>{component}</AuthProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

// Custom mount command that wraps components in RootLayout
function mountWithLayout(component: React.ReactNode, options = {}) {
  return mount(createRootLayoutWrapper(component), options);
}

Cypress.Commands.add("mountWithLayout", mountWithLayout);

// Example use:
// cy.mount(<MyComponent />) - without layout
// cy.mountWithLayout(<MyComponent />) - with layout
