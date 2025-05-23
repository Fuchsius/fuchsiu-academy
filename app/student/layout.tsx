"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

// We'll create these components next
import StudentSidebar from "@/components/student/sidebar";
import StudentHeader from "@/components/student/header";
import StudentDebugInfo from "@/components/student/debug-info";

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoading, isStudent } = useAuth();
  const router = useRouter();
  useEffect(() => {
    // Redirect if not logged in or not a student
    if (!isLoading && (!user || !isStudent())) {
      router.push("/auth/sign-in");
    }
  }, [isLoading, user, router, isStudent]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-myprimary">Loading...</div>
      </div>
    );
  } // If authorized, render the layout
  if (user && isStudent()) {
    return (
      <div className="flex h-screen bg-mytextbg">
        <StudentSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <StudentHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
        <StudentDebugInfo />
      </div>
    );
  }

  // Return null if not authorized (will be redirected by useEffect)
  return null;
}
