"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuickAdminTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const createTestAdmin = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      // Create a simple form data object for the register action
      const formData = new FormData();
      formData.append("name", "Test Admin");
      formData.append("email", "admin@fuchsiu-academy.com");
      formData.append("password", "Admin@123");

      // Submit the form data to the register endpoint
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setMessage(
          "Admin user created successfully! You can now sign in with: admin@fuchsiu-academy.com / Admin@123"
        );
      } else {
        setMessage(`Failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="w-72 shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Developer Tools</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <div
              className={`text-xs p-2 mb-3 rounded ${
                message.startsWith("Admin")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
          <Button
            size="sm"
            onClick={createTestAdmin}
            disabled={isLoading}
            className="w-full text-xs"
          >
            {isLoading ? "Creating..." : "Create Test Admin User"}
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            This will create a test admin account if it doesn't exist
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
