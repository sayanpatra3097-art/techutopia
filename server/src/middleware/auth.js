import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';

export async function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required. Missing or invalid Bearer token.' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token || token === 'null' || token === 'undefined' || token === '') {
      return res.status(401).json({ error: 'Authentication required. Token is missing or invalid.' });
    }
    const secret = process.env.JWT_SECRET || 'techutopia_jwt_secret_key_2026_secure';

    const decoded = jwt.verify(token, secret);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        college: true,
        referralCode: true,
        referralPoints: true,
        referredById: true,
        status: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'User account not found.' });
    }
    
    if (user.status === 'INACTIVE') {
      return res.status(403).json({ success: false, message: 'Your account has been deactivated.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session token expired. Please log in again.' });
    }
    return res.status(403).json({ error: `Invalid authentication token. (${error.message})` });
  }
}
