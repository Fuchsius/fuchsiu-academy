"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  MdDashboard,
  MdPeople,
  MdPayment,
  MdAssignment,
  MdLogout,
  MdMenu, // MdMenu is kept for potential future use but not for the internal close button
  MdClose,
} from "react-icons/md";
import { useAuth } from "@/lib/auth-context";

// navItems will be defined inside the component to use basePath

export default function AdminSidebar({
  isMenuOpen,
  onMenuToggle,
  basePath, // Added basePath prop
}: {
  isMenuOpen: boolean;
  onMenuToggle: () => void; // Explicitly define type
  basePath: string; // Added basePath prop
}) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const navItems = [
    {
      href: `${basePath}`,
      label: "Dashboard",
      icon: <MdDashboard className="h-5 w-5" />,
    },
    {
      href: `${basePath}/users`,
      label: "Users",
      icon: <MdPeople className="h-5 w-5" />,
    },
    {
      href: `${basePath}/students`,
      label: "Students",
      icon: <MdPeople className="h-5 w-5" />,
    },
    {
      href: `${basePath}/orders`,
      label: "Orders",
      icon: <MdPayment className="h-5 w-5" />,
    },
    {
      href: `${basePath}/certificates`,
      label: "Certificates",
      icon: <MdAssignment className="h-5 w-5" />,
    },
  ];

  return (
    <>
      {/* Sidebar for larger screens and mobile */}
      <div
        className={cn(
          "w-64 h-screen bg-mysecondary absolute md:static text-white inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-40",
          isMenuOpen ? "translate-x-0" : "-translate-x-full", // Simplified: -translate-x-full already implies absolute for mobile effect
          "md:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between">
          <Link href={basePath} className="flex items-center space-x-2">
            <span className="text-xl font-bold">Fuchsius Academy</span>
          </Link>
          {/* Mobile close button inside sidebar */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center rounded-md bg-mysecondary p-2 text-white"
            onClick={onMenuToggle} // Use onMenuToggle prop
          >
            <MdClose className="h-6 w-6" /> {/* Always show close icon */}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition",
                    pathname === item.href
                      ? "bg-white/20 font-medium"
                      : "hover:bg-white/10"
                  )}
                  onClick={() => {
                    if (isMenuOpen) {
                      onMenuToggle();
                    }
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 px-4 w-full">
          <button
            onClick={() => {
              logout();
              if (isMenuOpen) {
                onMenuToggle();
              }
            }}
            className="flex w-full items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            <MdLogout className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onMenuToggle} // Use onMenuToggle prop
        />
      )}
    </>
  );
}
