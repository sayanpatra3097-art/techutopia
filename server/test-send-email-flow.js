import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const secret = process.env.JWT_SECRET || 'techutopia_jwt_secret_key_2026_secure';

async function testSendEmail() {
  try {
    const targetEmail = 'shreyasroy53@gmail.com';
    
    // 0. Find or create the target user
    let targetUser = await prisma.user.findUnique({
      where: { email: targetEmail }
    });

    if (!targetUser) {
      console.log(`Creating test user for ${targetEmail}...`);
      targetUser = await prisma.user.create({
        data: {
          email: targetEmail,
          name: 'Shreyas Roy',
          password: 'NOT_SET',
          referralCode: 'TEST_' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          mustChangePassword: true,
          referralPoints: 0
        }
      });
    } else {
      console.log(`User ${targetEmail} already exists.`);
    }

    // 1. Get the Admin user for the JWT
    const adminUser = await prisma.user.findUnique({
      where: { email: 'shreyasroy2023@gmail.com' } // Valid admin
    });

    if (!adminUser) {
      console.error("Admin user not found!");
      process.exit(1);
    }
    
    // Create token with actual admin id
    const token = jwt.sign({ id: adminUser.id, email: adminUser.email }, secret);

    // 2. Call the endpoint for the target user
    const res = await fetch(`http://localhost:5000/api/admin/users/${targetUser.id}/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    console.log(`Status: ${res.status}`);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

testSendEmail();
