# Authentication System Implementation

This document outlines the implementation details for the Fuchsiu Academy authentication system.

## Authentication Flow

1. **User Sign-In**:

   - Users can sign in through:
     - Credentials provider (username/password)
     - Email (magic link)
     - Google OAuth

2. **Role-Based Redirection**:

   - After successful authentication, users are redirected to `/auth/success`
   - The success page checks the user's role and redirects to:
     - `/admin` for users with ADMIN role
     - `/student` for users with STUDENT role
     - `/` for other users or if role is missing

3. **Session Handling**:
   - JWT strategy for session management
   - Role information is stored in the JWT token
   - Session duration is set to 30 days

## Middleware Protection

- The middleware protects specific routes:
  - `/admin/*` - Accessible only to users with the ADMIN role
  - `/dashboard/*` and `/student/*` - Accessible only to authenticated users
  - Unauthorized access is redirected to the sign-in page

## Development Tools

For development and testing, the system includes:

- **Debug Info Components**: Show authentication state on admin and student pages
- **Quick Admin Test**: Tool to create test administrator accounts
- **Auth Test Scripts**: PowerShell scripts for quick testing of authentication endpoints

## Security Considerations

- Password validation and secure storage
- CSRF protection
- Secure session management with JWT
- Role-based access controls
- Email verification
- Environmental variables for sensitive configuration

## Role Management

Roles are implemented using a string field on the User model. Current roles:

- `ADMIN` - For administrative staff
- `STUDENT` - For enrolled students
- `INSTRUCTOR` - (Planned) For course instructors

The system is designed to be case-insensitive for role checking (e.g., "admin" is treated the same as "ADMIN").

## Implementation Notes

- NextAuth.js provides the core authentication functionality
- `prisma/schema.prisma` defines the User model with role field
- `auth.ts` contains the NextAuth configuration and session setup
- `lib/auth-context.tsx` provides React hooks for authentication state management
- `middleware.ts` protects routes based on user authentication and roles

## Future Improvements

- [ ] Proper signup flow with email verification
- [ ] Password reset functionality
- [ ] Multi-factor authentication
- [ ] More granular permissions system
- [ ] User profile management UI
- [ ] Role management interface for admins
