import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Check if admin already exists to avoid duplicates
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@fuchsiu-academy.com",
    },
  });

  if (!existingAdmin) {
    // Create an admin user
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        username: "admin",
        email: "admin@fuchsiu-academy.com",
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: new Date(),
      },
    });

    console.log(`Created admin user with id: ${admin.id}`);
  } else {
    console.log("Admin user already exists");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
