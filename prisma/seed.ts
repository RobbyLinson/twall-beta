import { PrismaClient } from "@prisma/client";
import { PrismaPostgresAdapter } from "@prisma/adapter-ppg";
import { readFileSync } from "fs";
import { join } from "path";

import dotenv from "dotenv";

dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPostgresAdapter({
  connectionString: connectionString,
});
const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Read the climbs JSON file
  const jsonPath = join(process.cwd(), "prisma", "climbs.json");
  const jsonData = readFileSync(jsonPath, "utf-8");
  const climbs = JSON.parse(jsonData);

  console.log(`Starting to seed ${climbs.length} climbs...`);

  for (const climb of climbs) {
    const result = await prisma.climb.upsert({
      where: {
        rope_color: {
          rope: climb.rope.toUpperCase(),
          color: climb.color,
        },
      },
      update: {
        grade: climb.grade,
      },
      create: {
        rope: climb.rope.toUpperCase(),
        color: climb.color,
        grade: climb.grade,
      },
    });
    console.log(`✓ Created/Updated: Rope ${result.rope} - ${result.color}`);
  }

  console.log("✅ Database seeded successfully!");
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
