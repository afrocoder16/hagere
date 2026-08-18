import { readFile } from 'node:fs/promises';

const menuUrl = new URL('../src/data/menu.json', import.meta.url);
const menu = JSON.parse(await readFile(menuUrl, 'utf8'));
const requiredFields = ['id', 'name', 'description', 'category', 'available'];
const invalid = menu.filter((item) => requiredFields.some((field) => item[field] === undefined));

if (invalid.length) {
  throw new Error(`Hagere menu validation failed for ${invalid.length} item(s).`);
}

const categories = [...new Set(menu.map((item) => item.category))];
console.log(`Validated ${menu.length} Hagere menu items across ${categories.length} categories.`);
console.log('Menu source: printed Hagere menu photographs. Update src/data/menu.json manually when the restaurant confirms changes.');
