/**
 * Example data so GET /users shows at least one row after migrate + seed.
 * Safe to run repeatedly (upsert by unique email).
 */
require("dotenv/config");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: { name: "Demo User" },
    create: {
      email: "demo@example.com",
      name: "Demo User",
    },
  });

  console.log("Seed:", user);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
