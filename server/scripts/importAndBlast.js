import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import csvParser from 'csv-parser';
import { prisma } from '../src/db.js';
import { generateReferralCode, generateRandomPassword } from '../src/utils/helpers.js';
import { sendAnnouncementEmail } from '../src/utils/emailService.js';
import { syncStudentsToCSV, saveImportedCredentialsCSV } from '../src/utils/csvSync.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const PROJECT_ROOT = path.resolve(__dirname, '../../');

const EMAIL_SEND_DELAY_MS = 600;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Extracts emails from a CSV stream
 */
function extractEmailsFromStream(stream) {
  return new Promise((resolve, reject) => {
    const emailsSet = new Set();

    stream
      .pipe(csvParser())
      .on('data', (row) => {
        let email = (row['Email Address'] || '').trim().toLowerCase();
        if (!email || !email.includes('@')) {
          for (const [k, v] of Object.entries(row)) {
            if (k.toLowerCase().includes('email') && v && v.includes('@')) {
              email = v.trim().toLowerCase();
              break;
            }
          }
        }
        if (email && email.includes('@')) {
          emailsSet.add(email);
        }
      })
      .on('end', () => resolve(Array.from(emailsSet)))
      .on('error', (err) => reject(err));
  });
}

/**
 * Loads unique emails from Google Sheet (if online) or fallback local CSV
 */
async function loadUniqueStudentEmails() {
  const sheetUrl = process.env.GOOGLE_SHEET_URL;

  if (sheetUrl) {
    try {
      console.log(`[Google Sheet] Fetching live data from:\n${sheetUrl}`);
      const response = await fetch(sheetUrl);
      if (response.ok) {
        const text = await response.text();
        const stream = Readable.from([text]);
        const emails = await extractEmailsFromStream(stream);
        console.log(`✅ Successfully fetched ${emails.length} unique emails directly from LIVE Google Sheet!`);
        return emails;
      }
      console.warn(`⚠️ Google Sheet fetch returned status ${response.status}. Falling back to local CSV...`);
    } catch (err) {
      console.warn('⚠️ Google Sheet fetch failed. Falling back to local CSV. Error:', err.message);
    }
  }

  // Fallback to local CSV files
  const gFormRootPath = path.join(PROJECT_ROOT, 'Event Registration_NEW (Responses) - Form Responses 1.csv');
  const gFormDataPath = path.join(DATA_DIR, 'Event Registration_NEW (Responses) - Form Responses 1.csv');
  const csvPath = fs.existsSync(gFormRootPath) ? gFormRootPath : (fs.existsSync(gFormDataPath) ? gFormDataPath : null);

  if (csvPath) {
    console.log(`[Local CSV] Reading from: ${csvPath}`);
    const stream = fs.createReadStream(csvPath);
    return await extractEmailsFromStream(stream);
  }

  return [];
}

async function main() {
  console.log('====================================================');
  console.log('🚀 TechUtopia Email & Temporary Password Importer');
  console.log('====================================================\n');

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const uniqueEmails = await loadUniqueStudentEmails();

  if (uniqueEmails.length === 0) {
    console.error('❌ Could not find any registered student emails from Google Sheet or local CSV.');
    process.exit(1);
  }

  console.log(`📊 Processing ${uniqueEmails.length} unique student emails.\n`);

  const credentialsLog = [];
  let successfulSends = 0;
  let failedSends = 0;
  let skippedExisting = 0;
  let createdCount = 0;

  for (let i = 0; i < uniqueEmails.length; i++) {
    const email = uniqueEmails[i];
    console.log(`[${i + 1}/${uniqueEmails.length}] Processing: ${email}...`);

    try {
      let user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        console.log(`   ℹ️ Already exists in database (Referral Code: ${user.referralCode}, Points: ${user.referralPoints}).`);
        skippedExisting++;
        continue;
      }

      // 1. Generate temporary password & referral code
      const tempPassword = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(tempPassword, 10);

      let referralCode = generateReferralCode();
      while (await prisma.user.findUnique({ where: { referralCode } })) {
        referralCode = generateReferralCode();
      }

      // 2. Save in Neon PostgreSQL
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          referralCode,
          referralPoints: 0
        }
      });
      createdCount++;
      console.log(`   ✅ Created account with Referral Code: ${referralCode}`);

      // 3. Dispatch announcement & credentials email via Resend
      console.log(`   📧 Sending temporary password email to ${email}...`);
      const emailResult = await sendAnnouncementEmail({
        email,
        password: tempPassword
      });

      if (emailResult.success) {
        console.log(`   ✨ Email sent successfully! (ID: ${emailResult.data?.id || 'delivered'})`);
        successfulSends++;
      } else {
        console.warn(`   ⚠️ Resend status: ${emailResult.error}`);
        failedSends++;
      }

      credentialsLog.push({
        email,
        password: tempPassword,
        referralCode
      });

      await sleep(EMAIL_SEND_DELAY_MS);
    } catch (err) {
      console.error(`   ❌ Error on ${email}:`, err.message);
      failedSends++;
    }
  }

  // 4. Save plain temporary passwords to CSV for admin record
  if (credentialsLog.length > 0) {
    const credsPath = await saveImportedCredentialsCSV(credentialsLog);
    console.log(`\n💾 Saved plain credentials & passwords log to: ${credsPath}`);
  }

  // 5. Sync complete live database to CSV
  const allStudents = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  const dbCsvPath = await syncStudentsToCSV(allStudents);
  console.log(`💾 Live database synced to CSV: ${dbCsvPath}`);

  console.log('\n====================================================');
  console.log('🏁 Batch Processing Summary');
  console.log('====================================================');
  console.log(`Total Emails Found:    ${uniqueEmails.length}`);
  console.log(`New Accounts Created:  ${createdCount}`);
  console.log(`Already In Database:   ${skippedExisting}`);
  console.log(`Emails Dispatched:     ${successfulSends}`);
  console.log(`Emails Blocked/Wait:   ${failedSends}`);
  console.log('====================================================\n');
}

main()
  .catch((err) => {
    console.error('Fatal error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
