import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import csvParser from 'csv-parser';
import { Readable } from 'stream';
import { prisma } from '../src/db.js';
import { generateReferralCode, generateRandomPassword } from '../src/utils/helpers.js';
import { syncStudentsToCSV, saveImportedCredentialsCSV } from '../src/utils/csvSync.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../data');
const SPREADSHEET_ID = '1p2WP3foWUSvGdOJcGJE1YAN4X69fu22xaYtHSHf3W9g';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv`;

async function fetchGoogleSheetDataAPI() {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!apiKey && (!clientEmail || !privateKey)) {
    console.log('[GoogleSheets] No API credentials found in .env. Attempting public CSV export download instead...');
    return fetchGoogleSheetDataCSV();
  }

  let auth;
  if (clientEmail && privateKey) {
    auth = new google.auth.JWT(
      clientEmail,
      null,
      privateKey.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets.readonly']
    );
  } else {
    auth = apiKey;
  }

  const sheets = google.sheets({ version: 'v4', auth });
  
  console.log('[GoogleSheets] Fetching spreadsheet metadata...');
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: SPREADSHEET_ID,
  });
  
  const sheetName = meta.data.sheets[0].properties.title;
  console.log(`[GoogleSheets] Worksheet detected: ${sheetName}`);
  
  console.log('[GoogleSheets] Fetching rows via API...');
  const safeSheetName = sheetName.replace(/'/g, "''");
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `'${safeSheetName}'!A:ZZ`,
  });

  return response.data.values;
}

async function fetchGoogleSheetDataCSV() {
  console.log(`[GoogleSheets] Downloading public CSV from: ${CSV_URL}`);
  const response = await fetch(CSV_URL);
  
  if (!response.ok) {
    throw new Error(`Public CSV download failed with HTTP ${response.status}: ${response.statusText}`);
  }
  
  const text = await response.text();
  const stream = Readable.from([text]);
  
  return new Promise((resolve, reject) => {
    const rows = [];
    let headers = null;
    stream
      .pipe(csvParser())
      .on('headers', (h) => {
        headers = h;
        rows.push(h); // Add headers as first row to match API format
      })
      .on('data', (row) => {
        // Convert object back to array matching headers order
        const rowArr = headers.map(h => row[h]);
        rows.push(rowArr);
      })
      .on('end', () => resolve(rows))
      .on('error', (err) => reject(err));
  });
}

function normalizeEmail(email) {
  return email ? email.toString().trim().toLowerCase() : null;
}

function findColumnIndex(headers, possibleNames) {
  for (let i = 0; i < headers.length; i++) {
    const h = (headers[i] || '').toString().trim().toLowerCase();
    for (const name of possibleNames) {
      if (h.includes(name)) return i;
    }
  }
  return -1;
}

export async function runSync() {
  console.log('[GoogleSheets] Starting sync');
  const values = await fetchGoogleSheetDataAPI();
  
  if (!values || values.length === 0) {
    throw new Error('No data found in spreadsheet.');
  }

  const headers = values[0];
  console.log('[GoogleSheets] Header row detected');
  
  const emailCol = findColumnIndex(headers, ['email', 'email address']);
  const nameCol = findColumnIndex(headers, ['name', 'full name']);
  const collegeCol = findColumnIndex(headers, ['college', 'university', 'institute']);
  const regIdCol = findColumnIndex(headers, ['registration id', 'student id', 'enrollment']);

  if (emailCol === -1) {
    throw new Error('Could not identify an email column in the spreadsheet.');
  }

  const records = [];
  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const email = normalizeEmail(row[emailCol]);
    if (email && email.includes('@')) {
      records.push({
        email,
        name: nameCol !== -1 ? (row[nameCol] || '').toString().trim() : '',
        college: collegeCol !== -1 ? (row[collegeCol] || '').toString().trim() : '',
        regId: regIdCol !== -1 ? (row[regIdCol] || '').toString().trim() : ''
      });
    }
  }

  console.log(`[GoogleSheets] Registration rows found: ${records.length}`);

  let newRecords = 0;
  let existingRecords = 0;
  let duplicatesDetected = 0;
  let errors = 0;
  
  const seenEmails = new Set();
  const credentialsLog = [];

  for (const record of records) {
    if (seenEmails.has(record.email)) {
      duplicatesDetected++;
      continue;
    }
    seenEmails.add(record.email);

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email: record.email }
      });

      if (existingUser) {
        existingRecords++;
      } else {
        const tempPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        let referralCode = generateReferralCode();
        while (await prisma.user.findUnique({ where: { referralCode } })) {
          referralCode = generateReferralCode();
        }

        await prisma.user.create({
          data: {
            email: record.email,
            name: record.name,
            college: record.college,
            password: hashedPassword,
            referralCode,
            referralPoints: 0,
            mustChangePassword: true
          }
        });
        
        credentialsLog.push({
          email: record.email,
          password: tempPassword,
          referralCode
        });
        
        newRecords++;
      }
    } catch (err) {
      console.error(`[GoogleSheets] Error processing ${record.email}:`, err.message);
      errors++;
    }
  }

  if (credentialsLog.length > 0) {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    await saveImportedCredentialsCSV(credentialsLog);
  }

  const allStudents = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  await syncStudentsToCSV(allStudents);

  console.log(`[GoogleSheets] Existing records: ${existingRecords}`);
  console.log(`[GoogleSheets] New records: ${newRecords}`);
  console.log(`[GoogleSheets] Duplicates detected: ${duplicatesDetected}`);
  console.log(`[GoogleSheets] Sync completed`);

  return {
    newRecords,
    existingRecords,
    duplicatesDetected,
    errors
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runSync()
    .then(result => {
      console.log('\n====================================================');
      console.log('Google Sheet Sync Complete');
      console.log(`New registrations: ${result.newRecords}`);
      console.log(`Existing registrations: ${result.existingRecords}`);
      console.log(`Duplicates detected: ${result.duplicatesDetected}`);
      console.log(`Errors: ${result.errors}`);
      console.log('\nExisting users were preserved.');
      console.log('====================================================\n');
      process.exit(0);
    })
    .catch(err => {
      console.error('Sync failed with code 1:');
      console.error(err.message);
      process.exit(1);
    });
}
