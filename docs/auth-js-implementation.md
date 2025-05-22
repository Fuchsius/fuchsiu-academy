# Auth.js (formerly NextAuth.js) Implementation Guide

This document provides an overview of the authentication implementation in Fuchsiu Academy, which uses Auth.js (formerly NextAuth.js) version 5.

## Authentication Configuration

The main authentication configuration is in `auth.ts` at the root of the project, which exports:

- `handlers`: For API routes
- `signIn` and `signOut`: Helper functions
- `auth`: Function to get the session

## Authentication Providers

We support multiple authentication methods:

1. **Email Magic Links** - Sends a one-time link to the user's email for passwordless login
2. **Credentials** - Traditional username/password authentication
3. **Google OAuth** - Single-sign-on with Google

## File Structure

- `auth.ts` - Main Auth.js configuration
- `app/api/auth/[...nextauth]/route.ts` - API routes for Auth.js
- `app/providers.tsx` - React context providers including SessionProvider
- `lib/auth-context.tsx` - Our custom authentication context wrapper
- `middleware.ts` - Route protection middleware

## Session and JWT Configuration

We use JWT for storing sessions, which includes:

- User ID
- User role (if available)
- Provider information
- Access and refresh tokens (for OAuth)

## Usage in Components

To use authentication in a client component:

```tsx
"use client";
import { useAuth } from "@/lib/auth-context";

export function MyProtectedComponent() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.fullName || user.email}</h1>
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}
```

## Server-side Authentication

For server components and API routes, use the `auth()` function:

```tsx
import { auth } from "@/auth";

export default async function ServerComponent() {
  const session = await auth();

  if (!session?.user) {
    return <div>Please sign in</div>;
  }

  return <div>Welcome, {session.user.name || session.user.email}</div>;
}
```

## Middleware Protection

Routes under `/dashboard` and `/admin` are protected via middleware. The middleware checks for:

1. Authentication status
2. Admin role for `/admin` routes

## Custom Authentication Tokens

We store additional information in the JWT token:

- User ID
- Role information
- Provider details
- OAuth tokens

## Important Notes

1. The email provider is now called "email" instead of "nodemailer"
2. User role information is properly passed from JWT to the session
3. The SessionProvider wraps our custom AuthProvider for compatibility
