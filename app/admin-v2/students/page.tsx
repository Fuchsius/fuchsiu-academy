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
  MdMailOutline,
  MdPhone,
  MdBadge, // For certificates count
  MdShoppingCart, // For orders count
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
// import { Pagination } from "@/components/ui/pagination"; // Assuming Pagination will be used later

// Mock data for initial UI rendering
const mockStudents = [
  {
    id: "student-001",
    name: "Alice Wonderland",
    email: "alice@example.com",
    phone: "+1-555-0101",
    certificates: 2,
    orders: 1,
    lastActive: "2025-05-21T10:00:00Z",
    joinedDate: "2024-11-15T09:00:00Z",
  },
  {
    id: "student-002",
    name: "Bob The Builder",
    email: "bob@example.com",
    phone: "+1-555-0102",
    certificates: 1,
    orders: 3,
    lastActive: "2025-05-23T14:30:00Z",
    joinedDate: "2025-01-10T11:00:00Z",
  },
  {
    id: "student-003",
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "+1-555-0103",
    certificates: 0,
    orders: 0,
    lastActive: "2025-05-15T08:15:00Z",
    joinedDate: "2025-03-01T16:00:00Z",
  },
];

const StudentsPageV2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isUploadCertificateOpen, setIsUploadCertificateOpen] = useState(false);
  const [isDeleteStudentOpen, setIsDeleteStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.phone &&
        student.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleClearSearch = () => setSearchTerm("");

  const handleAddStudent = () => setIsAddStudentOpen(true);
  const confirmAddStudent = () => {
    console.log("Adding new student...");
    // Add actual student creation logic
    setIsAddStudentOpen(false);
  };

  const handleUploadCertificate = (student: any) => {
    setSelectedStudent(student);
    setIsUploadCertificateOpen(true);
  };
  const confirmUploadCertificate = () => {
    console.log("Uploading certificate for", selectedStudent?.name);
    // Add actual certificate upload logic
    setIsUploadCertificateOpen(false);
    setSelectedStudent(null);
  };

  const handleDeleteStudent = (student: any) => {
    setSelectedStudent(student);
    setIsDeleteStudentOpen(true);
  };
  const confirmDeleteStudent = () => {
    console.log("Deleting student", selectedStudent?.name);
    // Add actual student deletion logic
    setIsDeleteStudentOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-myprimary">
          Manage Students
        </h1>
        <Button onClick={handleAddStudent} className="flex items-center gap-2">
          <MdAdd className="h-5 w-5" /> Add New Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <div className="mt-4 flex flex-col md:flex-row md:items-center gap-2">
            <div className="relative flex-grow">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students (name, email, phone)..."
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
          {filteredStudents.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-center">Certificates</TableHead>
                  <TableHead className="text-center">Orders</TableHead>
                  <TableHead>Joined On</TableHead>
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
                    <TableCell>{student.phone || "N/A"}</TableCell>
                    <TableCell className="text-center">
                      <Link
                        href={`/admin-v2/certificates?studentId=${student.id}`}
                        className="hover:underline flex items-center justify-center"
                      >
                        <MdBadge className="mr-1 h-4 w-4" />{" "}
                        {student.certificates}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link
                        href={`/admin-v2/orders?studentId=${student.id}`}
                        className="hover:underline flex items-center justify-center"
                      >
                        <MdShoppingCart className="mr-1 h-4 w-4" />{" "}
                        {student.orders}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {new Date(student.joinedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MdEdit className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin-v2/students/edit/${student.id}`}
                              className="flex items-center gap-2"
                            >
                              <MdEdit className="h-4 w-4" /> Edit Student
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUploadCertificate(student)}
                            className="flex items-center gap-2"
                          >
                            <MdUpload className="h-4 w-4" /> Issue Certificate
                          </DropdownMenuItem>
                          {/* <DropdownMenuSeparator /> */}
                          <DropdownMenuItem
                            onClick={() => handleDeleteStudent(student)}
                            className="flex items-center gap-2 text-red-600 hover:!text-red-600"
                          >
                            <MdDelete className="h-4 w-4" /> Delete Student
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
                No students found matching your criteria.
              </p>
            </div>
          )}
          {/* Pagination would go here */}
        </CardContent>
      </Card>

      {/* Add Student Dialog */}
      <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Fill in the details for the new student.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Form fields for adding student */}
            <p className="text-sm text-muted-foreground">
              (Form fields for Name, Email, Phone, Password, etc. will be here)
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddStudentOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmAddStudent}>Add Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Certificate Dialog */}
      <Dialog
        open={isUploadCertificateOpen}
        onOpenChange={setIsUploadCertificateOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Issue Certificate to {selectedStudent?.name}
            </DialogTitle>
            <DialogDescription>
              Select certificate details to issue.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Form fields for issuing certificate */}
            <p className="text-sm text-muted-foreground">
              (Form fields for Certificate Title, Issue Date, Template, etc.
              will be here)
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUploadCertificateOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmUploadCertificate}>
              Issue Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Student Confirmation Dialog */}
      <Dialog open={isDeleteStudentOpen} onOpenChange={setIsDeleteStudentOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the student "
              {selectedStudent?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteStudentOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteStudent}>
              Delete Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentsPageV2;
