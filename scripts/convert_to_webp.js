import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const DIRS = [
  path.resolve('src/assets'),
  path.resolve('src/assets/pastphotos'),
  path.resolve('public')
];

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const dir = path.dirname(filePath);
  const base = path.basename(filePath, ext);
  const targetWebp = path.join(dir, `${base}.webp`);

  const stat = fs.statSync(filePath);
  const origSize = (stat.size / 1024).toFixed(1);

  try {
    const isPastPhoto = filePath.includes('pastphotos');
    let pipeline = sharp(filePath);
    const metadata = await pipeline.metadata();

    // Resize if unreasonably huge
    if (isPastPhoto) {
      if (metadata.width > 900) {
        pipeline = pipeline.resize({ width: 900, withoutEnlargement: true });
      }
    } else {
      if (metadata.width > 1920) {
        pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
      }
    }

    await pipeline
      .webp({ quality: 82, effort: 4 })
      .toFile(targetWebp);

    const newStat = fs.statSync(targetWebp);
    const newSize = (newStat.size / 1024).toFixed(1);
    const savings = (((stat.size - newStat.size) / stat.size) * 100).toFixed(0);

    console.log(`[OK] ${path.relative(process.cwd(), filePath)}: ${origSize} KB -> ${newSize} KB (${savings}% saved)`);
  } catch (err) {
    console.error(`[ERR] ${filePath}:`, err.message);
  }
}

async function run() {
  console.log('--- Starting WebP Optimization ---');
  for (const dir of DIRS) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const fullPath = path.join(dir, f);
      if (fs.statSync(fullPath).isFile()) {
        await optimizeImage(fullPath);
      }
    }
  }
  console.log('--- Done Optimization ---');
}

run();
