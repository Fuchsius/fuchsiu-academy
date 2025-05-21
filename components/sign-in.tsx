"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn("nodemailer", { email, callbackUrl: "/", redirect: false });
      // After sending email, we can show a message that email has been sent
      alert("Check your email for the sign in link");
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        {isLoading ? "Sending link..." : "Sign In with Email"}
      </button>
    </form>
  );
}
