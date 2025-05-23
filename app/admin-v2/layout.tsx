// filepath: d:\\Fuchsius\\Projects\\fuchsiu-academy\\app\\admin-v2\\layout.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/sidebar"; // Reusing existing sidebar
import AdminHeader from "@/components/admin/header"; // Reusing existing header
// import AdminDebugInfo from "@/components/admin/debug-info"; // Can be added if needed

export default function AdminLayoutV2({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle mobile menu toggle
  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin())) {
      console.log("AdminV2: Redirecting non-admin user", {
        user,
        isAdmin: isAdmin ? isAdmin() : false,
      });
      router.push("/auth/sign-in");
    }
  }, [isLoading, user, router, isAdmin]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-background">
        <div className="text-myprimary text-lg font-semibold">
          Loading Admin Panel...
        </div>
        {/* Consider adding a spinner component here */}
      </div>
    );
  }

  if (!user || !isAdmin()) {
    // This state should ideally be brief as useEffect will redirect.
    // You can show a minimal loading/redirecting message or return null.
    return (
      <div className="flex items-center justify-center h-screen w-full bg-background">
        <div className="text-destructive text-lg font-semibold">
          Access Denied. Redirecting...
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-scren bg-gray-100 relative">
      {/* Sidebar */}
      <AdminSidebar
        isMenuOpen={isMenuOpen}
        onMenuToggle={handleMenuToggle}
        basePath="/admin-v2" // Added basePath prop
      />{" "}
      {/* Ensure this sidebar has links for /admin-v2 if needed, or create a new one */}
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader isMenuOpen={isMenuOpen} onMenuToggle={handleMenuToggle} />{" "}
        {/* Ensure this header is suitable or create a new one */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
      {/* Optional Debug information (remove or conditionally render in production) */}
      {/* <AdminDebugInfo /> */}
    </div>
  );
}
