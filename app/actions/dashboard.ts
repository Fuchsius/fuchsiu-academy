"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { OrderStatus } from "@prisma/client";

// Function to check if user is admin
async function checkAdmin() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized access");
  }

  return session;
}

// Get dashboard statistics
export async function getDashboardStats() {
  try {
    await checkAdmin();
    const [
      studentCount,
      pendingOrdersCount,
      certificateCount,
      recentStudents,
      recentOrders,
    ] = await Promise.all([
      prisma.student.count(),
      prisma.order.count({ where: { status: OrderStatus.PENDING } }),
      prisma.certificate.count(),
      // Recent students
      prisma.student.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          certificates: {
            select: { id: true },
          },
          _count: {
            select: { certificates: true },
          },
        },
      }),
      // Recent orders
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      }),
    ]);

    return {
      studentCount,
      pendingOrdersCount,
      certificateCount,
      recentStudents,
      recentOrders,
    };
  } catch (error) {
    console.error("Error in getDashboardStats:", error);
    throw new Error("Failed to fetch dashboard statistics");
  }
}
