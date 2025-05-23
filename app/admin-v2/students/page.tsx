"use client";

import React, { useState, useMemo, ChangeEvent } from "react";
import {
  MdSearch,
  MdFilterList,
  MdDownload,
  MdAdd,
  MdEdit,
  MdDelete,
  MdUpload,
  MdClear,
  MdBadge as MdCertificateBadge,
  MdShoppingCart,
  MdCheckCircle,
  MdCancel,
  MdMoreVert,
} from "react-icons/md";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { Label } from "@/components/ui/label";
// import { Label } from "@/components/ui/label";

// Define student type
interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  certificates: number;
  orders: number;
  lastActive: string;
  joinedDate: string;
  isConfirmed: boolean;
}

// Mock data for initial UI rendering
const mockStudentsData: Student[] = [
  {
    id: "student-001",
    name: "Alice Wonderland",
    email: "alice@example.com",
    phone: "+1-555-0101",
    certificates: 2,
    orders: 1,
    lastActive: "2025-05-21T10:00:00Z",
    joinedDate: "2024-11-15T09:00:00Z",
    isConfirmed: true,
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
    isConfirmed: false,
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
    isConfirmed: true,
  },
  {
    id: "student-004",
    name: "Diana Prince",
    email: "diana@example.com",
    phone: "+1-555-0104",
    certificates: 3,
    orders: 2,
    lastActive: "2025-05-20T12:00:00Z",
    joinedDate: "2024-10-01T09:00:00Z",
    isConfirmed: false,
  },
];

