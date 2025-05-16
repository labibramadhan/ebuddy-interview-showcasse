# eBuddy Interview Challenge

This project is a full-stack application built with a modern tech stack using Turborepo as the monorepo management tool. It demonstrates a clean architecture approach with separation of concerns and follows SOLID principles.

- [eBuddy Interview Challenge](#ebuddy-interview-challenge)
  - [FAQ ❓](#faq-)
    - [❓ What UI kit is being used?](#-what-ui-kit-is-being-used)
    - [❓ How is API call abstraction managed in the frontend?](#-how-is-api-call-abstraction-managed-in-the-frontend)
    - [❓ How is the state management of API state handled?](#-how-is-the-state-management-of-api-state-handled)
    - [❓ How does the backend manage controllers, routes, and authentication validation?](#-how-does-the-backend-manage-controllers-routes-and-authentication-validation)
    - [❓ Is the backend using clean architecture?](#-is-the-backend-using-clean-architecture)
    - [❓ How easy would it be to replace Firebase with another database or authentication solution?](#-how-easy-would-it-be-to-replace-firebase-with-another-database-or-authentication-solution)
  - [Tech Stack](#tech-stack)
    - [Monorepo Structure](#monorepo-structure)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Shared](#shared)
  - [Directory Structure](#directory-structure)
  - [Code Quality](#code-quality)
    - [Husky and Git Hooks](#husky-and-git-hooks)
    - [Linting and Formatting](#linting-and-formatting)
  - [Testing](#testing)
    - [Frontend Testing with Cypress](#frontend-testing-with-cypress)
      - [Component Testing](#component-testing)
  - [Implementation Examples](#implementation-examples)
    - [Turborepo](#turborepo)
    - [Firebase](#firebase)
    - [Next.js \& React](#nextjs--react)
    - [Redux Toolkit Query](#redux-toolkit-query)
    - [Express.js with TSOA](#expressjs-with-tsoa)
    - [TSyringe](#tsyringe)
  - [Code Structure Examples](#code-structure-examples)
    - [Frontend Atomic Design Pattern](#frontend-atomic-design-pattern)
      - [1. Atoms (Basic Building Blocks)](#1-atoms-basic-building-blocks)
      - [2. Molecules (Groups of Atoms)](#2-molecules-groups-of-atoms)
      - [3. Organisms (Groups of Molecules)](#3-organisms-groups-of-molecules)
      - [4. Templates (Page Layouts)](#4-templates-page-layouts)
      - [5. Page (Next.js App Router)](#5-page-nextjs-app-router)
    - [Backend Structure with Dependency Injection](#backend-structure-with-dependency-injection)
      - [1. Entity Definition (Shared Types)](#1-entity-definition-shared-types)
      - [2. Repository Interface (Domain Layer)](#2-repository-interface-domain-layer)
      - [3. Repository Implementation (Domain Layer)](#3-repository-implementation-domain-layer)
      - [4. Use Case (Domain Layer)](#4-use-case-domain-layer)
      - [5. Controller (Backend App)](#5-controller-backend-app)
      - [6. Dependency Registration (Backend App)](#6-dependency-registration-backend-app)
  - [Configuration](#configuration)
    - [Environment Variables](#environment-variables)
      - [Backend (.env in apps/backend)](#backend-env-in-appsbackend)
      - [Frontend (.env in apps/frontend)](#frontend-env-in-appsfrontend)
  - [Development](#development)
    - [Prerequisites](#prerequisites)
    - [Starting Development Servers](#starting-development-servers)
    - [Building the Project](#building-the-project)
  - [License](#license)

## FAQ ❓

### ❓ What UI kit is being used?

✅ The project uses React Material UI (MUI) for the component library. A custom theme is defined in `apps/frontend/theme/index.ts` to ensure consistent styling across the application. This includes customized colors, typography, and component variants that match the design requirements.

### ❓ How is API call abstraction managed in the frontend?

✅ API calls are abstracted using Redux Toolkit Query (RTK Query). This provides a clean way to define API endpoints, handle caching, and manage loading/error states. API definitions are located in `apps/frontend/apis` directory and are integrated with the Redux store.

Example of API definition:

```typescript
// apps/frontend/apis/userApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "@ebuddy/types/entities/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, string>({
      query: (userId) => `profile/${userId}`,
    }),
    updateUserProfile: builder.mutation<
      User,
      { userId: string; userData: Partial<User> }
    >({
      query: ({ userId, userData }) => ({
        url: `profile/${userId}`,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = userApi;
```

### ❓ How is the state management of API state handled?

✅ The state management of API calls (loading, success, error states) is handled by Redux Toolkit Query. The `isLoading`, `isError`, and `error` properties returned by the hooks are passed to dedicated components that handle the UI representation of these states.

Example of using the API state:

```tsx
// apps/frontend/modules/profile/templates/ProfileTemplate.tsx
import { LoadingIndicator } from "../../components/atoms/LoadingIndicator";
import { ErrorMessage } from "../../components/atoms/ErrorMessage";
import { useGetUserProfileQuery } from "../../apis/userApi";

export const ProfileContainer = ({ userId }) => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetUserProfileQuery(userId);

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorMessage error={error} />;

  return <ProfileTemplate user={user} />;
};
```

### ❓ How does the backend manage controllers, routes, and authentication validation?

✅ The backend uses TSOA to generate routes and OpenAPI documentation from TypeScript controllers. Authentication validation is handled by middleware that verifies Firebase JWT tokens. TSyringe is used for dependency injection, allowing controllers to receive their dependencies automatically.

TSOA decorators like `@Route`, `@Get`, `@Post`, and `@Security` define the API endpoints and their security requirements. The routes are automatically generated during the build process.

### ❓ Is the backend using clean architecture?

✅ Yes, the backend follows clean architecture principles with clear separation of concerns:

1. **Entities** (in `packages/types`): Define the core business objects
2. **Use Cases** (in `packages/domain/usecase`): Contain application-specific business rules
3. **Interfaces** (in `packages/domain/repository`): Define contracts for external dependencies
4. **Controllers** (in `apps/backend/controller`): Handle HTTP requests and responses
5. **Infrastructure** (in `packages/backend`): Implement external interfaces like database access

This architecture ensures that business logic is independent of frameworks and external concerns, making it more testable and maintainable.

### ❓ How easy would it be to replace Firebase with another database or authentication solution?

✅ The project structure makes it very easy to replace Firebase with another solution due to the following architectural decisions:

1. **Repository Pattern**: All database interactions are abstracted behind repository interfaces in `packages/domain/repository`. To switch from Firebase to another database (like MongoDB or PostgreSQL), you would only need to create new implementations of these interfaces without changing any business logic.

```typescript
// Example: Creating a MongoDB implementation of the UserRepository
@injectable()
export class MongoUserRepository implements IUserRepository {
  constructor(private mongoClient: MongoClient) {}

  async getUserById(id: string): Promise<User | null> {
    const user = await this.mongoClient
      .db()
      .collection("users")
      .findOne({ id });
    return user ? this.mapToUser(user) : null;
  }

  // Other methods...
}
```

2. **Dependency Injection**: TSyringe is used for dependency injection, making it easy to swap implementations. You would only need to update the registration in the DI container:

```typescript
// Change this line in the DI container
// From:
container.registerSingleton<IUserRepository>(
  "IUserRepository",
  FirebaseUserRepository,
);
// To:
container.registerSingleton<IUserRepository>(
  "IUserRepository",
  MongoUserRepository,
);
```

3. **Authentication Middleware**: Authentication is handled by middleware that can be replaced without affecting the rest of the application. The controllers only know that requests are authenticated, not how they are authenticated.

4. **Configuration Abstraction**: Environment variables and configuration are centralized, making it easy to update connection strings and credentials.

This approach follows the Dependency Inversion Principle from SOLID, ensuring that high-level modules (business logic) don't depend on low-level modules (database implementations), but both depend on abstractions.

## Tech Stack

### Monorepo Structure

- **Turborepo**: Used for managing the monorepo, handling dependencies between packages, and optimizing builds

### Backend

- **Express.js**: Web server framework
- **TSOA**: TypeScript OpenAPI for route generation and API documentation
- **TSyringe**: Dependency injection container for TypeScript
- **Firebase Admin**: For server-side authentication and Firestore operations

### Frontend

- **Next.js**: React framework for building the UI
- **React**: UI library
- **Redux Toolkit**: State management with RTK Query for API calls
- **Material UI**: Component library for consistent styling
- **Firebase SDK**: Client-side authentication

### Shared

- **TypeScript**: Used throughout the codebase for type safety
- **Firebase Emulators**: For local development
- **pnpm**: Package manager

## Directory Structure

```
├── apps/
│   ├── backend/            # Express.js backend application
│   │   ├── config/         # Configuration files
│   │   ├── controller/     # TSOA controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # Generated routes
│   │   └── src/            # Source code
│   └── frontend/           # Next.js frontend application
│       ├── apis/           # API client code
│       ├── app/            # Next.js app router pages
│       ├── components/     # Shared components (atomic design)
│       ├── modules/        # Feature-specific components
│       ├── providers/      # React context providers
│       ├── store/          # Redux store configuration
│       └── theme/          # Material UI theme
├── packages/
│   ├── backend/            # Shared backend utilities
│   ├── domain/             # Business logic, DTOs, repositories
│   └── types/              # Shared TypeScript types
│       └── entities/       # Entity definitions
└── turbo.json              # Turborepo configuration
```

## Code Quality

### Husky and Git Hooks

This project uses Husky to manage Git hooks, ensuring code quality checks are run before commits and pushes. The following hooks are configured:

- **pre-commit**: Runs linting and formatting checks on staged files
- **pre-push**: Runs tests to ensure all tests pass before pushing to the repository

This helps maintain consistent code quality and prevents problematic code from being committed or pushed to the repository.

### Linting and Formatting

The project uses:

- **ESLint**: For static code analysis
- **Prettier**: For code formatting
- **TypeScript**: For type checking

These tools are configured project-wide and can be run with the following commands:

```
pnpm lint        # Run ESLint
pnpm format      # Run Prettier
pnpm type-check  # Run TypeScript type checking
```

## Testing

### Frontend Testing with Cypress

The frontend uses Cypress for component testing. Cypress provides a powerful framework for testing React components in isolation or with their required context providers.

#### Component Testing

Components are tested using Cypress Component Testing, which allows testing React components in a real browser environment. The tests are located alongside the components with a `.cy.tsx` extension.

The testing setup includes:

- **Custom mount commands**: Including `cy.mount()` for basic component mounting and `cy.mountWithLayout()` for mounting components with all the application's providers (Redux, Theme, Auth)
- **Stub utilities**: For mocking callbacks and testing component interactions
- **Atomic design testing**: Tests are organized following the atomic design pattern (atoms, molecules, organisms, templates)

To run component tests:

```
# Run tests in headless mode
pnpm --filter frontend test

# Open Cypress Test Runner for interactive testing
pnpm --filter frontend cypress open --component
```

Example of a component test:

```tsx
describe("<LoginFormMolecule />", () => {
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
  });
});
```

## Implementation Examples

### Turborepo

The `turbo.json` file in the root directory configures the build pipeline and dependencies between packages.

### Firebase

- **Authentication**: Implemented in `apps/frontend/apis/firebaseApi.ts` and `apps/frontend/providers/AuthProvider.tsx`
- **Firestore**: Database operations in `packages/domain/repository` and used in backend controllers

### Next.js & React

The frontend application in `apps/frontend` uses Next.js 14+ with the App Router for routing and React for UI components.

### Redux Toolkit Query

API queries are defined in `apps/frontend/apis` and integrated with the Redux store in `apps/frontend/store`.

### Express.js with TSOA

The backend in `apps/backend` uses Express with TSOA for API routes generation and documentation, with controllers in `apps/backend/controller`.

### TSyringe

Dependency injection is used in the domain layer (`packages/domain`) for better testability and separation of concerns.

## Code Structure Examples

### Frontend Atomic Design Pattern

The frontend follows the atomic design pattern, organizing components into atoms, molecules, organisms, and templates:

#### 1. Atoms (Basic Building Blocks)

```tsx
// apps/frontend/components/atoms/Button.tsx
import { Button as MuiButton, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  // Additional props if needed
}

export const Button = ({ children, ...props }: CustomButtonProps) => {
  return <MuiButton {...props}>{children}</MuiButton>;
};
```

#### 2. Molecules (Groups of Atoms)

```tsx
// apps/frontend/modules/profile/molecules/ProfileHeaderMolecule.tsx
import { Box, Typography, Avatar } from "@mui/material";
import { User } from "@ebuddy/types/entities/user";

interface ProfileHeaderMoleculeProps {
  user: User;
}

export const ProfileHeaderMolecule = ({ user }: ProfileHeaderMoleculeProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: { xs: 2, md: 3 },
      }}
    >
      <Avatar sx={{ width: 64, height: 64 }}>
        {user.displayName ? user.displayName[0] : user.email?.[0]}
      </Avatar>
      <Box>
        <Typography variant="h5">{user.displayName || "User"}</Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};
```

#### 3. Organisms (Groups of Molecules)

```tsx
// apps/frontend/modules/profile/organisms/ProfileContentOrganism.tsx
import { Box } from "@mui/material";
import { ProfileHeaderMolecule } from "../molecules/ProfileHeaderMolecule";
import { ProfileDetailsMolecule } from "../molecules/ProfileDetailsMolecule";
import { User } from "@ebuddy/types/entities/user";

interface ProfileContentOrganismProps {
  user: User;
}

export const ProfileContentOrganism = ({
  user,
}: ProfileContentOrganismProps) => {
  return (
    <Box sx={{ width: "100%" }}>
      <ProfileHeaderMolecule user={user} />
      <ProfileDetailsMolecule user={user} />
    </Box>
  );
};
```

#### 4. Templates (Page Layouts)

```tsx
// apps/frontend/modules/profile/templates/ProfileTemplate.tsx
import { Box, Container, Paper } from "@mui/material";
import { ProfileContentOrganism } from "../organisms/ProfileContentOrganism";
import { User } from "@ebuddy/types/entities/user";

interface ProfileTemplateProps {
  user: User;
}

export const ProfileTemplate = ({ user }: ProfileTemplateProps) => {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <Paper elevation={2} sx={{ overflow: "hidden" }}>
        <ProfileContentOrganism user={user} />
      </Paper>
    </Container>
  );
};
```

#### 5. Page (Next.js App Router)

```tsx
// apps/frontend/app/profile/page.tsx
"use client";

import { useSelector } from "react-redux";
import { ProfileTemplate } from "../../modules/profile/templates/ProfileTemplate";
import { selectUser } from "../../store/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const user = useSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return <ProfileTemplate user={user} />;
}
```

### Backend Structure with Dependency Injection

The backend uses TSyringe for dependency injection, with business logic in the domain package:

#### 1. Entity Definition (Shared Types)

```typescript
// packages/types/entities/user.ts
export interface User {
  id: string;
  email: string | null;
  displayName: string | null;
  createdAt: string;
  updatedAt: string;
}
```

#### 2. Repository Interface (Domain Layer)

```typescript
// packages/domain/repository/user-repository.interface.ts
import { User } from "@ebuddy/types/entities/user";

export interface IUserRepository {
  getUserById(id: string): Promise<User | null>;
  updateUser(id: string, userData: Partial<User>): Promise<User>;
  createUser(user: User): Promise<User>;
}
```

#### 3. Repository Implementation (Domain Layer)

```typescript
// packages/domain/repository/user-repository.ts
import { injectable } from "tsyringe";
import { User } from "@ebuddy/types/entities/user";
import { IUserRepository } from "./user-repository.interface";
import { FirebaseService } from "@ebuddy/backend/services/firebase.service";

@injectable()
export class UserRepository implements IUserRepository {
  constructor(private firebaseService: FirebaseService) {}

  async getUserById(id: string): Promise<User | null> {
    const userDoc = await this.firebaseService.firestore
      .collection("USERS")
      .doc(id)
      .get();

    if (!userDoc.exists) return null;
    return userDoc.data() as User;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const updatedData = {
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    await this.firebaseService.firestore
      .collection("USERS")
      .doc(id)
      .update(updatedData);

    const updatedUser = await this.getUserById(id);
    if (!updatedUser) throw new Error("User not found after update");
    return updatedUser;
  }

  async createUser(user: User): Promise<User> {
    await this.firebaseService.firestore
      .collection("USERS")
      .doc(user.id)
      .set(user);

    return user;
  }
}
```

#### 4. Use Case (Domain Layer)

```typescript
// packages/domain/usecase/user-usecase.ts
import { injectable } from "tsyringe";
import { IUserRepository } from "../repository/user-repository.interface";
import { User } from "@ebuddy/types/entities/user";

@injectable()
export class UserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async getUserProfile(userId: string): Promise<User | null> {
    return this.userRepository.getUserById(userId);
  }

  async updateUserProfile(
    userId: string,
    userData: Partial<User>,
  ): Promise<User> {
    return this.userRepository.updateUser(userId, userData);
  }
}
```

#### 5. Controller (Backend App)

```typescript
// apps/backend/controller/profile.controller.ts
import { injectable } from "tsyringe";
import { Controller, Get, Path, Post, Body, Route, Security } from "tsoa";
import { UserUseCase } from "@ebuddy/domain/usecase/user-usecase";
import { User } from "@ebuddy/types/entities/user";

@injectable()
@Route("profile")
export class ProfileController extends Controller {
  constructor(private userUseCase: UserUseCase) {
    super();
  }

  @Get()
  @Security("jwt")
  public async getUserProfile(@Path() userId: string): Promise<User | null> {
    return this.userUseCase.getUserProfile(userId);
  }

  @Post()
  @Security("jwt")
  public async updateUserProfile(
    @Path() userId: string,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return this.userUseCase.updateUserProfile(userId, userData);
  }
}
```

#### 6. Dependency Registration (Backend App)

```typescript
// apps/backend/src/di-container.ts
import { container } from "tsyringe";
import { FirebaseService } from "@ebuddy/backend/services/firebase.service";
import { IUserRepository } from "@ebuddy/domain/repository/user-repository.interface";
import { UserRepository } from "@ebuddy/domain/repository/user-repository";
import { UserUseCase } from "@ebuddy/domain/usecase/user-usecase";
import { ProfileController } from "../controller/profile.controller";

// Register services
container.registerSingleton(FirebaseService);

// Register repositories
container.registerSingleton<IUserRepository>("IUserRepository", UserRepository);

// Register use cases
container.registerSingleton(UserUseCase);

// Register controllers
container.registerSingleton(ProfileController);

export { container };
```

## Configuration

### Environment Variables

#### Backend (.env in apps/backend)

```
PORT=3001
LOG_LEVEL=info
FIREBASE_EMULATOR=true
FIREBASE_PROJECT_ID=ebuddy-interview-challenge
FIREBASE_API_KEY=demo-key
FIREBASE_EMULATOR_HOST=127.0.0.1
FIREBASE_EMULATOR_AUTH_PORT=9099
FIREBASE_EMULATOR_FIRESTORE_PORT=8080
```

#### Frontend (.env in apps/frontend)

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_FIREBASE_API_KEY=demo-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ebuddy-interview-challenge.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ebuddy-interview-challenge
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ebuddy-interview-challenge.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
NEXT_PUBLIC_FIREBASE_EMULATOR=true
NEXT_PUBLIC_FIREBASE_EMULATOR_HOST=127.0.0.1
NEXT_PUBLIC_FIREBASE_EMULATOR_AUTH_PORT=9099
NEXT_PUBLIC_FIREBASE_EMULATOR_FIRESTORE_PORT=8080
```

## Development

### Prerequisites

- Node.js 18+
- pnpm
- Firebase CLI (for emulators)

### Starting Development Servers

1. Install dependencies:

   ```
   pnpm install
   ```

2. Start Firebase emulators:

   ```
   pnpm firebase:emulators
   ```

3. Start development servers:
   ```
   pnpm dev
   ```
   This will start both frontend and backend in development mode.

### Building the Project

To build all packages and applications:

```
pnpm build
```

This command uses Turborepo to build all packages in the correct order based on dependencies.

## License

This project is part of an interview challenge and is not licensed for public use.
