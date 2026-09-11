import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Load .env if present
if (fs.existsSync('.env')) {
  const envContent = fs.readFileSync('.env', 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 's9jvl8w0';
const API_KEY = process.env.CLOUDINARY_API_KEY || '746445473754292';
const API_SECRET = process.env.CLOUDINARY_API_SECRET || 'Z_bI1sIItVYjz5db_wccwQ5paYs';
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

function generateSignature(params, secret) {
  const sortedKeys = Object.keys(params).sort();
  const serialized = sortedKeys.map(k => `${k}=${params[k]}`).join('&');
  return crypto.createHash('sha1').update(serialized + secret).digest('hex');
}

async function uploadSingleFile(filePath, publicId) {
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : (ext === 'svg' ? 'image/svg+xml' : 'image/png');
  const base64Data = `data:${mime};base64,${fileBuffer.toString('base64')}`;

  const formData = new FormData();
  formData.append('file', base64Data);

  if (UPLOAD_PRESET) {
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('public_id', publicId);
  } else {
    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = {
      public_id: publicId,
      timestamp: timestamp
    };
    const signature = generateSignature(paramsToSign, API_SECRET);
    formData.append('api_key', API_KEY);
    formData.append('timestamp', timestamp.toString());
    formData.append('public_id', publicId);
    formData.append('signature', signature);
  }

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });

  const json = await res.json();
  if (json.error) {
    throw new Error(json.error.message);
  }
  return json.secure_url;
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(ext)) {
        arrayOfFiles.push(fullPath);
      }
    }
  }
  return arrayOfFiles;
}

async function main() {
  console.log(`=== Cloudinary Asset Uploader ===`);
  console.log(`Cloud Name: ${CLOUD_NAME}`);
  console.log(`API Key:    ${API_KEY ? API_KEY.slice(0, 6) + '...' : 'None'}`);

  const assetsDir = path.resolve('src/assets');
  const allFiles = getAllFiles(assetsDir);
  console.log(`Found ${allFiles.length} images to upload.\n`);

  const mappingFile = path.resolve('src/assets/cloudinaryUrls.json');
  let urlMapping = {};
  if (fs.existsSync(mappingFile)) {
    try {
      urlMapping = JSON.parse(fs.readFileSync(mappingFile, 'utf-8'));
    } catch (e) {}
  }

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < allFiles.length; i++) {
    const filePath = allFiles[i];
    const relFromAssets = path.relative(assetsDir, filePath).replace(/\\/g, '/');
    const nameWithoutExt = path.basename(filePath, path.extname(filePath));
    const subFolder = path.dirname(relFromAssets);
    const publicId = subFolder === '.' 
      ? `techuthopia/assets/${nameWithoutExt}`
      : `techuthopia/assets/${subFolder}/${nameWithoutExt}`;

    if (urlMapping[relFromAssets]) {
      console.log(`[${i + 1}/${allFiles.length}] Already uploaded: ${relFromAssets}`);
      successCount++;
      continue;
    }

    try {
      process.stdout.write(`[${i + 1}/${allFiles.length}] Uploading ${relFromAssets}... `);
      const secureUrl = await uploadSingleFile(filePath, publicId);
      urlMapping[relFromAssets] = secureUrl;
      fs.writeFileSync(mappingFile, JSON.stringify(urlMapping, null, 2));
      console.log(`✓ DONE`);
      successCount++;
    } catch (err) {
      console.log(`✗ FAILED: ${err.message}`);
      failCount++;
      // If permission error, stop early and alert user
      if (err.message.includes('missing permissions') || err.message.includes('Request forbidden')) {
        console.error('\n[PERMISSION ERROR] Cloudinary rejected upload because the API Key does not have "create" permission.');
        console.error('Please grant "Create/Upload" permission or "Full Access" to this API key in Cloudinary Console:');
        console.error('-> Settings > Access Keys > Permissions -> Enable "Create" / "Full Access"\n');
        break;
      }
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Uploaded: ${successCount} / ${allFiles.length}`);
  console.log(`Failed:   ${failCount}`);
  console.log(`Mapping saved to: ${mappingFile}`);
}

main().catch(console.error);
