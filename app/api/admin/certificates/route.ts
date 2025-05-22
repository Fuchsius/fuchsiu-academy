import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/prisma";

// GET /api/admin/certificates - Get all certificates with pagination, search, and filtering
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
    const studentId = searchParams.get("studentId");

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

    return NextResponse.json({
      certificates,
      meta: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

// POST /api/admin/certificates - Create a new certificate
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
    const { title, description, fileUrl, issuedDate, studentId } = data;

    // Validate required fields
    if (!title || !fileUrl || !issuedDate || !studentId) {
      return NextResponse.json(
        { error: "Title, file URL, issued date, and student ID are required" },
        { status: 400 }
      );
    }

    // Check if student exists
    const student = await prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    // Create certificate
    const certificate = await prisma.certificate.create({
      data: {
        title,
        description,
        fileUrl,
        issuedDate: new Date(issuedDate),
        studentId,
      },
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

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error("Error creating certificate:", error);
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}
