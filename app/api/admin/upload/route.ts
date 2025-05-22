import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// POST /api/admin/upload - Upload certificate file
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

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "File type not allowed. Please upload PDF, JPEG, or PNG files only.",
        },
        { status: 400 }
      );
    }

    // Get file extension
    const fileExt = file.name.split(".").pop();

    // Generate unique filename
    const uniqueFilename = `${uuidv4()}.${fileExt}`;

    // Create path to save file
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "certificates"
    );
    const filePath = path.join(uploadDir, uniqueFilename);

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Save file
    await writeFile(filePath, buffer);

    // Generate URL for the uploaded file
    const fileUrl = `/uploads/certificates/${uniqueFilename}`;

    return NextResponse.json({
      success: true,
      fileUrl,
      filename: uniqueFilename,
      originalFilename: file.name,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
