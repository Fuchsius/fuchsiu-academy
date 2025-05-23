import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client"; // Import UserRole from generated client
import { prisma } from "@/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const searchTerm = searchParams.get("search") || "";
  const role = (searchParams.get("role") as UserRole | "all") || "all";
  const status =
    (searchParams.get("status") as "all" | "active" | "blocked") || "all";

  const skip = (page - 1) * limit;

  const whereClause: any = {
    OR: searchTerm
      ? [
          { name: { contains: searchTerm } },
          { email: { contains: searchTerm } },
        ]
      : undefined,
  };

  if (role !== "all") {
    whereClause.role = role;
  }

  if (status !== "all") {
    whereClause.isBlocked = status === "blocked";
  }

  try {
    const users = await prisma.user.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        studentProfile: {
          select: { id: true }, // Only select id from studentProfile
        },
      },
    });

    const totalUsers = await prisma.user.count({
      where: whereClause,
    });

    return NextResponse.json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
      totalUsers,
    });
  } catch (error) {
    console.error("[API_ADMIN_USERS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new NextResponse("User ID is required", { status: 400 });
  }

  try {
    const body = await request.json();
    const { isBlocked, role } = body;

    if (typeof isBlocked !== "boolean" && !role) {
      return new NextResponse(
        "Invalid request body: isBlocked (boolean) or role (UserRole) is required",
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (typeof isBlocked === "boolean") {
      updateData.isBlocked = isBlocked;
    }
    if (role && Object.values(UserRole).includes(role)) {
      updateData.role = role;
      // If changing role to STUDENT, ensure a student profile exists or create one.
      // This logic might be more complex depending on your application rules.
      // For simplicity, we'll assume studentProfile creation is handled elsewhere or not strictly required here.
      // If it were required:
      // if (role === UserRole.STUDENT) {
      //   await prisma.student.upsert({
      //     where: { userId: userId },
      //     update: {}, // No update needed if it exists
      //     create: { userId: userId }, // Create if it doesn't exist
      //   });
      // }
    }

    if (Object.keys(updateData).length === 0) {
      return new NextResponse("No valid fields to update", { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: {
        studentProfile: { select: { id: true } },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[API_ADMIN_USERS_PATCH]", error);
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return new NextResponse("User not found", { status: 404 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
