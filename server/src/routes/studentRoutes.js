import express from 'express';
import path from 'path';
import fs from 'fs';
import { prisma } from '../db.js';
import { authenticateJWT } from '../middleware/auth.js';
import { syncStudentsToCSV } from '../utils/csvSync.js';

const router = express.Router();

/**
 * PUT /api/student/profile
 * Update student's name, phone, college details after logging in
 */
router.put('/profile', authenticateJWT, async (req, res) => {
  try {
    const { name, phone, college } = req.body;
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name: name !== undefined ? name.trim() : undefined,
        phone: phone !== undefined ? phone.trim() : undefined,
        college: college !== undefined ? college.trim() : undefined
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        college: true,
        referralCode: true,
        referralPoints: true
      }
    });

    // Sync to CSV
    prisma.user.findMany({ orderBy: { createdAt: 'desc' } }).then(syncStudentsToCSV).catch(console.error);

    return res.json({ message: 'Profile updated successfully!', student: updated });
  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({ error: 'Failed to update profile.' });
  }
});

/**
 * GET /api/student/dashboard
 * Fetch authenticated student's referral statistics and dashboard data
 */
router.get('/dashboard', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    // Retrieve fresh user record along with invited users
    const student = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        invitedUsers: {
          select: {
            id: true,
            name: true,
            email: true,
            college: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        },
        referredBy: {
          select: {
            name: true,
            referralCode: true
          }
        }
      }
    });

    if (!student) {
      return res.status(404).json({ error: 'Student record not found.' });
    }

    // Mask emails for privacy in friend list
    const maskedFriends = student.invitedUsers.map((friend) => {
      const parts = friend.email.split('@');
      const maskedName = parts[0].length > 3 ? `${parts[0].slice(0, 3)}***` : `${parts[0]}***`;
      return {
        id: friend.id,
        name: friend.name || 'Anonymous Student',
        maskedEmail: `${maskedName}@${parts[1]}`,
        college: friend.college || 'N/A',
        joinedAt: friend.createdAt
      };
    });

    const targetMilestone = 10;
    const currentPoints = student.referralPoints;
    const isPrizeUnlocked = currentPoints >= targetMilestone;
    const remainingToPrize = Math.max(0, targetMilestone - currentPoints);

    return res.json({
      student: {
        id: student.id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        college: student.college,
        referralCode: student.referralCode,
        referralLink: `${frontendUrl}/register?ref=${student.referralCode}`,
        referralPoints: currentPoints,
        referredBy: student.referredBy ? student.referredBy.name || student.referredBy.referralCode : null
      },
      rewards: {
        milestone: targetMilestone,
        currentPoints,
        isPrizeUnlocked,
        remainingToPrize,
        message: isPrizeUnlocked
          ? '🎉 Congratulations! You have unlocked the exclusive 10+ referrals secret goodies & prizes reward tier!'
          : `⚡ Invite ${remainingToPrize} more student${remainingToPrize === 1 ? '' : 's'} to unlock exciting prizes and exclusive goodies!`
      },
      invitedStudentsCount: student.invitedUsers.length,
      invitedStudents: maskedFriends
    });
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    return res.status(500).json({ error: 'Failed to retrieve dashboard data.' });
  }
});

/**
 * GET /api/student/leaderboard
 * Public or authenticated leaderboard of top referrers
 */
router.get('/leaderboard', async (req, res) => {
  try {
    const topStudents = await prisma.user.findMany({
      where: {
        referralPoints: { gt: 0 }
      },
      select: {
        id: true,
        name: true,
        email: true,
        referralPoints: true,
        createdAt: true
      },
      orderBy: { referralPoints: 'desc' },
      take: 15
    });

    const leaderboard = topStudents.map((s, index) => {
      const parts = s.email.split('@');
      const maskedEmail = `${parts[0].slice(0, 3)}***@${parts[1]}`;
      return {
        rank: index + 1,
        name: s.name || `Innovator #${index + 1}`,
        maskedEmail,
        points: s.referralPoints,
        unlockedPrizes: s.referralPoints >= 10
      };
    });

    return res.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard fetch error:', error);
    return res.status(500).json({ error: 'Failed to retrieve leaderboard.' });
  }
});

/**
 * GET /api/student/export-csv
 * Triggers a full database export and returns the CSV file for download
 */
router.get('/export-csv', async (req, res) => {
  try {
    const allStudents = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const csvPath = await syncStudentsToCSV(allStudents);
    return res.download(csvPath, 'techutopia_students.csv');
  } catch (error) {
    console.error('CSV export error:', error);
    return res.status(500).json({ error: 'Failed to export CSV.' });
  }
});

export default router;
