import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimizeFolder(dir, maxW, maxH, quality) {
  let totalSaved = 0;
  let count = 0;
  if (!fs.existsSync(dir)) return { count, totalSaved };

  const entries = fs.readdirSync(dir);
  for (const file of entries) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) continue;
    if (!/\.webp$/i.test(file)) continue;

    const originalSize = fs.statSync(fullPath).size;
    if (originalSize < 120000) continue; // Skip images already under 120KB

    try {
      const inputBuffer = fs.readFileSync(fullPath);
      const outBuffer = await sharp(inputBuffer)
        .resize(maxW, maxH, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality, effort: 5 })
        .toBuffer();

      if (outBuffer.length < originalSize) {
        fs.writeFileSync(fullPath, outBuffer);
        const saved = originalSize - outBuffer.length;
        totalSaved += saved;
        count++;
        console.log(`[OPTIMIZED] ${file}: ${(originalSize / 1024).toFixed(0)}KB -> ${(outBuffer.length / 1024).toFixed(0)}KB (-${((saved / originalSize) * 100).toFixed(0)}%)`);
      }
    } catch (e) {
      console.error(`Error on ${file}:`, e.message);
    }
  }
  return { count, totalSaved };
}

async function main() {
  console.log('--- Optimizing History & Root Assets ---');
  const res1 = await optimizeFolder('src/assets', 1600, 1600, 84);

  console.log('--- Optimizing EVENTS ---');
  const res2 = await optimizeFolder('src/assets/EVENTS', 1000, 1000, 82);

  console.log('--- Optimizing Past Photos (3D Globe) ---');
  const res3 = await optimizeFolder('src/assets/pastphotos', 1000, 1000, 82);

  console.log('--- Optimizing Planets ---');
  const res4 = await optimizeFolder('src/assets/planets', 1024, 1024, 82);

  console.log('--- Optimizing Members ---');
  const res5 = await optimizeFolder('src/assets/members', 800, 800, 82);

  const totalSavedBytes = res1.totalSaved + res2.totalSaved + res3.totalSaved + res4.totalSaved + res5.totalSaved;
  const totalCount = res1.count + res2.count + res3.count + res4.count + res5.count;
  console.log(`\n========================================`);
  console.log(`COMPLETED: Optimized ${totalCount} images, saved ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB total!`);
  console.log(`========================================`);
}

main();
