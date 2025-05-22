"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorCode = searchParams.get("code");

  let errorMessage = "An error occurred during authentication";
  let errorDescription =
    "Please try again or contact support if the problem persists.";

  // Handle specific error cases
  switch (error) {
    case "AccessDenied":
      errorMessage = "Access Denied";
      errorDescription = "You don't have permission to access this resource.";
      break;

    case "Verification":
      errorMessage = "Verification Failed";
      errorDescription = "The login link has expired or has already been used.";
      break;

    case "OAuthAccountNotLinked":
      errorMessage = "Account Not Linked";
      errorDescription =
        "This email is already associated with another account. Please sign in using your original provider.";
      break;

    case "CredentialsSignin":
      errorMessage = "Invalid Credentials";
      errorDescription = "The email or password you entered is incorrect.";
      break;

    case "Configuration":
      errorMessage = "Server Configuration Error";
      errorDescription =
        "There is a problem with the server configuration. Please contact support.";
      break;

    case "EmailSignin":
      errorMessage = "Email Sign-in Error";
      errorDescription = "Failed to send the sign-in email. Please try again.";
      break;

    default:
      if (errorCode) {
        errorMessage = `Authentication Error (${errorCode})`;
      }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">{errorMessage}</h1>
          <div className="mt-4">
            <p className="text-gray-700">{errorDescription}</p>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <Link
            href="/auth/sign-in"
            className="block w-full p-2 text-center rounded bg-purple-600 hover:bg-purple-700 text-white"
          >
            Back to Sign In
          </Link>

          <Link
            href="/"
            className="block w-full p-2 text-center rounded border border-gray-300 hover:bg-gray-50"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
