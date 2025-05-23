import { SignIn } from "@/components/sign-in";
import QuickAdminTest from "@/components/admin/quick-admin-test";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex w-full h-full flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-myprimary">
                Fuchsius Academy
              </h1>
            </Link>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-myprimary">
            Welcome back
          </h2>
          <p className="text-gray-600 mb-8">
            Log in to your Fuchsius Academy account
          </p>

          <SignIn />
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 bg-mybg1">
        <div className="flex h-full items-center justify-center p-10">
          <div className="max-w-md">
            <Image
              src="/assets/student-laptop.jpg"
              alt="Student using laptop"
              width={600}
              height={800}
              className="rounded-lg shadow-xl"
              priority
            />
            <div className="mt-6">
              <h3 className="text-xl font-bold text-myprimary mb-2">
                Unlock Your Full Potential
              </h3>
              <p className="text-gray-700">
                Access your courses, mentorship sessions, and certificates all
                in one place.
              </p>
            </div>{" "}
          </div>
        </div>
      </div>

      {/* Only show in development mode */}
      {process.env.NODE_ENV !== "production" && <QuickAdminTest />}
    </div>
  );
}
