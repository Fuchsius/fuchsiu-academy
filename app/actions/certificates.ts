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

// Get paginated certificates with search and filters
export async function getCertificates({
  page = 1,
  limit = 10,
  search = "",
  studentId = undefined,
}: {
  page?: number;
  limit?: number;
  search?: string;
  studentId?: string;
}) {
  try {
    await checkAdmin();

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Build filter conditions
    let whereConditions: any = {};

    if (search) {
      whereConditions.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        {
          student: {
            user: { name: { contains: search, mode: "insensitive" } },
          },
        },
        {
          student: {
            user: { email: { contains: search, mode: "insensitive" } },
          },
        },
      ];
    }

    if (studentId) {
      whereConditions.studentId = studentId;
    }

    // Fetch certificates with count
    const [certificates, totalCount] = await Promise.all([
      prisma.certificate.findMany({
        where: whereConditions,
        include: {
          student: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          issuedDate: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.certificate.count({
        where: whereConditions,
      }),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit);

    return {
      certificates,
      meta: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
      },
    };
  } catch (error) {
    console.error("Error in getCertificates:", error);
    throw new Error("Failed to fetch certificates");
  }
}

// Get a single certificate by ID
export async function getCertificate(id: string) {
  try {
    await checkAdmin();

    const certificate = await prisma.certificate.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!certificate) {
      throw new Error("Certificate not found");
    }

    return certificate;
  } catch (error) {
    console.error("Error in getCertificate:", error);
    throw new Error("Failed to fetch certificate");
  }
}

// Create a new certificate
export async function createCertificate(formData: FormData) {
  try {
    await checkAdmin();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const fileUrl = formData.get("fileUrl") as string;
    const issuedDate = formData.get("issuedDate") as string;
    const studentId = formData.get("studentId") as string;

    // Validate required fields
    if (!title || !fileUrl || !issuedDate || !studentId) {
      throw new Error(
        "Title, file URL, issued date, and student ID are required"
      );
    }

    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new Error("Student not found");
    }

    // Create certificate
    await prisma.certificate.create({
      data: {
        title,
        description,
        fileUrl,
        issuedDate: new Date(issuedDate),
        studentId,
      },
    });

    redirect("/admin/certificates");
  } catch (error) {
    console.error("Error in createCertificate:", error);
    throw new Error(
      `Failed to create certificate: ${(error as Error).message}`
    );
  }
}

// Update a certificate
export async function updateCertificate(id: string, formData: FormData) {
  try {
    await checkAdmin();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const fileUrl = formData.get("fileUrl") as string;
    const issuedDate = formData.get("issuedDate") as string;

    // Check if certificate exists
    const existingCertificate = await prisma.certificate.findUnique({
      where: { id },
    });

    if (!existingCertificate) {
      throw new Error("Certificate not found");
    }

    // Update certificate
    await prisma.certificate.update({
      where: { id },
      data: {
        title,
        description,
        fileUrl,
        issuedDate: issuedDate ? new Date(issuedDate) : undefined,
      },
    });

    redirect("/admin/certificates");
  } catch (error) {
    console.error("Error in updateCertificate:", error);
    throw new Error(
      `Failed to update certificate: ${(error as Error).message}`
    );
  }
}

// Delete a certificate
export async function deleteCertificate(id: string) {
  try {
    await checkAdmin();

    // Check if certificate exists
    const existingCertificate = await prisma.certificate.findUnique({
      where: { id },
    });

    if (!existingCertificate) {
      throw new Error("Certificate not found");
    }

    // Delete certificate
    await prisma.certificate.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Error in deleteCertificate:", error);
    throw new Error(
      `Failed to delete certificate: ${(error as Error).message}`
    );
  }
}
