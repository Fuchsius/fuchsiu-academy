"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";

export default function AdminDebugInfo() {
  const { user, isAdmin } = useAuth();

  return (
    // Format and display user information  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white border rounded shadow-lg max-w-md z-50 text-xs">
      <h3 className="font-bold mb-2">Debug Info (Admin Authentication)</h3>
      <div className="space-y-1">
        <p>
          <strong>User ID:</strong> {user?.id || "Not logged in"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || "N/A"}
        </p>
        <p>
          <strong>Name:</strong> {user?.name || "N/A"}
        </p>
        <p>
          <strong>Role:</strong> {user?.role || "N/A"}
          <span className="ml-1 text-gray-500">
            (raw value: "{String(user?.role)}")
          </span>
        </p>
        <p>
          <strong>Role Check:</strong>{" "}
          {user?.role?.toUpperCase() === "ADMIN" ? "MATCH" : "NO MATCH"}
        </p>
        <p>
          <strong>Is Admin:</strong> {isAdmin() ? "Yes" : "No"}
        </p>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
