"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Mock data for certificates - in a real app, you'd fetch this from your API
const certificates = [
  {
    id: "cert-1",
    title: "Advanced React Development",
    description: "Completed the Advanced React Development course",
    issuedDate: "May 15, 2025",
    fileUrl: "/certificate-mock.pdf",
  },
  {
    id: "cert-2",
    title: "Web Development Fundamentals",
    description: "Mastered HTML, CSS, and JavaScript fundamentals",
    issuedDate: "April 10, 2025",
    fileUrl: "/certificate-mock.pdf",
  },
];

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-myprimary">Your Certificates</h1>
      </div>

      {certificates.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-myprimary mb-2">
                No Certificates Yet
              </h3>
              <p className="text-gray-500">
                Complete courses to earn your certificates
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {certificates.map((certificate) => (
            <Card key={certificate.id} className="overflow-hidden">
              <div className="bg-gradient-to-r from-mypurple to-mysecondary h-3" />
              <CardHeader className="pb-2">
                <CardTitle>{certificate.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{certificate.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Issued: {certificate.issuedDate}</span>

                  <Button
                    onClick={() => window.open(certificate.fileUrl, "_blank")}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
