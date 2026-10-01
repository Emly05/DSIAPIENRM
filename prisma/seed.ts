import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  const tenant = await prisma.tenant.create({
    data: { name: 'Tech Solutions' },
  });

  await prisma.user.create({
    data: {
      email: 'admin@techsolutions.com',
      name: 'Admin Tech Solutions',
      password: hashedPassword,
      telephone: '+1-555-0101',
      role: 'ADMIN',
      tenantId: tenant.id,
    },
  });

  console.log('Seed ejecutado correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });