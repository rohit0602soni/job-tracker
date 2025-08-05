import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const password = await bcrypt.hash('password123', 10);

  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      password,
    },
  });

  console.log('Seeded user:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
