import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

// GET /api/admin/orders - Get all orders with pagination, search, and filtering
export async function GET(req: NextRequest) {
  try {
    // Check for admin authorization
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    // Extract query params
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status");

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

    return NextResponse.json({
      orders,
      meta: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
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

// POST /api/admin/orders - Create a new order
export async function POST(req: NextRequest) {
  try {
    // Check for admin authorization
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const data = await req.json();
    const {
      userId,
      amount,
      program,
      status,
      paymentMethod,
      paymentDate,
      notes,
    } = data;

    // Validate required fields
    if (!userId || !amount || !program) {
      return NextResponse.json(
        { error: "User ID, amount, and program are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate a unique order ID
    const orderId = generateOrderId();

    // Create order
    const order = await prisma.order.create({
      data: {
        orderId,
        userId,
        amount: parseFloat(amount.toString()),
        program,
        status: status || "PENDING",
        paymentMethod,
        paymentDate: paymentDate ? new Date(paymentDate) : undefined,
        notes,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
