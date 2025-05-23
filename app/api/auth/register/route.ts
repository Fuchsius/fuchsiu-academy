import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // If user exists but doesn't have admin role, update it
      if (existingUser.role !== "ADMIN") {
        const updatedUser = await prisma.user.update({
          where: { id: existingUser.id },
          data: { role: "ADMIN" },
        });
        return NextResponse.json({
          success: true,
          userId: updatedUser.id,
          message: "Existing user updated to admin role",
        });
      }

      // User already exists with admin role
      return NextResponse.json({
        success: true,
        userId: existingUser.id,
        message: "Admin user already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with admin role
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
      message: "Admin user created successfully",
    });
  } catch (error) {
    console.error("Admin registration error:", error);
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    );
  }
}
