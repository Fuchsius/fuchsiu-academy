"use client";

import { useAuth } from "@/lib/auth-context";
import React from "react";
import { MdNotifications } from "react-icons/md";

export default function AdminHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex flex-1 justify-start md:justify-end">
        <h1 className="text-xl font-semibold text-myprimary md:hidden">
          Admin Panel
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className="p-2 rounded-full hover:bg-gray-100 relative"
          aria-label="Notifications"
        >
          <MdNotifications className="h-6 w-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-mysecondary rounded-full flex items-center justify-center text-white">
            {user?.name?.charAt(0) || user?.email?.charAt(0) || "A"}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-myprimary">
              {user?.name || user?.email}
            </p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
