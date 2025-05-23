"use client";

import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";

export default function AuthSuccessPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  useEffect(() => {
    // Redirect to home if not authenticated
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }

    // Determine redirect path based on user role
    const getRedirectPath = () => {
      if (user.role?.toUpperCase() === "ADMIN") {
        return "/admin";
      } else if (user.role?.toUpperCase() === "STUDENT") {
        return "/student";
      } else {
        return "/";
      }
    };

    const redirectPath = getRedirectPath();

    // Countdown timer for redirection
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push(redirectPath);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-mysecondary">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-myprimary mb-2">
          {user.fullName}, your account is ready!
        </h2>
        <p className="text-gray-600 mb-6">
          You have successfully{" "}
          {user.id === "123" ? "created an account" : "logged in"} with Fuchsius
          Academy.
        </p>{" "}
        <p className="text-mysecondary font-medium">
          Redirecting to{" "}
          {user.role?.toUpperCase() === "ADMIN"
            ? "admin panel"
            : user.role?.toUpperCase() === "STUDENT"
            ? "student dashboard"
            : "home page"}{" "}
          in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}
