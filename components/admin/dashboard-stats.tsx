"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MdPeople, MdAssignment, MdPayment } from "react-icons/md";
import Link from "next/link";

interface DashboardStatsProps {
  studentCount: number;
  pendingOrdersCount: number;
  certificateCount: number;
}

export default function DashboardStats({
  studentCount = 0,
  pendingOrdersCount = 0,
  certificateCount = 0,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatCard
        title="Total Students"
        value={studentCount.toString()}
        icon={<MdPeople className="h-6 w-6" />}
        href="/admin/students"
      />
      <StatCard
        title="Pending Orders"
        value={pendingOrdersCount.toString()}
        icon={<MdPayment className="h-6 w-6" />}
        href="/admin/orders?status=PENDING"
      />
      <StatCard
        title="Certificates Issued"
        value={certificateCount.toString()}
        icon={<MdAssignment className="h-6 w-6" />}
        href="/admin/certificates"
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  href: string;
}

function StatCard({ title, value, icon, href }: StatCardProps) {
  return (
    <Link href={href}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
              <p className="text-3xl font-bold text-myprimary">{value}</p>
            </div>
            <div className="p-2 rounded-full bg-mysecondary/10 text-mysecondary">
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
