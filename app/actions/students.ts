"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

// Function to check if user is admin
async function checkAdmin() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized access");
  }

  return session;
}

// Get paginated students with search and filters
export async function getStudents({
  page = 1,
  limit = 10,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  try {
    await checkAdmin();

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build filter conditions
    const whereConditions = search
      ? {
          OR: [
            { user: { name: { contains: search } } },
            { user: { email: { contains: search } } },
            { phone: { contains: search } },
          ],
        }
      : {};

    // Fetch students with count
    const [students, totalCount] = await Promise.all([
      prisma.student.findMany({
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
          certificates: {
            select: {
              id: true,
            },
          },
          _count: {
            select: {
              certificates: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.student.count({
        where: whereConditions,
      }),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    return {
      students,
      meta: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
      },
    };
  } catch (error) {
    console.error("Error in getStudents:", error);
    throw new Error("Failed to fetch students");
  }
}

// Get a single student by ID
export async function getStudent(id: string) {
  try {
    await checkAdmin();

    const student = await prisma.student.findUnique({
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
        certificates: true,
        _count: {
          select: {
            certificates: true,
          },
        },
      },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    return student;
  } catch (error) {
    console.error("Error in getStudent:", error);
    throw new Error("Failed to fetch student");
  }
}

// Create a new student
export async function createStudent(formData: FormData) {
  try {
    await checkAdmin();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    // Validate required fields
    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Create user and student profile in a transaction
    await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          name,
          email,
          role: "STUDENT",
        },
      });

      // Create student profile
      await tx.student.create({
        data: {
          userId: user.id,
          phone,
          address,
        },
      });
    });

    redirect("/admin/students");
  } catch (error) {
    console.error("Error in createStudent:", error);
    throw new Error(`Failed to create student: ${(error as Error).message}`);
  }
}

// Update a student
export async function updateStudent(id: string, formData: FormData) {
  try {
    await checkAdmin();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!existingStudent) {
      throw new Error("Student not found");
    }

    // Update user and student profile in a transaction
    await prisma.$transaction(async (tx) => {
      // Update user
      await tx.user.update({
        where: { id: existingStudent.userId },
        data: {
          name,
          email,
        },
      });

      // Update student profile
      await tx.student.update({
        where: { id },
        data: {
          phone,
          address,
        },
      });
    });

    redirect("/admin/students");
  } catch (error) {
    console.error("Error in updateStudent:", error);
    throw new Error(`Failed to update student: ${(error as Error).message}`);
  }
}

// Delete a student
export async function deleteStudent(id: string) {
  try {
    await checkAdmin();

    // Check if student exists
    const existingStudent = await prisma.student.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!existingStudent) {
      throw new Error("Student not found");
    }

    // Delete user (which will cascade delete the student profile)
    await prisma.user.delete({
      where: { id: existingStudent.userId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error in deleteStudent:", error);
    throw new Error(`Failed to delete student: ${(error as Error).message}`);
  }
}
