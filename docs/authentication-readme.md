# Fuchsiu Academy Authentication System

This README provides documentation for the comprehensive authentication system implemented for the Fuchsiu Academy project using Auth.js (previously NextAuth.js).

## Authentication Methods

The system implements three authentication methods:

1. **Magic Link Email Authentication**

   - Allows users to sign in by receiving a magic link to their email
   - Uses Nodemailer provider for email delivery
   - Auto-verifies email addresses on successful login

2. **Credentials Authentication**

   - Implements traditional username/password authentication
   - Includes secure password hashing with bcrypt
   - Form validation using Zod schema

3. **Google OAuth Authentication**
   - Allows users to sign in with their Google accounts
   - Configurable with Google Cloud OAuth credentials
   - Supports refresh tokens for long-term access

## Key Files

- `auth.ts`: Main Auth.js configuration with provider setup and callbacks
- `prisma/schema.prisma`: Database schema with User model including password field
- `app/actions/register.ts`: Server action for user registration with secure password hashing
- `components/sign-in.tsx`: Sign-in component with tabbed interface for auth methods
- `app/auth/signup/page.tsx`: Sign-up page with form validation
- `app/auth/error/page.tsx`: Enhanced error page with detailed error messaging
- `.env.local`: Environment configuration with authentication providers' credentials

## Setting Up

1. **Database Configuration**

   - Ensure MySQL is running
   - Update the `DATABASE_URL` in `.env.local` if needed
   - Run Prisma migrations to set up the database schema:

   ```bash
   npx prisma migrate dev
   ```

2. **Email Provider Setup**

   - Configure SMTP settings in `.env.local`
   - Test the email delivery by attempting to sign in with an email

3. **Google OAuth Setup**
   - Follow the instructions in `docs/google-oauth-setup.md` to create OAuth credentials
   - Update the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`

## Usage

The authentication system provides:

- **Sign Up Flow**: Users can register with email/password or Google
- **Sign In Flow**: Users can sign in via email link, password, or Google
- **Session Management**: JWT-based sessions with customizable duration
- **Profile Access**: Authenticated users can access their profile information
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Security Features

- Password hashing with bcrypt
- CSRF protection via Auth.js
- JWT-based session handling
- Email verification for magic link authentication
- Input validation with Zod schemas

## Development Notes

- The development environment is configured for debugging with `debug: true` in development
- JWT strategy is used for better edge compatibility
- Custom callbacks are implemented to manage session data and authentication flows
- Event handlers are used to log authentication activities

## Testing

To test the authentication system:

1. Start the development server: `npm run dev`
2. Navigate to the sign-in page: `http://localhost:3000/auth/sign-in`
3. Test each authentication method:
   - Email link authentication
   - Credentials authentication
   - Google OAuth authentication

## Troubleshooting

If you encounter issues:

1. Check the console logs for error messages
2. Verify environment variables are correctly set
3. Ensure the database is properly configured
4. For Google OAuth issues, refer to `docs/google-oauth-setup.md`

## Next Steps

- Implement additional OAuth providers (GitHub, Facebook, etc.)
- Add two-factor authentication support
- Enhance user profile management
- Implement role-based access control
