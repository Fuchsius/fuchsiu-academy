"use client";

import { Header } from "@/components/header";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] w-full">
        {children}
      </div>
      {/* {children} */}
    </main>
  );
}
