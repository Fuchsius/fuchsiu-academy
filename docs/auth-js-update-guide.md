# Auth.js Update Guide

This document summarizes the changes made to update the authentication system from NextAuth.js to Auth.js (v5).

## Overview of Changes

The Fuchsiu Academy project has been updated to use Auth.js v5 (formerly NextAuth.js) with the following key changes:

1. Updated imports for providers
2. Updated session handling
3. Simplified middleware using `auth()` function
4. Fixed role-based access control
5. Improved typings for user sessions

## Specific Changes Made

### 1. Updates to auth.ts

- Changed provider imports from `next-auth/providers/*` to `@auth/core/providers/*`
- Changed "nodemailer" provider to "email" provider
- Added role field to Session and User type definitions
- Updated callbacks to include role information in the session

### 2. Updates to API Routes

All API routes were updated to:

- Replace `import { getServerSession } from "next-auth";` and `import { authOptions } from "@/auth";` with `import { auth } from "@/auth";`
- Replace `const session = await getServerSession(authOptions);` with `const session = await auth();`

### 3. Updates to Server Actions

All server actions were updated to use the `auth()` function instead of `getServerSession`.

### 4. Updates to Client Components

- Updated `AuthContext` to work with the new session structure
- Fixed sign-in component to use the correct provider names

### 5. Updates to Middleware

- Updated middleware.ts to use `auth()` function for protected routes
- Improved role-based route protection

## How the Authentication Flow Works Now

1. Users sign in using one of three methods:

   - Email magic link (provider: "email")
   - Credentials (username/password)
   - Google OAuth

2. On successful login, the session contains:

   - User ID
   - User email
   - User name (if available)
   - User role (if available)

3. Protected routes are secured using middleware that checks session status

4. Admin routes check for the "ADMIN" role before allowing access

## Troubleshooting

If you encounter any issues, try:

1. Regenerating the Prisma client with `npx prisma generate`
2. Clearing browser cookies and storage
3. Restarting the development server

## Further Improvements

Consider implementing:

1. More granular role-based permissions
2. Enhanced security with two-factor authentication
3. User profile management features

## References

- [Auth.js Documentation](https://authjs.dev/)
- [Next.js Authentication Guide](https://nextjs.org/docs/authentication)
- [Prisma with Auth.js](https://authjs.dev/reference/adapter/prisma)