const StudentsPageV2 = () => {
  const [students, setStudents] = useState<Student[]>(mockStudentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "confirmed" | "unconfirmed"
  >("all");
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isIssueCertificateOpen, setIsIssueCertificateOpen] = useState(false);
  const [isDeleteStudentOpen, setIsDeleteStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [newStudentData, setNewStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [certificateData, setCertificateData] = useState({
    title: "",
    file: null as File | null,
  });

  const filteredStudents = useMemo(() => {
    return students
      .filter((student) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          student.name.toLowerCase().includes(searchLower) ||
          student.email.toLowerCase().includes(searchLower) ||
          (student.phone && student.phone.toLowerCase().includes(searchLower))
        );
      })
      .filter((student) => {
        if (filterStatus === "all") return true;
        return filterStatus === "confirmed"
          ? student.isConfirmed
          : !student.isConfirmed;
      });
  }, [students, searchTerm, filterStatus]);

  const handleClearSearch = () => setSearchTerm("");

  const handleAddStudentInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenAddStudentDialog = () => {
    setNewStudentData({ name: "", email: "", phone: "", password: "" });
    setIsAddStudentOpen(true);
  };

  const confirmAddStudent = async () => {
    console.log("Adding new student:", newStudentData);
    // TODO: Implement actual API call to add student
    const newId = `student-${String(Date.now()).slice(-3)}`;
    const newStudentEntry: Student = {
      ...newStudentData,
      id: newId,
      certificates: 0,
      orders: 0,
      lastActive: new Date().toISOString(),
      joinedDate: new Date().toISOString(),
      isConfirmed: false,
    };
    setStudents((prev) => [...prev, newStudentEntry]);
    setIsAddStudentOpen(false);
  };

  const handleCertificateInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "file" && files && files.length > 0) {
      setCertificateData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setCertificateData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleOpenIssueCertificateDialog = (student: Student) => {
    if (!student.isConfirmed) {
      alert("Please confirm the student before issuing a certificate.");
      return;
    }
    setSelectedStudent(student);
    setCertificateData({ title: "", file: null });
    setIsIssueCertificateOpen(true);
  };

  const confirmIssueCertificate = async () => {
    if (!selectedStudent || !certificateData.file || !certificateData.title) {
      alert("Please fill in all certificate details and select a file.");
      return;
    }
    console.log(
      "Issuing certificate:",
      certificateData.title,
      "for",
      selectedStudent.name,
      "with file:",
      certificateData.file.name
    );
    // TODO: Implement actual API call to issue certificate
    setStudents((prevStudents) =>
      prevStudents.map((s) =>
        s.id === selectedStudent.id
          ? { ...s, certificates: s.certificates + 1 }
          : s
      )
    );
    setIsIssueCertificateOpen(false);
    setSelectedStudent(null);
  };

  const handleDeleteStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteStudentOpen(true);
  };

  const confirmDeleteStudent = async () => {
    if (!selectedStudent) return;
    console.log("Deleting student", selectedStudent.name);
    // TODO: Implement actual API call to delete student
    setStudents((prev) => prev.filter((s) => s.id !== selectedStudent.id));
    setIsDeleteStudentOpen(false);
    setSelectedStudent(null);
  };

  const handleToggleConfirmation = async (student: Student) => {
    console.log(
      `${student.isConfirmed ? "Unconfirming" : "Confirming"} student: ${
        student.name
      }`
    );
    // TODO: Implement actual API call to update student confirmation status
    setStudents((prevStudents) =>
      prevStudents.map((s) =>
        s.id === student.id ? { ...s, isConfirmed: !s.isConfirmed } : s
      )
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-myprimary">
          Manage Students
        </h1>
        <Button
          onClick={handleOpenAddStudentDialog}
          className="flex items-center gap-2"
        >
          <MdAdd className="h-5 w-5" /> Add New Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>
            View, manage, and confirm student accounts.
          </CardDescription>
          <div className="mt-4 flex flex-col md:flex-row md:items-center gap-2">
            <div className="relative flex-grow">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students (name, email, phone)..."
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="pl-10 w-full md:w-auto md:min-w-[300px]"
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <MdFilterList className="h-5 w-5" />
                  Filter:{" "}
                  {filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("confirmed")}>
                  Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilterStatus("unconfirmed")}
                >
                  Unconfirmed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  <TableHead className="text-center">Status</TableHead>
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
                      <Badge
                        variant={
                          student.isConfirmed ? "default" : "destructive"
                        }
                        className="cursor-pointer"
                        onClick={() => handleToggleConfirmation(student)}
                      >
                        {student.isConfirmed ? (
                          <MdCheckCircle className="mr-1 h-4 w-4" />
                        ) : (
                          <MdCancel className="mr-1 h-4 w-4" />
                        )}
                        {student.isConfirmed ? "Confirmed" : "Unconfirmed"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link
                        href={`/admin-v2/certificates?studentId=${student.id}`}
                        className="hover:underline flex items-center justify-center"
                      >
                        <MdCertificateBadge className="mr-1 h-4 w-4" />
                        {student.certificates}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link
                        href={`/admin-v2/orders?studentId=${student.id}`}
                        className="hover:underline flex items-center justify-center"
                      >
                        <MdShoppingCart className="mr-1 h-4 w-4" />
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
                            <MdMoreVert className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/admin-v2/students/edit/${student.id}`}
                              className="flex items-center gap-2"
                            >
                              <MdEdit className="h-4 w-4" /> Edit Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleConfirmation(student)}
                            className="flex items-center gap-2"
                          >
                            {student.isConfirmed ? (
                              <MdCancel className="h-4 w-4" />
                            ) : (
                              <MdCheckCircle className="h-4 w-4" />
                            )}
                            {student.isConfirmed
                              ? "Mark as Unconfirmed"
                              : "Mark as Confirmed"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleOpenIssueCertificateDialog(student)
                            }
                            disabled={!student.isConfirmed}
                            className="flex items-center gap-2"
                          >
                            <MdUpload className="h-4 w-4" /> Issue Certificate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
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
          {/* TODO: Pagination would go here */}
        </CardContent>
      </Card>

      {/* Add Student Dialog */}
      <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Fill in the details for the new student. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={newStudentData.name}
                onChange={handleAddStudentInputChange}
                className="col-span-3"
                placeholder="Student's full name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newStudentData.email}
                onChange={handleAddStudentInputChange}
                className="col-span-3"
                placeholder="student@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                value={newStudentData.phone}
                onChange={handleAddStudentInputChange}
                className="col-span-3"
                placeholder="(Optional)"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={newStudentData.password}
                onChange={handleAddStudentInputChange}
                className="col-span-3"
                placeholder="Create a strong password"
              />
            </div>
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

      {/* Issue Certificate Dialog */}
      <Dialog
        open={isIssueCertificateOpen}
        onOpenChange={setIsIssueCertificateOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Issue Certificate to {selectedStudent?.name}
            </DialogTitle>
            <DialogDescription>
              Fill in the certificate details and upload the file.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="certificateTitle" className="text-right">
                Title
              </Label>
              <Input
                id="certificateTitle"
                name="title"
                value={certificateData.title}
                onChange={handleCertificateInputChange}
                className="col-span-3"
                placeholder="e.g., Certificate of Completion"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="certificateFile" className="text-right">
                File
              </Label>
              <Input
                id="certificateFile"
                name="file"
                type="file"
                onChange={handleCertificateInputChange}
                className="col-span-3"
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
            {certificateData.file && (
              <div className="col-span-4 text-sm text-muted-foreground">
                Selected file: {certificateData.file.name}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsIssueCertificateOpen(false);
                setSelectedStudent(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={confirmIssueCertificate}>Issue Certificate</Button>
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
              onClick={() => {
                setIsDeleteStudentOpen(false);
                setSelectedStudent(null);
              }}
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
