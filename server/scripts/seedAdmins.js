import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const ADMINS = [
  { email: 'shreyasroy2023@gmail.com', name: 'Shreyas Roy', password: '123456' },
  { email: 'snehalsarkar92@gmail.com', name: 'Snehal Sarkar', password: '123456' }
];

async function seed() {
  for (const admin of ADMINS) {
    const existing = await prisma.user.findUnique({ where: { email: admin.email } });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      let refCode = 'ADM_' + Math.random().toString(36).substring(2, 8).toUpperCase();
      
      await prisma.user.create({
        data: {
          name: admin.name,
          email: admin.email,
          password: hashedPassword,
          referralCode: refCode
        }
      });
      console.log(`Created admin: ${admin.email}`);
    } else {
      console.log(`Admin already exists: ${admin.email}`);
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await prisma.user.update({
        where: { email: admin.email },
        data: { password: hashedPassword }
      });
      console.log(`Updated password for: ${admin.email}`);
    }
  }
}

seed()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
