import React from "react";
import Link from "next/link";

export const Header = () => {
  const NAV_ITEMS = [
    { name: "Why Us", href: "#why-us" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="flex justify-between items-center py-6 container px-3 mx-auto">
      <div className="font-bold text-xl">Fuchsius Academy</div>
      <nav className="hidden md:flex space-x-8">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm font-medium text-center text-myprimary hover:text-mysecondary"
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="flex items-center space-x-4">
        <Link
          href="/signup"
          className="inline-flex justify-center items-center w-32 px-4 py-2.5 rounded-xl font-medium leading-tight text-sm text-myprimary hover:text-mysecondary"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="gradient-bg inline-flex justify-center items-center text-mywhitetext w-32 px-4 py-2.5 rounded-xl font-medium leading-tight text-sm"
        >
          Login
        </Link>
      </div>
    </header>
  );
};
