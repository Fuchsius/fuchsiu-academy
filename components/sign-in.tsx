"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authMethod, setAuthMethod] = useState<"email" | "credentials">(
    "email"
  );
  const [error, setError] = useState("");
  const handleMagicLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("email", {
        email,
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        // Successfully sent email
        router.push("/auth/verify-request");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        // Handle specific error codes
        if (result.error === "CredentialsSignin") {
          setError("Invalid email or password");
        } else {
          setError(result.error);
        }
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="space-y-6">
      {/* Authentication Method Tabs */}
      <div className="flex border-b">
        <button
          className={`pb-2 px-4 ${
            authMethod === "credentials"
              ? "border-b-2 border-purple-600 text-purple-600"
              : "text-gray-500"
          }`}
          onClick={() => setAuthMethod("credentials")}
        >
          Password
        </button>
        <button
          className={`pb-2 px-4 ${
            authMethod === "email"
              ? "border-b-2 border-purple-600 text-purple-600"
              : "text-gray-500"
          }`}
          onClick={() => setAuthMethod("email")}
        >
          Email Link
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Magic Link Form */}
      {authMethod === "email" && (
        <form onSubmit={handleMagicLinkSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 border rounded"
              placeholder="Your email address"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 rounded bg-purple-600 hover:bg-purple-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Sending link..." : "Sign In with Email Link"}
          </button>
        </form>
      )}

      {/* Credentials Form */}
      {authMethod === "credentials" && (
        <form onSubmit={handleCredentialsSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="credential-email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="credential-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 border rounded"
              placeholder="Your email address"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 border rounded"
              placeholder="Your password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 rounded bg-purple-600 hover:bg-purple-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In with Password"}
          </button>
        </form>
      )}

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-purple-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Social Sign In */}
      <div className="relative flex items-center justify-center mt-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative px-4 bg-white text-sm text-gray-500">
          Or continue with
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 p-2 border border-gray-300 rounded hover:bg-gray-50"
        disabled={isLoading}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}
