"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage = "An error occurred during authentication";

  // Handle specific error cases
  if (error === "AccessDenied") {
    errorMessage = "You don't have access to this resource";
  } else if (error === "Verification") {
    errorMessage = "The login link has expired or has already been used";
  } else if (error === "Configuration") {
    errorMessage = "There is a problem with the server configuration";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Authentication Error
          </h1>
          <div className="mt-4">
            <p className="text-gray-700">{errorMessage}</p>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/auth/sign-in"
            className="block w-full p-2 text-center rounded bg-purple-600 hover:bg-purple-700 text-white"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
