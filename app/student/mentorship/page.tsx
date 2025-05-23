"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock data for mentorship program
const mentorshipProgram = {
  name: "Full Stack Development Mentorship",
  status: "ACTIVE", // "ACTIVE", "EXPIRED", "PENDING"
  startDate: "May 15, 2025",
  endDate: "November 15, 2025",
  mentor: "John Doe",
  paymentStatus: "COMPLETED", // "PENDING", "COMPLETED", "FAILED"
  lastPaymentDate: "May 15, 2025",
  amount: "$499.00",
  invoiceUrl: "/invoice-mock.pdf",
  sessions: [
    {
      id: "session-1",
      date: "May 20, 2025",
      topic: "Introduction to React",
      status: "COMPLETED",
    },
    {
      id: "session-2",
      date: "May 27, 2025",
      topic: "State Management with Redux",
      status: "SCHEDULED",
    },
    {
      id: "session-3",
      date: "June 3, 2025",
      topic: "Backend Integration with Node.js",
      status: "SCHEDULED",
    },
  ],
};

export default function MentorshipPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-myprimary">
          Mentorship Program
        </h1>
      </div>

      {/* Program Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Program Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {mentorshipProgram.name}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`font-medium ${
                      mentorshipProgram.status === "ACTIVE"
                        ? "text-green-600"
                        : mentorshipProgram.status === "EXPIRED"
                        ? "text-red-600"
                        : "text-amber-600"
                    }`}
                  >
                    {mentorshipProgram.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span>{mentorshipProgram.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">End Date:</span>
                  <span>{mentorshipProgram.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mentor:</span>
                  <span>{mentorshipProgram.mentor}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Payment Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status:</span>
                  <span
                    className={`font-medium ${
                      mentorshipProgram.paymentStatus === "COMPLETED"
                        ? "text-green-600"
                        : mentorshipProgram.paymentStatus === "FAILED"
                        ? "text-red-600"
                        : "text-amber-600"
                    }`}
                  >
                    {mentorshipProgram.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date:</span>
                  <span>{mentorshipProgram.lastPaymentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span>{mentorshipProgram.amount}</span>
                </div>
                <div className="mt-4">
                  <Button size="sm" className="w-full" variant="outline">
                    <Link href={mentorshipProgram.invoiceUrl} target="_blank">
                      Download Invoice
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Mentorship Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Topic
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mentorshipProgram.sessions.map((session) => (
                  <tr key={session.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {session.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {session.topic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          session.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : session.status === "SCHEDULED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {session.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {session.status === "SCHEDULED" && (
                        <Button size="sm" variant="outline">
                          Join Meeting
                        </Button>
                      )}
                      {session.status === "COMPLETED" && (
                        <Button size="sm" variant="outline">
                          View Notes
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Progress and Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Program Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">33%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-mysecondary h-2.5 rounded-full"
                style={{ width: "33%" }}
              ></div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-4">Mentor Feedback</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-700 italic">
                "Great progress so far! Your React fundamentals are solid. Let's
                focus on state management next week."
              </p>
              <p className="text-sm text-gray-500 mt-2">
                — John Doe, May 20, 2025
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
