"use client";

import Link from "next/link";
import React from "react";

export default function NewUserPage() {
  return (
    <div className=" w-full h-full flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Fuchsiu Academy!</h1>
          <div className="mt-4">
            <p className="text-gray-600">
              Your account has been created successfully.
            </p>
            <p className="mt-2 text-gray-600">
              You are now signed in and can start exploring the platform.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="block w-full p-2 text-center rounded bg-purple-600 hover:bg-purple-700 text-white"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
