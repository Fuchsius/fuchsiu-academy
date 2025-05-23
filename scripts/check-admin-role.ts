import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkAdminRole() {
  try {
    // Find the admin user
    const admin = await prisma.user.findUnique({
      where: {
        email: "admin@fuchsiu-academy.com",
      },
    });

    if (!admin) {
      console.log("Admin user not found. Run the seed command to create one.");
      return;
    }

    console.log("Current admin user status:");
    console.log({
      id: admin.id,
      email: admin.email,
      role: admin.role,
      emailVerified: admin.emailVerified,
    });

    // Check if role is correctly set to "ADMIN"
    if (admin.role !== "ADMIN") {
      console.log(
        `Admin role is currently "${admin.role}", updating to "ADMIN"...`
      );

      // Update the role to ADMIN
      const updatedAdmin = await prisma.user.update({
        where: { id: admin.id },
        data: { role: "ADMIN" },
      });

      console.log("Admin role updated successfully:", updatedAdmin.role);
    } else {
      console.log("Admin role is correctly set to 'ADMIN'");
    }
  } catch (error) {
    console.error("Error checking admin role:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdminRole();
