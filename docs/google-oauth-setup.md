# Google OAuth Setup Guide for Fuchsiu Academy

This guide will walk you through the process of setting up Google OAuth credentials for the Fuchsiu Academy project.

## Prerequisites

- A Google account
- Access to the Google Cloud Console

## Steps to Create Google OAuth Credentials

1. **Go to the Google Cloud Console**

   - Visit [https://console.cloud.google.com/](https://console.cloud.google.com/)
   - Sign in with your Google account

2. **Create a New Project**

   - Click on the project dropdown at the top of the page
   - Click on "New Project"
   - Enter "Fuchsiu Academy" as the project name
   - Click "Create"

3. **Enable the Google OAuth API**

   - In the left sidebar, navigate to "APIs & Services" > "Library"
   - Search for "Google OAuth API" or "Google+ API"
   - Click on the API and then click "Enable"

4. **Configure the OAuth Consent Screen**

   - In the left sidebar, navigate to "APIs & Services" > "OAuth consent screen"
   - Select "External" user type if you're not using Google Workspace
   - Click "Create"
   - Fill in the required fields:
     - App name: "Fuchsiu Academy"
     - User support email: Your email address
     - Developer contact information: Your email address
   - Click "Save and Continue"
   - Add scopes: Add the following scopes:
     - `userinfo.email`
     - `userinfo.profile`
     - `openid`
   - Click "Save and Continue"
   - Add test users (optional): You can add your own email address for testing
   - Click "Save and Continue"
   - Review your settings and click "Back to Dashboard"

5. **Create OAuth 2.0 Client ID**

   - In the left sidebar, navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" and select "OAuth client ID"
   - Application type: Select "Web application"
   - Name: "Fuchsiu Academy Web Client"
   - Authorized JavaScript origins: Add `http://localhost:3000`
   - Authorized redirect URIs: Add `http://localhost:3000/api/auth/callback/google`
   - Click "Create"
   - You will see a modal with your client ID and client secret. Copy these values.

6. **Add Credentials to Your .env.local File**

   - Open the `.env.local` file in your project
   - Update the following variables:

   ```
   GOOGLE_CLIENT_ID="your-client-id-from-step-5"
   GOOGLE_CLIENT_SECRET="your-client-secret-from-step-5"
   ```

7. **Test Your Google OAuth Integration**
   - Start your development server:
   ```
   npm run dev
   ```
   - Navigate to your sign-in page
   - Click the "Sign in with Google" button
   - You should be redirected to Google's authentication page
   - After authenticating, you should be redirected back to your application

## Production Deployment Considerations

When you deploy your application to production:

1. Add your production domain to the authorized origins and redirect URIs in the Google Cloud Console
2. Update your environment variables for production with the same client ID and secret
3. Consider using a different project in Google Cloud for production

## Troubleshooting

If you encounter issues with Google OAuth:

1. Check that your client ID and client secret are correctly configured in your environment variables
2. Verify that your authorized redirect URIs match exactly what's in the callback URL
3. Check the OAuth consent screen configuration to ensure it's properly set up
4. Look for error messages in the console or network tab of your browser's developer tools

## Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Auth.js Google Provider Documentation](https://authjs.dev/reference/oauth-providers/google)
