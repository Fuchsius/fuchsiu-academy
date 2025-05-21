"use client";

import React, { createContext, useContext } from "react";
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react";

type User = {
  id: string;
  fullName?: string;
  email: string;
  role?: "student" | "instructor" | "admin";
  name?: string;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a compatibility layer that wraps NextAuth's session functionality
// to provide the same interface as the old auth context
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";

  // Convert session.user to the format expected by existing components
  const user = session?.user
    ? {
        id: session.user.id || "",
        email: session.user.email || "",
        fullName: session.user.name || session.user.email?.split("@")[0] || "",
        name: session.user.name || session.user.email?.split("@")[0] || "",
        role: "student" as const,
      }
    : null;

  // Compatibility methods
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await signIn("nodemailer", {
        email,
        redirect: false,
      });
      return !result?.error;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const signup = async (userData: {
    fullName: string;
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      // For email signup, we just call the email provider
      // The user account will be created when they click the link
      const result = await signIn("nodemailer", {
        email: userData.email,
        redirect: false,
      });
      return !result?.error;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  };

  const logout = () => {
    signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
