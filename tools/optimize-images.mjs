import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';

const dirs = ['public/assets/menu', 'public/assets/gallery', 'public/assets/pics'];
let totalBefore = 0;
let totalAfter = 0;
let converted = 0;

for (const dir of dirs) {
  const files = await readdir(dir);
  for (const file of files) {
    if (!/\.(png|jpe?g)$/i.test(file)) continue;
    const srcPath = path.join(dir, file);
    const destPath = srcPath.replace(/\.(png|jpe?g)$/i, '.webp');
    const isLogo = file.toLowerCase() === 'logo.png';

    const before = (await stat(srcPath)).size;
    await sharp(srcPath)
      .webp(isLogo ? { quality: 92, effort: 6 } : { quality: 82, effort: 6 })
      .toFile(destPath);
    const after = (await stat(destPath)).size;

    if (after >= before) {
      await unlink(destPath);
      console.log(`${srcPath}: kept original (webp was not smaller: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB)`);
      continue;
    }

    totalBefore += before;
    totalAfter += after;
    converted += 1;
    await unlink(srcPath);
    console.log(`${srcPath} -> ${destPath}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (${(100 - (after / before) * 100).toFixed(0)}% smaller)`);
  }
}

if (converted) {
  console.log(`\nConverted ${converted} file(s): ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB (${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}% smaller)`);
} else {
  console.log('\nNothing to convert — all images are already optimized.');
}

console.log('\nRemember to update any src/content.js or src/main.js references from the old extension to .webp.');
