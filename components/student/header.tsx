"use client";

import React from "react";
import { useAuth } from "@/lib/auth-context";
import { Bell, Settings } from "lucide-react";
import Link from "next/link";

export default function StudentHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-myprimary">Student Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-mysecondary rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="flex items-center">
          <Link href="/student/profile" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-mypurple to-mysecondary flex items-center justify-center text-white">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-myprimary">
                {user?.name || "Student"}
              </p>
              <p className="text-xs text-gray-500">Student Account</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
