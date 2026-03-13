import "dotenv/config";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Testing Prisma 6.19.0 connection...");

  // Insert dummy rows
  await prisma.dummy.createMany({
    data: [
      { name: "Alpha", value: 10 },
      { name: "Beta", value: 20 },
      { name: "Gamma", value: 30 },
    ],
  });

  // Query all rows
  const rows = await prisma.dummy.findMany();
  console.log("Rows:", rows);

  // Drop the Dummy table completely
  console.log('Dropping the Dummy table...');
  await prisma.$executeRawUnsafe(`DROP TABLE IF EXISTS "Dummy" CASCADE;`);
  console.log("Table 'Dummy' dropped successfully!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());