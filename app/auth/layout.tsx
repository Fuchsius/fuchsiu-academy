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
      {children}
    </main>
  );
}
