import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';
import { generateReferralCode } from '../utils/helpers.js';
import { syncStudentsToCSV } from '../utils/csvSync.js';
import { authenticateJWT } from '../middleware/auth.js';
import crypto from 'crypto';
import rateLimit from 'express-rate-limit';
import { sendPasswordResetEmail } from '../utils/emailService.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new student with optional referral code
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, college, referralCode } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing email
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      return res.status(409).json({ error: 'A student with this email is already registered. Please log in.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate unique referral code for this new student
    let userReferralCode = generateReferralCode();
    while (await prisma.user.findUnique({ where: { referralCode: userReferralCode } })) {
      userReferralCode = generateReferralCode();
    }

    let referredById = null;
    let initialPoints = 0;
    let validReferrer = null;

    // Process referral code if provided
    if (referralCode && referralCode.trim() !== '') {
      const codeToSearch = referralCode.trim().toUpperCase();
      validReferrer = await prisma.user.findUnique({
        where: { referralCode: codeToSearch }
      });

      if (!validReferrer) {
        return res.status(400).json({ error: 'The referral code entered is invalid or does not exist.' });
      }
      
      if (validReferrer.email === normalizedEmail) {
        return res.status(400).json({ error: 'Self-referral is not allowed.' });
      }

      // Bonus Rule:
      // 1. New user gets 1 starting bonus referral credit!
      // 2. Referrer gets +1 referral point added!
      initialPoints = 1;
      referredById = validReferrer.id;
    }

    // Database transaction to create student and update referrer
    const newUser = await prisma.$transaction(async (tx) => {
      const created = await tx.user.create({
        data: {
          name: name ? name.trim() : null,
          email: normalizedEmail,
          password: hashedPassword,
          phone: phone ? phone.trim() : null,
          college: college ? college.trim() : null,
          referralCode: userReferralCode,
          referralPoints: initialPoints,
          referredById
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          college: true,
          referralCode: true,
          referralPoints: true,
          referredById: true,
          createdAt: true
        }
      });

      // If referred, update referrer & log referral
      if (validReferrer) {
        await tx.user.update({
          where: { id: validReferrer.id },
          data: {
            referralPoints: { increment: 1 }
          }
        });

        await tx.referralLog.create({
          data: {
            referrerId: validReferrer.id,
            referredUserId: created.id,
            referredEmail: created.email,
            bonusAwarded: 1
          }
        });
      }

      return created;
    });

    // Background sync to CSV file
    prisma.user.findMany().then((allUsers) => syncStudentsToCSV(allUsers)).catch(console.error);

    // Issue JWT token
    const secret = process.env.JWT_SECRET || 'techutopia_jwt_secret_key_2026_secure';
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'Student registered successfully!',
      token,
      user: newUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

/**
 * POST /api/auth/login
 * Log in student via Email & Password
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (user.status === 'INACTIVE') {
      return res.status(403).json({ success: false, message: 'Your account has been deactivated.' });
    }

    const secret = process.env.JWT_SECRET || 'techutopia_jwt_secret_key_2026_secure';
    const token = jwt.sign(
      { id: user.id, email: user.email },
      secret,
      { expiresIn: '7d' }
    );

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      college: user.college,
      referralCode: user.referralCode,
      referralPoints: user.referralPoints,
      referredById: user.referredById,
      status: user.status,
      createdAt: user.createdAt,
      mustChangePassword: user.mustChangePassword
    };

    return res.json({
      success: true,
      token,
      user: safeUser
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during login' });
  }
});

/**
 * POST /api/auth/change-password
 * Change password for authenticated student
 */
router.post('/change-password', authenticateJWT, async (req, res) => {
  try {
    const { newPassword, referralCode, name } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    let validReferrer = null;
    let initialPoints = currentUser.referralPoints;
    let referredById = currentUser.referredById;

    // Process referral code if provided and if they haven't been referred yet
    if (referralCode && referralCode.trim() !== '' && !currentUser.referredById) {
      const codeToSearch = referralCode.trim().toUpperCase();
      validReferrer = await prisma.user.findUnique({
        where: { referralCode: codeToSearch }
      });

      if (!validReferrer) {
        return res.status(400).json({ error: 'The referral code entered is invalid or does not exist.' });
      }
      
      if (validReferrer.email === currentUser.email) {
        return res.status(400).json({ error: 'Self-referral is not allowed.' });
      }

      initialPoints += 1;
      referredById = validReferrer.id;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: req.user.id },
        data: { 
          ...(name && name.trim() !== '' ? { name: name.trim() } : {}),
          password: hashedPassword,
          mustChangePassword: false,
          referralPoints: initialPoints,
          referredById: referredById
        }
      });

      // If referred, update referrer & log referral
      if (validReferrer) {
        await tx.user.update({
          where: { id: validReferrer.id },
          data: {
            referralPoints: { increment: 1 }
          }
        });

        await tx.referralLog.create({
          data: {
            referrerId: validReferrer.id,
            referredUserId: currentUser.id,
            referredEmail: currentUser.email,
            bonusAwarded: 1
          }
        });
      }
    });

    return res.json({ message: 'Password updated successfully!' });
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({ error: 'Failed to update password.' });
  }
});

/**
 * GET /api/auth/me
 * Get current authenticated user details
 */
router.get('/me', authenticateJWT, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      college: user.college,
      referralCode: user.referralCode,
      referralPoints: user.referralPoints,
      referredById: user.referredById,
      createdAt: user.createdAt
    };

    return res.json({ user: safeUser });
  } catch (error) {
    console.error('Fetch me error:', error);
    return res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: { success: false, message: 'Too many password reset requests from this IP, please try again later.' }
});

/**
 * POST /api/auth/forgot-password
 * Request a password reset email
 */
router.post('/forgot-password', forgotPasswordLimiter, async (req, res) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ success: false, message: 'SMTP configuration is missing. RESEND_API_KEY environment variable is required.' });
    }

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    
    // 1. Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetTokenExpiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 mins

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (user) {
      // 2. Save hash to db
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetTokenHash,
          resetTokenExpiresAt
        }
      });

      // 3. Send email
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;
      await sendPasswordResetEmail(user.email, resetUrl);
    }

    // Generic success message to prevent email enumeration
    return res.json({
      success: true,
      message: 'If an account exists with this email, a password reset link has been sent.'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

/**
 * POST /api/auth/reset-password
 * Reset password using token
 */
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: 'Token and new password are required.' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters.' });
    }

    // 1. Hash the incoming token
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // 2. Find user by token hash & ensure token has not expired
    const user = await prisma.user.findFirst({
      where: {
        resetTokenHash: resetTokenHash,
        resetTokenExpiresAt: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'This password reset link is invalid or has expired.'
      });
    }

    // 3. Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 4. Update user password and clear token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetTokenHash: null,
        resetTokenExpiresAt: null
      }
    });

    return res.json({
      success: true,
      message: 'Password reset successfully.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

export default router;
