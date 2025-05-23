// filepath: d:\\Fuchsius\\Projects\\fuchsiu-academy\\app\\admin-v2\\page.tsx
"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdPeople, MdAssignment, MdPayment } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
// import { OrderStatus } from "@prisma/client"; // Assuming OrderStatus will be used later

// Mock data for initial UI rendering
const mockStats = {
  studentCount: 120,
  pendingOrdersCount: 15,
  certificateCount: 85,
  recentStudents: [
    {
      id: "1",
      user: { name: "Alice Wonderland", email: "alice@example.com" },
      createdAt: new Date(),
      _count: { certificates: 2 },
    },
    {
      id: "2",
      user: { name: "Bob The Builder", email: "bob@example.com" },
      createdAt: new Date(),
      _count: { certificates: 1 },
    },
  ],
  recentOrders: [
    {
      id: "1",
      orderId: "ORD-20250523-001",
      user: { name: "Charlie Brown", email: "charlie@example.com" },
      amount: "50000", // Assuming amount is a string for display
      status: "PENDING", // Using string for mock status
    },
    {
      id: "2",
      orderId: "ORD-20250523-002",
      user: { name: "Diana Prince", email: "diana@example.com" },
      amount: "75000",
      status: "COMPLETED",
    },
    {
      id: "3",
      orderId: "ORD-20250523-003",
      user: { name: "Edward Scissorhands", email: "edward@example.com" },
      amount: "25000",
      status: "CANCELLED", // Added for variety
    },
  ],
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  href: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, href }) => {
  return (
    <Link href={href} passHref>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    </Link>
  );
};

const AdminDashboardV2 = () => {
  const stats = mockStats; // Using mock data

  return (
    <div className="space-y-6 p-4 md:p-6">
      <h1 className="text-3xl font-bold tracking-tight text-myprimary">
        Admin Dashboard V2
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Total Students"
          value={stats.studentCount.toString()}
          icon={<MdPeople className="h-6 w-6 text-muted-foreground" />}
          href="/admin-v2/students"
        />
        <StatCard
          title="Pending Orders"
          value={stats.pendingOrdersCount.toString()}
          icon={<MdPayment className="h-6 w-6 text-muted-foreground" />}
          href="/admin-v2/orders?status=PENDING"
        />
        <StatCard
          title="Certificates Issued"
          value={stats.certificateCount.toString()}
          icon={<MdAssignment className="h-6 w-6 text-muted-foreground" />}
          href="/admin-v2/certificates"
        />
      </div>

      <div className="mt-8">
        <Tabs defaultValue="recent-students">
          <TabsList className="mb-4">
            <TabsTrigger value="recent-students">Recent Students</TabsTrigger>
            <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="recent-students">
            <Card>
              <CardHeader>
                <CardTitle>Recently Registered Students</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.recentStudents.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registered On</TableHead>
                        <TableHead className="text-right">
                          Certificates
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stats.recentStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.user.name}</TableCell>
                          <TableCell>{student.user.email}</TableCell>
                          <TableCell>
                            {new Date(student.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {student._count.certificates}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No recent students.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recent-orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.recentOrders.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stats.recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.orderId}</TableCell>
                          <TableCell>{order.user.name}</TableCell>
                          <TableCell>
                            {`LKR ${Number(order.amount).toLocaleString()}`}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "COMPLETED"
                                  ? "default" // Greenish or primary color for success
                                  : order.status === "PENDING"
                                  ? "secondary" // Yellowish or neutral for pending
                                  : "outline" // Reddish or error color for cancelled (using outline as destructive is not available)
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p>No recent orders.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboardV2;
