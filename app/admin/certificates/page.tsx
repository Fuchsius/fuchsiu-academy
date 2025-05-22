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
import { Pagination } from "@/components/ui/pagination";

export default function CertificatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  // Sample certificates data
  const certificates = [
    {
      id: "1",
      title: "Mentorship Program Certificate",
      studentName: "John Doe",
      studentEmail: "john.doe@example.com",
      issuedDate: "2025-05-10",
      fileUrl: "/certificates/certificate-1.pdf",
    },
    {
      id: "2",
      title: "Mentorship Program Certificate",
      studentName: "Jane Smith",
      studentEmail: "jane.smith@example.com",
      issuedDate: "2025-05-15",
      fileUrl: "/certificates/certificate-2.pdf",
    },
    {
      id: "3",
      title: "Mentorship Program Certificate - Advanced",
      studentName: "Robert Johnson",
      studentEmail: "robert.j@example.com",
      issuedDate: "2025-05-20",
      fileUrl: "/certificates/certificate-3.pdf",
    },
  ];

  // Filter certificates based on search term
  const filteredCertificates = certificates.filter(
    (certificate) =>
      certificate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      certificate.studentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      certificate.studentEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleDeleteCertificate = (certificate: any) => {
    setSelectedCertificate(certificate);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteCertificate = () => {
    // This will be replaced with an actual API call
    console.log(`Deleting certificate ${selectedCertificate.id}`);
    setIsDeleteDialogOpen(false);
  };

  const handleDownloadCertificate = (certificate: any) => {
    // This will be replaced with an actual download function
    console.log(
      `Downloading certificate ${certificate.id} from ${certificate.fileUrl}`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-myprimary">
          Certificates
        </h1>

        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Input
              type="search"
              placeholder="Search certificates..."
              className="pl-9 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                onClick={handleClearSearch}
              >
                <MdClear className="h-4 w-4" />
              </Button>
            )}
          </div>

          <Button
            variant={isFilterOpen ? "default" : "outline"}
            size="icon"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            title="Filter certificates"
          >
            <MdFilterList className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            title="Export certificates list"
          >
            <MdDownload className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isFilterOpen && (
        <Card>
          <CardContent className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Student</label>
              <Input type="text" placeholder="Filter by student name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Issue Date
              </label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Certificate Type
              </label>
              <Input type="text" placeholder="Filter by certificate type" />
            </div>
            <div className="md:col-span-3 flex justify-end gap-2">
              <Button variant="outline">Reset</Button>
              <Button>Apply Filters</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>All Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Issued Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.length > 0 ? (
                filteredCertificates.map((certificate) => (
                  <TableRow key={certificate.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <MdVerified className="text-myprimary h-5 w-5" />
                        {certificate.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{certificate.studentName}</div>
                        <div className="text-sm text-gray-500">
                          {certificate.studentEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(certificate.issuedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadCertificate(certificate)}
                          title="Download certificate"
                        >
                          <MdFileDownload className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Open menu</span>
                              <MdEdit className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                handleDeleteCertificate(certificate)
                              }
                              className="text-red-600"
                            >
                              <MdDelete className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-gray-500"
                  >
                    No certificates found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredCertificates.length / 10)}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>

      {/* Delete Certificate Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the certificate for{" "}
              {selectedCertificate?.studentName}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteCertificate}>
              Delete Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
