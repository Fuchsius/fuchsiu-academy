import { SignIn } from "@/components/sign-in";
import React from "react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign In to Fuchsiu Academy</h1>
          <p className="mt-2 text-gray-600">Enter your email to receive a sign-in link</p>
        </div>
        
        <SignIn />
        
        <div className="mt-4 text-center text-sm">
          <p>Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
