import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const CSV_FILE_PATH = path.join(DATA_DIR, 'students_database.csv');

/**
 * Ensures the data directory exists
 */
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

/**
 * Escapes CSV field value
 */
function escapeCSV(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

/**
 * Syncs full database student records into a CSV file
 * @param {Array} students List of student objects from Prisma
 */
export async function syncStudentsToCSV(students) {
  try {
    ensureDataDir();

    const headers = [
      'ID',
      'Name',
      'Email',
      'Phone',
      'College',
      'ReferralCode',
      'ReferralPoints',
      'ReferredById',
      'CreatedAt',
      'UpdatedAt'
    ];

    const rows = students.map((s) => [
      escapeCSV(s.id),
      escapeCSV(s.name || ''),
      escapeCSV(s.email),
      escapeCSV(s.phone || ''),
      escapeCSV(s.college || ''),
      escapeCSV(s.referralCode),
      escapeCSV(s.referralPoints),
      escapeCSV(s.referredById || ''),
      escapeCSV(s.createdAt ? new Date(s.createdAt).toISOString() : ''),
      escapeCSV(s.updatedAt ? new Date(s.updatedAt).toISOString() : '')
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');
    fs.writeFileSync(CSV_FILE_PATH, csvContent, 'utf-8');
    return CSV_FILE_PATH;
  } catch (error) {
    console.error('Error syncing students to CSV:', error);
    throw error;
  }
}

/**
 * Syncs credentials table for existing imported students (with plain pregenerated passwords for administrative records)
 */
export async function saveImportedCredentialsCSV(records) {
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, 'imported_credentials_log.csv');

    const headers = ['Name', 'Email', 'PregeneratedPassword', 'ReferralCode', 'ImportedAt'];
    const rows = records.map((r) => [
      escapeCSV(r.name || ''),
      escapeCSV(r.email),
      escapeCSV(r.password),
      escapeCSV(r.referralCode),
      escapeCSV(new Date().toISOString())
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');
    fs.writeFileSync(filePath, csvContent, 'utf-8');
    return filePath;
  } catch (error) {
    console.error('Error saving imported credentials CSV:', error);
    throw error;
  }
}
