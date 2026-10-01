import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '../db.js';
import { authenticateJWT } from '../middleware/auth.js';
import { sendAdminTemporaryPasswordEmail } from '../utils/emailService.js';
import { runSync } from '../../scripts/importAndBlast.js';

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

    const days = parseInt(req.query.days) || 30;
    
    // Grouping registrations by day for the last N days
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days + 1);
    startDate.setHours(0, 0, 0, 0);

    const registrationsQuery = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate
        }
      },
      select: {
        createdAt: true
      }
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = registrationsQuery.filter(u => u.createdAt >= today).length;

    const registrationsMap = {};
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;
      registrationsMap[dateStr] = 0;
    }

    registrationsQuery.forEach(u => {
      const yyyy = u.createdAt.getFullYear();
      const mm = String(u.createdAt.getMonth() + 1).padStart(2, '0');
      const dd = String(u.createdAt.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;
      if (registrationsMap[dateStr] !== undefined) {
        registrationsMap[dateStr]++;
      }
    });

    const registrations = Object.keys(registrationsMap).sort().map(date => ({
      date,
      count: registrationsMap[date]
    }));

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalReferrals,
        totalReferralPoints
      },
      todayCount,
      registrations
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
        status: true,
        referredBy: {
          select: { id: true, name: true, email: true }
        },
        _count: {
          select: { invitedUsers: true }
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

// GET /api/admin/users/:id
router.get('/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        college: true,
        createdAt: true,
        referralCode: true,
        referralPoints: true,
        status: true,
        referredBy: {
          select: { id: true, name: true, email: true }
        },
        _count: {
          select: { invitedUsers: true }
        }
      }
    });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Admin user fetch error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// PATCH /api/admin/users/:id/status
router.patch('/users/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['ACTIVE', 'INACTIVE'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be ACTIVE or INACTIVE.' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: { status }
    });

    res.json({ success: true, message: `User ${status === 'ACTIVE' ? 'activated' : 'deactivated'} successfully.`, user: updatedUser });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// PATCH /api/admin/users/:id/referral-code
router.patch('/users/:id/referral-code', async (req, res) => {
  try {
    const { referralCode } = req.body;
    
    if (!referralCode || typeof referralCode !== 'string' || referralCode.trim() === '') {
      return res.status(400).json({ error: 'Referral code cannot be empty.' });
    }
    
    const normalizedCode = referralCode.trim().toUpperCase();
    
    // Check for allowed characters (alphanumeric, dashes, underscores)
    if (!/^[A-Z0-9-_]+$/.test(normalizedCode)) {
      return res.status(400).json({ error: 'Referral code contains invalid characters.' });
    }

    // Check for uniqueness
    const existing = await prisma.user.findUnique({
      where: { referralCode: normalizedCode }
    });

    if (existing && existing.id !== req.params.id) {
      return res.status(400).json({ error: 'Referral code already exists.' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.params.id },
      data: { referralCode: normalizedCode }
    });

    res.json({ success: true, message: 'Referral code updated successfully.', user: updatedUser });
  } catch (error) {
    console.error('Update referral code error:', error);
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

// GET /api/admin/leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await prisma.user.findMany({
      where: {
        referralPoints: { gt: 0 }
      },
      select: {
        id: true,
        name: true,
        email: true,
        referralPoints: true,
        _count: {
          select: { invitedUsers: true }
        }
      },
      orderBy: [
        { referralPoints: 'desc' },
        { createdAt: 'asc' }
      ],
      take: 10
    });
    
    res.json({
      success: true,
      leaderboard: leaderboard.map((user, index) => ({
        rank: index + 1,
        name: user.name,
        email: user.email,
        referralCount: user._count.invitedUsers,
        referralPoints: user.referralPoints
      }))
    });
  } catch (error) {
    console.error('Admin leaderboard error:', error);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// GET /api/admin/users/no-password
router.get('/users/no-password', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { mustChangePassword: true },
          { password: '' },
          { password: 'NOT_SET' }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        mustChangePassword: true,
        status: true,
        password: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    console.error('Admin no-password users error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/admin/users/:id/send-login-credentials
router.post('/users/:id/send-login-credentials', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id }
    });

    if (!user) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    if (!user.mustChangePassword && user.password && user.password !== 'NOT_SET' && user.password !== '') {
      return res.status(400).json({ error: 'Password Already Set. Use the Forgot Password functionality instead.' });
    }

    // Generate a secure temporary password
    const tempPassword = crypto.randomBytes(8).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 10) + '!A1';
    
    // Hash it
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Save hash to database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        mustChangePassword: true
      }
    });

    // Send email
    const emailResult = await sendAdminTemporaryPasswordEmail(user.email, user.name, tempPassword);

    if (!emailResult.success) {
      if (user.password === 'NOT_SET' || user.password === '') {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            password: user.password,
            mustChangePassword: user.mustChangePassword
          }
        });
      }
      return res.status(500).json({ error: 'Failed to send email. Password update was reverted safely.', details: emailResult.error });
    }

    res.json({ success: true, message: 'Temporary password sent successfully.' });
  } catch (error) {
    console.error('Admin send-login-credentials error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/admin/sync-sheet
router.post('/sync-sheet', async (req, res) => {
  try {
    const summary = await runSync();
    res.json({ success: true, message: 'Google Sheet synced successfully.', summary });
  } catch (error) {
    console.error('[GoogleSheets] API ERROR');
    console.error(`[GoogleSheets] status: ${error.status || error.code || 500}`);
    console.error(`[GoogleSheets] code: ${error.code || 'UNKNOWN'}`);
    console.error(`[GoogleSheets] message: ${error.message}`);
    if (error.response && error.response.data) {
      console.error(`[GoogleSheets] details: ${JSON.stringify(error.response.data)}`);
    }
    res.status(500).json({ error: 'Google Sheet synchronization failed. Please check the backend logs for details.' });
  }
});

// GET /api/admin/diagnose-sheet
router.get('/diagnose-sheet', async (req, res) => {
  try {
    const summary = await runSync();
    res.json({ success: true, message: 'Diagnostic Sync Success', summary });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Google API Error',
      status: error.status || error.code || 500,
      code: error.code || 'UNKNOWN',
      message: error.message,
      details: error.response?.data || null
    });
  }
});

