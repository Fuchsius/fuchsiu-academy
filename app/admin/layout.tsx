"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/sidebar";
import AdminHeader from "@/components/admin/header";
import AdminDebugInfo from "@/components/admin/debug-info";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();
  useEffect(() => {
    // Only redirect if we've finished loading and the user is either not logged in or not an admin
    if (!isLoading && (!user || !isAdmin())) {
      console.log("Redirecting non-admin user", { user, isAdmin: isAdmin() });
      router.push("/auth/sign-in");
    }
  }, [isLoading, user, router, isAdmin]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-myprimary">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin()) {
    return null; // Will be redirected by the useEffect
  }
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>

      {/* Debug information (remove in production) */}
      <AdminDebugInfo />
    </div>
  );
}
