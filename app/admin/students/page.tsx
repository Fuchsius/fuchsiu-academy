"use client";

import React, { useState } from "react";
import {
  MdSearch,
  MdFilterList,
  MdDownload,
  MdAdd,
  MdEdit,
  MdDelete,
  MdUpload,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isUploadCertificateOpen, setIsUploadCertificateOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const students = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+94 765432198",
      certificates: 2,
      orders: 1,
      lastActive: "2 days ago",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+94 771234567",
      certificates: 1,
      orders: 1,
      lastActive: "1 hour ago",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.j@example.com",
      phone: "+94 712345678",
      certificates: 0,
      orders: 0,
      lastActive: "1 week ago",
    },
  ];

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleUploadCertificate = (student: any) => {
    setSelectedStudent(student);
    setIsUploadCertificateOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-myprimary">
          Students
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
          <Button
            variant="default"
            onClick={() => setIsAddStudentOpen(true)}
            className="flex items-center gap-1 bg-mysecondary hover:bg-mysecondary/90"
          >
            <MdAdd className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by name, email, or phone..."
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
                <p className="text-gray-500">Filters coming soon...</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredStudents.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Certificates
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Orders</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Last Active
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {student.phone}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {student.certificates > 0 ? (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          {student.certificates}
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-gray-50 text-gray-500 border-gray-200"
                        >
                          None
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {student.orders}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {student.lastActive}
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
                            onSelect={() => handleUploadCertificate(student)}
                          >
                            <MdUpload className="mr-2 h-4 w-4" />
                            <span>Upload Certificate</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/students/${student.id}`}>
                              <MdEdit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={() =>
                              alert("Delete functionality to be implemented")
                            }
                            className="text-red-600"
                          >
                            <MdDelete className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No students found.</p>
            </div>
          )}

          {/* Pagination */}
          {filteredStudents.length > 0 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredStudents.length / 10)}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Student Dialog */}
      <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Enter the details to add a new student.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <Input id="address" placeholder="Enter address" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddStudentOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-mysecondary hover:bg-mysecondary/90"
              onClick={() => {
                alert("Student would be added here");
                setIsAddStudentOpen(false);
              }}
            >
              Add Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Certificate Dialog */}
      <Dialog
        open={isUploadCertificateOpen}
        onOpenChange={setIsUploadCertificateOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Certificate</DialogTitle>
            <DialogDescription>
              Upload a certificate for {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Certificate Title
                </label>
                <Input id="title" placeholder="Enter certificate title" />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input
                  id="description"
                  placeholder="Enter certificate description"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="file" className="text-sm font-medium">
                  Certificate File
                </label>
                <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                  <MdUpload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    PDF or Image file (max. 5MB)
                  </p>
                  <input
                    id="file"
                    type="file"
                    className="sr-only"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUploadCertificateOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="bg-mysecondary hover:bg-mysecondary/90"
              onClick={() => {
                alert("Certificate would be uploaded here");
                setIsUploadCertificateOpen(false);
              }}
            >
              Upload Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
