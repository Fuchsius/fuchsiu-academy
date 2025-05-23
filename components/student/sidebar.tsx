"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Home,
  User,
  Award,
  BookOpen,
  CreditCard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

export default function StudentSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/student",
      icon: Home,
    },
    {
      name: "Certificates",
      href: "/student/certificates",
      icon: Award,
    },
    {
      name: "Mentorship",
      href: "/student/mentorship",
      icon: BookOpen,
    },
    {
      name: "Profile",
      href: "/student/profile",
      icon: User,
    },
    {
      name: "Payments",
      href: "/student/payments",
      icon: CreditCard,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-myprimary text-white transform 
                  ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                  md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col h-full`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-700 flex justify-center items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/fuchsius-logo.png"
              alt="Fuchsius Academy"
              width={180}
              height={50}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-md transition-colors
                            ${
                              isActive(item.href)
                                ? "bg-mysecondary text-white"
                                : "text-gray-300 hover:bg-gray-800"
                            }`}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-md text-gray-300 hover:bg-gray-800 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
