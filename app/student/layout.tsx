"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

// We'll create these components next
import StudentSidebar from "@/components/student/sidebar";
import StudentHeader from "@/components/student/header";

export default function StudentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not logged in or not a student
    if (!isLoading && (!user || user.role !== "STUDENT")) {
      router.push("/auth/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-myprimary">Loading...</div>
      </div>
    );
  }

  // If authorized, render the layout
  if (user && user.role === "STUDENT") {
    return (
      <div className="flex h-screen bg-mytextbg">
        <StudentSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <StudentHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    );
  }

  // Return null if not authorized (will be redirected by useEffect)
  return null;
}
