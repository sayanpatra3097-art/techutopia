import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csvParser from 'csv-parser';
import dotenv from 'dotenv';
import { sendAnnouncementEmail } from '../src/utils/emailService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CSV_FILE = path.resolve(__dirname, '../data/imported_credentials_log.csv');
const DELAY_MS = 600;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log('====================================================');
  console.log('📨 TechUtopia Email Dispatcher (Verified Domain)');
  console.log('====================================================\n');

  if (!fs.existsSync(CSV_FILE)) {
    console.error('❌ Credentials log not found at:', CSV_FILE);
    process.exit(1);
  }

  const rows = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE)
      .pipe(csvParser())
      .on('data', (d) => rows.push(d))
      .on('end', resolve)
      .on('error', reject);
  });

  console.log(`📋 Found ${rows.length} students with pregenerated passwords to dispatch.\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < rows.length; i++) {
    const student = rows[i];
    const email = student.Email ? student.Email.trim().toLowerCase() : '';
    const password = student.PregeneratedPassword ? student.PregeneratedPassword.trim() : '';

    if (!email || !password) continue;

    console.log(`[${i + 1}/${rows.length}] Dispatching email to: ${email}...`);

    const result = await sendAnnouncementEmail({
      email,
      password
    });

    if (result.success) {
      console.log(`   ✨ Delivered! (Resend ID: ${result.data?.id})`);
      successCount++;
    } else {
      console.error(`   ❌ Failed: ${result.error}`);
      failCount++;
    }

    await sleep(DELAY_MS);
  }

  console.log('\n====================================================');
  console.log('🏁 Dispatch Completed:');
  console.log(`Total:     ${rows.length}`);
  console.log(`Delivered: ${successCount}`);
  console.log(`Failed:    ${failCount}`);
  console.log('====================================================\n');
}

main().catch(console.error);
