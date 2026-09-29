import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';
import { generateReferralCode } from '../utils/helpers.js';
import { syncStudentsToCSV } from '../utils/csvSync.js';
import { authenticateJWT } from '../middleware/auth.js';

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
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
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
      createdAt: user.createdAt
    };

    return res.json({
      message: 'Login successful!',
      token,
      user: safeUser
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error during login.' });
  }
});

/**
 * POST /api/auth/change-password
 * Change password for authenticated student
 */
router.post('/change-password', authenticateJWT, async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashedPassword }
    });

    return res.json({ message: 'Password updated successfully!' });
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({ error: 'Failed to update password.' });
  }
});

export default router;
