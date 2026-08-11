import fs from 'node:fs/promises';
import path from 'node:path';

const divider = '─'.repeat(40);

// 方式一：Node.js v20+ 内置递归
const allFiles = await fs.readdir('./src', { recursive: true });
console.log(allFiles);
console.log(divider);

// 方式二：自定义递归遍历（更灵活）
async function walkDir(dir) {
  const results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subFiles = await walkDir(fullPath);
      results.push(...subFiles);
    } else {
      results.push(fullPath);
    }
  }

  return results;
}

const files = await walkDir('./src');
files.forEach((f) => console.log(f));