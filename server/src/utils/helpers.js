import crypto from 'crypto';

/**
 * Generates an uppercase alphanumeric referral code (e.g., TECH-X9K2B)
 */
export function generateReferralCode(prefix = 'TECH') {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // excluding ambiguous chars like 0, O, 1, I
  let code = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = crypto.randomInt(0, chars.length);
    code += chars[randomIndex];
  }
  return `${prefix}-${code}`;
}

/**
 * Generates a secure yet human-readable pregenerated password
 */
export function generateRandomPassword() {
  const letters = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
  const digits = '23456789';
  const specials = '!@#$%';

  let pass = '';
  // 4 letters
  for (let i = 0; i < 4; i++) {
    pass += letters[crypto.randomInt(0, letters.length)];
  }
  // 1 special
  pass += specials[crypto.randomInt(0, specials.length)];
  // 3 digits
  for (let i = 0; i < 3; i++) {
    pass += digits[crypto.randomInt(0, digits.length)];
  }

  // Shuffle
  return pass.split('').sort(() => 0.5 - Math.random()).join('');
}
