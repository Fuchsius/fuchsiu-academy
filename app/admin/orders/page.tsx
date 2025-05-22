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
} from "react-icons/md";
import Link from "next/link";
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
import { Pagination } from "@/components/ui/pagination";

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Sample orders data
  const orders = [
    {
      id: "1",
      orderId: "ORD-20250522-001",
      studentName: "John Doe",
      studentEmail: "john.doe@example.com",
      program: "Mentorship Program",
      amount: "30000",
      status: "PENDING",
      date: "2025-05-15",
    },
    {
      id: "2",
      orderId: "ORD-20250522-002",
      studentName: "Jane Smith",
      studentEmail: "jane.smith@example.com",
      program: "Mentorship Program",
      amount: "30000",
      status: "COMPLETED",
      date: "2025-05-10",
    },
    {
      id: "3",
      orderId: "ORD-20250522-003",
      studentName: "Robert Johnson",
      studentEmail: "robert.j@example.com",
      program: "Mentorship Program",
      amount: "30000",
      status: "CANCELLED",
      date: "2025-05-01",
    },
    {
      id: "4",
      orderId: "ORD-20250522-004",
      studentName: "Emily Davis",
      studentEmail: "emily@example.com",
      program: "Mentorship Program",
      amount: "30000",
      status: "PROCESSING",
      date: "2025-05-20",
    },
  ];

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.studentEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleUpdateStatus = (order: any) => {
    setSelectedOrder(order);
    setIsUpdateStatusOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        );
      case "PROCESSING":
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            Processing
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200">
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-myprimary">
          Orders
        </h1>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-1"
          >
            <MdFilterList className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <MdDownload className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by order ID, student name, or email..."
            className="pl-10 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <MdClear />
            </button>
          )}
        </div>

        {/* Filter panel - only visible when filter is open */}
        {isFilterOpen && (
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Filter elements would go here */}
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Status
                  </label>
                  <select className="w-full rounded-md border border-input bg-background p-2">
                    <option value="">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Date Range
                  </label>
                  <div className="flex items-center gap-2">
                    <Input type="date" className="w-full" placeholder="From" />
                    <span>to</span>
                    <Input type="date" className="w-full" placeholder="To" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Program
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.orderId}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.studentName}</div>
                        <div className="text-xs text-gray-500">
                          {order.studentEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.program}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      LKR {parseInt(order.amount).toLocaleString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            Actions
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onSelect={() => handleUpdateStatus(order)}
                          >
                            <MdCheckCircle className="mr-2 h-4 w-4 text-green-600" />
                            <span>Update Status</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/orders/${order.id}`}>
                              <MdEdit className="mr-2 h-4 w-4" />
                              <span>View Details</span>
                            </Link>
                          </DropdownMenuItem>
                          {order.status !== "COMPLETED" && (
                            <DropdownMenuItem
                              onSelect={() =>
                                alert("Cancel functionality to be implemented")
                              }
                              className="text-red-600"
                            >
                              <MdCancel className="mr-2 h-4 w-4" />
                              <span>Cancel Order</span>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No orders found.</p>
            </div>
          )}

          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredOrders.length / 10)}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Update Status Dialog */}
      <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status for order {selectedOrder?.orderId}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                className="w-full rounded-md border border-input bg-background p-2"
                defaultValue={selectedOrder?.status}
              >
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
              </label>
              <textarea
                id="notes"
                className="w-full rounded-md border border-input bg-background p-2 min-h-[100px]"
                placeholder="Add notes about this status change..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUpdateStatusOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-mysecondary hover:bg-mysecondary/90"
              onClick={() => {
                alert("Order status would be updated here");
                setIsUpdateStatusOpen(false);
              }}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
