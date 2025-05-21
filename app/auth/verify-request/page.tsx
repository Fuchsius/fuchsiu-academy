"use client";

import Link from "next/link";
import React from "react";

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Check your email</h1>
          <div className="mt-4">
            <p className="text-gray-600">
              A sign in link has been sent to your email address.
            </p>
            <p className="mt-2 text-gray-600">
              Please check your email (including spam folder) for a link to sign
              in.
            </p>
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
