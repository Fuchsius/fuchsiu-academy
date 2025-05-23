"use client";

import React, { useState } from "react";
import {
  MdSearch,
  MdFilterList,
  MdDownload,
  MdEdit,
  MdDelete,
  MdCheckCircle,
  MdCancel,
  MdClear,
  MdPending,
  MdLocalShipping, // Example for 'PROCESSING'
} from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
// import { Pagination } from "@/components/ui/pagination"; // Assuming Pagination will be used later

// Mock data for initial UI rendering
const mockOrders = [
  {
    id: "order-001",
    orderId: "ORD-20250520-001",
    studentName: "Alice Wonderland",
    studentEmail: "alice@example.com",
    program: "Advanced Web Development",
    amount: "75000",
    status: "COMPLETED",
    date: "2025-05-20",
  },
  {
    id: "order-002",
    orderId: "ORD-20250521-001",
    studentName: "Bob The Builder",
    studentEmail: "bob@example.com",
    program: "Data Science Fundamentals",
    amount: "60000",
    status: "PENDING",
    date: "2025-05-21",
  },
  {
    id: "order-003",
    orderId: "ORD-20250522-001",
    studentName: "Charlie Brown",
    studentEmail: "charlie@example.com",
    program: "Project Management Masterclass",
    amount: "90000",
    status: "PROCESSING",
    date: "2025-05-22",
  },
  {
    id: "order-004",
    orderId: "ORD-20250518-001",
    studentName: "Diana Prince",
    studentEmail: "diana@example.com",
    program: "Advanced Web Development",
    amount: "75000",
    status: "CANCELLED",
    date: "2025-05-18",
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status.toUpperCase()) {
    case "COMPLETED":
      return "default"; // Typically green or primary
    case "PENDING":
      return "secondary"; // Typically yellow or neutral
    case "PROCESSING":
      return "outline"; // Can be blue or another distinct color
    case "CANCELLED":
      return "destructive"; // Typically red
    default:
      return "outline";
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toUpperCase()) {
    case "COMPLETED":
      return <MdCheckCircle className="mr-1 h-4 w-4" />;
    case "PENDING":
      return <MdPending className="mr-1 h-4 w-4" />;
    case "PROCESSING":
      return <MdLocalShipping className="mr-1 h-4 w-4" />;
    case "CANCELLED":
      return <MdCancel className="mr-1 h-4 w-4" />;
    default:
      return null;
  }
};

const OrdersPageV2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearSearch = () => setSearchTerm("");

  const handleUpdateStatus = (order: any) => {
    setSelectedOrder(order);
    setIsUpdateStatusOpen(true);
  };

  const confirmUpdateStatus = (newStatus: string) => {
    console.log(
      `Updating order ${selectedOrder?.orderId} to status ${newStatus}`
    );
    // Add actual update logic here
    setIsUpdateStatusOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-myprimary">
          Manage Orders
        </h1>
        {/* <Button> <MdAdd className="mr-2 h-4 w-4" /> Create New Order </Button> */}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <div className="mt-4 flex flex-col md:flex-row md:items-center gap-2">
            <div className="relative flex-grow">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders (ID, student, program)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={handleClearSearch}
                >
                  <MdClear className="h-5 w-5" />
                </Button>
              )}
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <MdFilterList className="h-5 w-5" /> Filters
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MdDownload className="h-5 w-5" /> Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Program</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.orderId}
                    </TableCell>
                    <TableCell>{order.studentName}</TableCell>
                    <TableCell>{order.program}</TableCell>
                    <TableCell>{`LKR ${Number(
                      order.amount
                    ).toLocaleString()}`}</TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(order.status) as any}
                      >
                        {getStatusIcon(order.status)} {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MdEdit className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatus(order)}
                          >
                            Update Status
                          </DropdownMenuItem>
                          {/* <DropdownMenuSeparator /> */}
                          <DropdownMenuItem
                            className="text-red-600 hover:!text-red-600"
                            onClick={() =>
                              console.log("Delete order", order.id)
                            } // Placeholder for delete
                          >
                            <MdDelete className="mr-2 h-4 w-4" /> Delete Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">
                No orders found matching your criteria.
              </p>
            </div>
          )}
          {/* Pagination would go here */}
        </CardContent>
      </Card>

      {/* Update Status Dialog */}
      <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Select the new status for order {selectedOrder?.orderId}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"].map(
              (status) => (
                <Button
                  key={status}
                  variant={
                    selectedOrder?.status === status ? "default" : "outline"
                  }
                  onClick={() => confirmUpdateStatus(status)}
                >
                  {getStatusIcon(status)} {status}
                </Button>
              )
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUpdateStatusOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPageV2;