// GET /api/admin/email-selection
router.get('/email-selection', async (req, res) => {
  try {
    const selections = await prisma.adminEmailSelection.findMany({
      select: { userId: true }
    });
    res.json(selections.map(s => s.userId));
  } catch (error) {
    console.error('Admin get email selection error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/admin/email-selection
router.post('/email-selection', async (req, res) => {
  try {
    const { userIds } = req.body;
    
    // Clear old selections and insert new ones
    await prisma.adminEmailSelection.deleteMany({});
    
    if (userIds && userIds.length > 0) {
      const data = userIds.map(id => ({ userId: id }));
      await prisma.adminEmailSelection.createMany({
        data,
        skipDuplicates: true
      });
    }

    res.json({ success: true, message: 'Selection saved successfully.' });
  } catch (error) {
    console.error('Admin set email selection error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/admin/email-eligible
router.get('/email-eligible', async (req, res) => {
  try {
    const eligibleUsers = await prisma.user.findMany({
      where: {
        emailSelection: {
          isNot: null
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        password: true,
        status: true,
        emailSendRecords: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(eligibleUsers);
  } catch (error) {
    console.error('Admin get email eligible users error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/admin/email-history
router.get('/email-history', async (req, res) => {
  try {
    const history = await prisma.emailSendRecord.findMany({
      include: {
        user: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(history);
  } catch (error) {
    console.error('Admin email history error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/admin/users/:id/send-email
router.post('/users/:id/send-email', async (req, res) => {
  const adminId = req.user.id || req.user.email; // Store identifier for admin
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id }
    });

    if (!user) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Create an initial tracking record
    let record = await prisma.emailSendRecord.create({
      data: {
        userId: user.id,
        recipientEmail: user.email,
        emailType: 'ACCOUNT_INFORMATION',
        status: 'PENDING',
        pendingAt: new Date(),
        adminId
      }
    });

    // Check if password needs to be set
    let isNewPassword = false;
    let tempPassword = null;
    let hashedPassword = null;

    if (user.password === 'NOT_SET' || user.password === '' || user.mustChangePassword) {
       tempPassword = crypto.randomBytes(8).toString('base64').replace(/[^a-zA-Z0-9]/g, '').substring(0, 10) + '!A1';
       hashedPassword = await bcrypt.hash(tempPassword, 10);
       isNewPassword = true;

       await prisma.user.update({
          where: { id: user.id },
          data: { password: hashedPassword, mustChangePassword: true }
       });
       
    } else {
       tempPassword = '******** (Already Set)';
    }

    let emailResult = await sendAdminTemporaryPasswordEmail(user.email, user.name, tempPassword);

    if (!emailResult.success) {
      if (isNewPassword) {
         // Revert password safely if it was new
         await prisma.user.update({
           where: { id: user.id },
           data: { password: user.password, mustChangePassword: user.mustChangePassword }
         });
      }
      
      await prisma.emailSendRecord.update({
         where: { id: record.id },
         data: { status: 'REJECTED', rejectedAt: new Date(), errorMessage: emailResult.error?.toString() }
      });
      return res.status(500).json({ success: false, status: 'REJECTED', message: 'Email could not be sent', details: emailResult.error });
    }

    // Success
    await prisma.emailSendRecord.update({
       where: { id: record.id },
       data: { 
         status: 'COMPLETED', 
         completedAt: new Date(), 
         resendEmailId: emailResult.data?.id || 'unknown' 
       }
    });

    res.json({ success: true, status: 'COMPLETED', message: 'Email sent successfully', emailId: emailResult.data?.id });
  } catch (error) {
    console.error('Admin send-email error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
