import { PRODUCTS } from '../src/data/products';
import fs from 'fs';

console.log('--- STARTING COMPREHENSIVE PRODUCT AUDIT ---');
console.log('Total Products:', PRODUCTS.length);

const auditResults: any[] = [];
const issues: string[] = [];

PRODUCTS.forEach((p, idx) => {
  const imgPath = 'public' + p.image;
  const imageExists = fs.existsSync(imgPath);
  const imgSize = imageExists ? fs.statSync(imgPath).size : 0;

  if (!imageExists) {
    issues.push(`${p.name}: Missing image file at ${imgPath}`);
  } else if (imgSize < 1000) {
    issues.push(`${p.name}: Suspicious small image size (${imgSize} bytes)`);
  }

  if (!p.description || p.description.length < 30) {
    issues.push(`${p.name}: Description too short or missing`);
  }

  if (!p.regionalOrigin) {
    issues.push(`${p.name}: Missing regional origin`);
  }

  if (!p.purityBadge) {
    issues.push(`${p.name}: Missing purity badge`);
  }

  if (!p.ingredients || p.ingredients.length === 0) {
    issues.push(`${p.name}: Empty ingredients list`);
  }

  if (!p.packs || p.packs.length === 0) {
    issues.push(`${p.name}: No pack sizes`);
  } else {
    p.packs.forEach((pk) => {
      if (!pk.size || typeof pk.price !== 'number' || pk.price <= 0) {
        issues.push(`${p.name}: Invalid pack size/price ${JSON.stringify(pk)}`);
      }
    });
  }

  auditResults.push({
    index: idx + 1,
    name: p.name,
    slug: p.slug,
    category: p.category,
    origin: p.regionalOrigin,
    packsCount: p.packs.length,
    startingPrice: p.packs[0]?.price,
    ingredientsCount: p.ingredients.length,
    image: p.image,
    imgBytes: imgSize,
    purity: p.purityBadge,
  });
});

console.log('Issues found:', issues.length);
if (issues.length > 0) {
  console.error('ISSUES:', issues);
} else {
  console.log('ALL 27 PRODUCTS FULLY VALIDATED!');
  console.table(auditResults);
}
