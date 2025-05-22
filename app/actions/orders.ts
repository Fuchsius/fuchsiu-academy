"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { OrderStatus } from "@prisma/client";
import { redirect } from "next/navigation";

// Function to check if user is admin
async function checkAdmin() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized access");
  }

  return session;
}

// Helper function to generate order ID
function generateOrderId(): string {
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(now.getDate()).padStart(2, "0")}`;
  const randomNum = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `ORD-${dateStr}-${randomNum}`;
}

// Get paginated orders with search and filters
export async function getOrders({
  page = 1,
  limit = 10,
  search = "",
  status = undefined,
}: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) {
  try {
    await checkAdmin();

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build filter conditions
    let whereConditions: any = {};

    if (search) {
      whereConditions.OR = [
        { orderId: { contains: search } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { program: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      whereConditions.status = status;
    }

    // Fetch orders with count
    const [orders, totalCount] = await Promise.all([
      prisma.order.findMany({
        where: whereConditions,
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
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.order.count({
        where: whereConditions,
      }),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    return {
      orders,
      meta: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
      },
    };
  } catch (error) {
    console.error("Error in getOrders:", error);
    throw new Error("Failed to fetch orders");
  }
}

// Get a single order by ID
export async function getOrder(id: string) {
  try {
    await checkAdmin();

    const order = await prisma.order.findUnique({
      where: { id },
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
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  } catch (error) {
    console.error("Error in getOrder:", error);
    throw new Error("Failed to fetch order");
  }
}

// Create a new order
export async function createOrder(formData: FormData) {
  try {
    await checkAdmin();
    const userId = formData.get("userId") as string;
    const amount = formData.get("amount") as string;
    const program = formData.get("program") as string;
    const status = formData.get("status") as string;
    const paymentMethod = formData.get("paymentMethod") as string;
    const paymentDate = formData.get("paymentDate") as string;
    const notes = formData.get("notes") as string;

    // Validate required fields
    if (!userId || !amount || !program) {
      throw new Error("User ID, amount, and program are required");
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Generate a unique order ID
    const orderId = generateOrderId();

    // Create order
    await prisma.order.create({
      data: {
        orderId,
        userId,
        amount: parseFloat(amount),
        program,
        status: (status as OrderStatus) || OrderStatus.PENDING,
        paymentMethod,
        paymentDate: paymentDate ? new Date(paymentDate) : undefined,
        notes,
      },
    });

    redirect("/admin/orders");
  } catch (error) {
    console.error("Error in createOrder:", error);
    throw new Error(`Failed to create order: ${(error as Error).message}`);
  }
}

// Update an order
export async function updateOrder(id: string, formData: FormData) {
  try {
    await checkAdmin();
    const status = formData.get("status") as string;
    const paymentMethod = formData.get("paymentMethod") as string;
    const paymentDate = formData.get("paymentDate") as string;
    const notes = formData.get("notes") as string;

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    // Update order
    await prisma.order.update({
      where: { id },
      data: {
        status: status as OrderStatus,
        paymentMethod,
        paymentDate: paymentDate ? new Date(paymentDate) : undefined,
        notes,
      },
    });

    redirect("/admin/orders");
  } catch (error) {
    console.error("Error in updateOrder:", error);
    throw new Error(`Failed to update order: ${(error as Error).message}`);
  }
}

// Delete an order
export async function deleteOrder(id: string) {
  try {
    await checkAdmin();

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    // Delete order
    await prisma.order.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error in deleteOrder:", error);
    throw new Error(`Failed to delete order: ${(error as Error).message}`);
  }
}

// Get order statistics for dashboard
export async function getOrderStats() {
  try {
    await checkAdmin();

    const [
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      totalRevenue,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.order.count({ where: { status: "COMPLETED" } }),
      prisma.order.count({ where: { status: "CANCELLED" } }),
      prisma.order.aggregate({
        where: { status: "COMPLETED" },
        _sum: { amount: true },
      }),
    ]);

    return {
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      totalRevenue: totalRevenue._sum.amount || 0,
    };
  } catch (error) {
    console.error("Error in getOrderStats:", error);
    throw new Error("Failed to fetch order statistics");
  }
}
