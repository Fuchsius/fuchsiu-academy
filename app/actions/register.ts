"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/prisma";

// Schema for registration validation
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function registerUser(formData: FormData) {
  try {
    // Extract and validate the input data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validatedFields = registerSchema.safeParse({
      name,
      email,
      password,
    });

    if (!validatedFields.success) {
      return {
        error: "Invalid input",
        details: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Failed to register user" };
  }
}
