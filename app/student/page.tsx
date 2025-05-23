"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-myprimary">
          Welcome, {user?.name || "Student"}
        </h1>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-myprimary">0</p>
            <p className="text-sm text-gray-500 mt-2">
              Your earned certificates
            </p>
            <Link href="/student/certificates">
              <Button className="mt-4">View Certificates</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Mentorship</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-myprimary">
              <span className="text-mysecondary">Active</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Your mentorship program status
            </p>
            <Link href="/student/mentorship">
              <Button className="mt-4">View Details</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-myprimary">
              <span className="text-myprimary">Settings</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Update your profile information
            </p>
            <Link href="/student/profile">
              <Button className="mt-4">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="font-medium">Mentorship Payment Received</p>
              <p className="text-sm text-gray-500">May 21, 2025</p>
            </div>
            <div className="border-b pb-4">
              <p className="font-medium">Profile Updated</p>
              <p className="text-sm text-gray-500">May 18, 2025</p>
            </div>
            <div className="border-b pb-4">
              <p className="font-medium">Joined Fuchsius Academy</p>
              <p className="text-sm text-gray-500">May 15, 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
