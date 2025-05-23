"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  MdDashboard,
  MdPeople,
  MdPayment,
  MdAssignment,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: <MdDashboard className="h-5 w-5" />,
  },
  {
    href: "/admin/students",
    label: "Students",
    icon: <MdPeople className="h-5 w-5" />,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: <MdPayment className="h-5 w-5" />,
  },
  {
    href: "/admin/certificates",
    label: "Certificates",
    icon: <MdAssignment className="h-5 w-5" />,
  },
];

export default function AdminSidebar({
  isMenuOpen,
  onMenuToggle,
}: {
  isMenuOpen: boolean;
  onMenuToggle: any;
}) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}

      {/* Sidebar for larger screens */}
      <div
        className={cn(
          "w-64 h-screen bg-mysecondary absolute md:static text-white inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-40",
          isMenuOpen ? "translate-x-0" : "-translate-x-full absolute",
          "md:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="p-6">
          <button
            type="button"
            className=" md:hidden flex items-center justify-center rounded-md bg-mysecondary p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <MdClose className="h-6 w-6" />
            ) : (
              <MdMenu className="h-6 w-6" />
            )}
          </button>
          <Link href="/admin" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Fuchsius Academy</span>
          </Link>
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
                  onClick={() => setMobileMenuOpen(false)}
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
            onClick={logout}
            className="flex w-full items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition"
          >
            <MdLogout className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
