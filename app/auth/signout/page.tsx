"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function SignOutPage() {
  const router = useRouter();

  useEffect(() => {
    const performSignOut = async () => {
      await signOut({ callbackUrl: "/" });
    };

    performSignOut();
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Signing you out...</h1>
          <div className="mt-4">
            <p className="text-gray-600">
              Please wait while we sign you out of your account.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-500 border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
}
