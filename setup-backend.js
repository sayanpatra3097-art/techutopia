const fs = require('fs');
const path = require('path');

// 1. Create adminRoutes.js
const adminRoutesCode = `
import express from 'express';
import { prisma } from '../db.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

const ADMIN_EMAILS = ['shreyasroy2023@gmail.com', 'snehalsarkar92@gmail.com'];

// Admin Verification Middleware
const verifyAdmin = (req, res, next) => {
  if (!req.user || !ADMIN_EMAILS.includes(req.user.email)) {
    return res.status(403).json({ error: 'Forbidden: Admin access required.' });
  }
  next();
};

// Protect all admin routes
router.use(authenticateJWT);
router.use(verifyAdmin);

// GET /api/admin/overview
router.get('/overview', async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalReferrals = await prisma.referralLog.count();
    
    // Calculate total referral points
    const users = await prisma.user.findMany({ select: { referralPoints: true } });
    const totalReferralPoints = users.reduce((sum, user) => sum + user.referralPoints, 0);

    res.json({
      totalUsers,
      totalReferrals,
      totalReferralPoints
    });
  } catch (error) {
    console.error('Admin overview error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        college: true,
        createdAt: true,
        referralCode: true,
        referralPoints: true,
        referredBy: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/admin/referrals
router.get('/referrals', async (req, res) => {
  try {
    const referrals = await prisma.referralLog.findMany({
      include: {
        referrer: { select: { id: true, name: true, email: true, referralCode: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(referrals);
  } catch (error) {
    console.error('Admin referrals error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
`;

fs.writeFileSync(path.join(__dirname, 'server/src/routes/adminRoutes.js'), adminRoutesCode.trim());

// 2. Update server/src/index.js
let indexJs = fs.readFileSync(path.join(__dirname, 'server/src/index.js'), 'utf8');
if (!indexJs.includes('adminRoutes.js')) {
    indexJs = indexJs.replace(
        "import studentRoutes from './routes/studentRoutes.js';", 
        "import studentRoutes from './routes/studentRoutes.js';\nimport adminRoutes from './routes/adminRoutes.js';"
    );
    indexJs = indexJs.replace(
        "app.use('/api/student', studentRoutes);", 
        "app.use('/api/student', studentRoutes);\napp.use('/api/admin', adminRoutes);"
    );
    fs.writeFileSync(path.join(__dirname, 'server/src/index.js'), indexJs);
}

// 3. Create seed script
const seedScript = `
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
      console.log(\`Created admin: \${admin.email}\`);
    } else {
      console.log(\`Admin already exists: \${admin.email}\`);
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await prisma.user.update({
        where: { email: admin.email },
        data: { password: hashedPassword }
      });
      console.log(\`Updated password for: \${admin.email}\`);
    }
  }
}

seed()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
`;
fs.writeFileSync(path.join(__dirname, 'server/scripts/seedAdmins.js'), seedScript.trim());
console.log("Backend setup complete.");
