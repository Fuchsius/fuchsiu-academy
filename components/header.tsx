"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to toggle no-scroll class on body when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NAV_ITEMS = [
    { name: "Why Us", href: "#why-us" },
    { name: "About", href: "#about-us" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact-us" },
  ];

  // Desktop Action Buttons - show different options when logged in
  const renderDesktopActions = () => {
    if (user) {
      return (
        <div className="hidden lg:flex items-center space-x-4">
          <div className="text-sm font-medium text-myprimary">
            Hello, {user.fullName}
          </div>
          <button
            onClick={logout}
            className="gradient-bg inline-flex justify-center items-center text-mywhitetext w-28 px-4 py-2.5 rounded-xl font-medium leading-tight text-sm hover:opacity-90 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="hidden lg:flex items-center space-x-4">
        <Link
          href="/auth/signup"
          className="inline-flex justify-center items-center w-28 px-4 py-2.5 rounded-xl font-medium leading-tight text-sm text-myprimary hover:text-mysecondary transition-all duration-200"
        >
          Sign Up
        </Link>
        <Link
          href="/auth/login"
          className="gradient-bg inline-flex justify-center items-center text-mywhitetext w-28 px-4 py-2.5 rounded-xl font-medium leading-tight text-sm hover:opacity-90 transition-all duration-200"
        >
          Login
        </Link>
      </div>
    );
  };

  // Mobile Action Buttons - show different options when logged in
  const renderMobileActions = () => {
    if (user) {
      return (
        <div className="flex flex-col items-center space-y-4">
          <div className="text-base font-medium text-myprimary">
            Hello, {user.fullName}
          </div>
          <button
            onClick={() => {
              logout();
              setIsMenuOpen(false);
            }}
            className="gradient-bg inline-flex justify-center items-center text-mywhitetext w-40 px-4 py-3 rounded-xl font-medium text-base"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center space-y-4">
        <Link
          href="/auth/signup"
          className="inline-flex justify-center items-center w-40 px-4 py-3 rounded-xl font-medium text-base text-myprimary hover:text-mysecondary border border-myprimary"
          onClick={() => setIsMenuOpen(false)}
        >
          Sign Up
        </Link>
        <Link
          href="/auth/login"
          className="gradient-bg inline-flex justify-center items-center text-mywhitetext w-40 px-4 py-3 rounded-xl font-medium text-base"
          onClick={() => setIsMenuOpen(false)}
        >
          Login
        </Link>
      </div>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        scrolled ? "bg-white/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="flex justify-between items-center py-6 container px-3 mx-auto">
        {/* Logo */}
        <Link href={"/"} className="z-50">
          <div className="font-bold text-xl ">Fuchsius Academy</div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-center text-myprimary hover:text-mysecondary transition duration-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        {renderDesktopActions()}

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-50 flex flex-col items-center justify-center w-8 h-8 space-y-1.5"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-myprimary transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-myprimary transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-myprimary transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 pt-16">
          {/* Mobile Navigation */}
          <nav className="flex flex-col items-center space-y-6 mb-8">
            <Link
              href={"/"}
              className="text-xl font-medium text-myprimary hover:text-mysecondary"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xl font-medium text-myprimary hover:text-mysecondary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Action Buttons */}
          {renderMobileActions()}
        </div>
      </div>
    </header>
  );
};
