"use client";

import React, { useState } from "react";
import {
  MdSearch,
  MdFilterList,
  MdDownload,
  MdEdit,
  MdDelete,
  MdClear,
  MdFileDownload,
  MdVerified,
  MdAdd,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
// import { Pagination } from "@/components/ui/pagination"; // Assuming Pagination will be used later

// Mock data for initial UI rendering
const mockCertificates = [
  {
    id: "cert-001",
    title: "Advanced Web Development",
    studentName: "Alice Wonderland",
    studentEmail: "alice@example.com",
    issuedDate: "2025-03-15",
    fileUrl: "/mock-certificates/advanced-web.pdf",
  },
  {
    id: "cert-002",
    title: "Data Science Fundamentals",
    studentName: "Bob The Builder",
    studentEmail: "bob@example.com",
    issuedDate: "2025-04-20",
    fileUrl: "/mock-certificates/data-science.pdf",
  },
  {
    id: "cert-003",
    title: "Project Management Masterclass",
    studentName: "Charlie Brown",
    studentEmail: "charlie@example.com",
    issuedDate: "2025-05-01",
    fileUrl: "/mock-certificates/project-management.pdf",
  },
];

const CertificatesPageV2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [isIssueCertificateDialogOpen, setIsIssueCertificateDialogOpen] =
    useState(false);

  const filteredCertificates = mockCertificates.filter(
    (certificate) =>
      certificate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      certificate.studentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      certificate.studentEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearSearch = () => setSearchTerm("");

  const handleDelete = (certificate: any) => {
    setSelectedCertificate(certificate);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting certificate:", selectedCertificate);
    // Add actual delete logic here
    setIsDeleteDialogOpen(false);
    setSelectedCertificate(null);
  };

  const handleIssueCertificate = () => {
    setIsIssueCertificateDialogOpen(true);
  };

  const confirmIssueCertificate = () => {
    // Logic to issue certificate
    console.log("Issuing new certificate...");
    setIsIssueCertificateDialogOpen(false);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-myprimary">
          Manage Certificates
        </h1>
        <Button
          onClick={handleIssueCertificate}
          className="flex items-center gap-2"
        >
          <MdAdd className="h-5 w-5" /> Issue New Certificate
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Certificates</CardTitle>
          <div className="mt-4 flex flex-col md:flex-row md:items-center gap-2">
            <div className="relative flex-grow">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search certificates (title, student name, email)..."
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
          {filteredCertificates.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Student Email</TableHead>
                  <TableHead>Issued Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCertificates.map((cert) => (
                  <TableRow key={cert.id}>
                    <TableCell className="font-medium">{cert.title}</TableCell>
                    <TableCell>{cert.studentName}</TableCell>
                    <TableCell>{cert.studentEmail}</TableCell>
                    <TableCell>
                      {new Date(cert.issuedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="default"
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <MdVerified className="mr-1 h-4 w-4" /> Verified
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
                            onClick={() => window.open(cert.fileUrl, "_blank")}
                            className="flex items-center gap-2"
                          >
                            <MdFileDownload className="h-4 w-4" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(cert)}
                            className="flex items-center gap-2 text-red-600 hover:!text-red-600"
                          >
                            <MdDelete className="h-4 w-4" /> Delete
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
                No certificates found matching your criteria.
              </p>
            </div>
          )}
          {/* Pagination would go here */}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the certificate "
              {selectedCertificate?.title}" for{" "}
              {selectedCertificate?.studentName}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Issue Certificate Dialog */}
      <Dialog
        open={isIssueCertificateDialogOpen}
        onOpenChange={setIsIssueCertificateDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Issue New Certificate</DialogTitle>
            <DialogDescription>
              Fill in the details below to issue a new certificate.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Form fields for issuing certificate would go here */}
            <p className="text-sm text-muted-foreground">
              (Form fields for Student ID/Email, Certificate Title, Issue Date,
              Template, etc. will be here)
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsIssueCertificateDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={confirmIssueCertificate}>Issue Certificate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificatesPageV2;
