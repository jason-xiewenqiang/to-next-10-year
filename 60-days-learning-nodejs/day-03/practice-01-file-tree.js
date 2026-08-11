/**
 * 练习 1：目录树生成器
 *
 * 实现一个 tree.js 命令行工具，类似 Unix 的 tree 命令：
 *
 *   node practice-01-file-tree.js ./src
 *
 * 输出示例:
 *   src/
 *   ├── index.js
 *   ├── utils/
 *   │   ├── string.js
 *   │   └── array.js
 *   └── config.json
 *
 *   2 directories, 3 files
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const [, , targetArg] = process.argv;

function fail(message) {
  console.error(`错误: ${message}`);
  console.error('用法: node practice-01-file-tree.js <目录路径>');
  process.exit(1);
}

if (!targetArg) {
  fail('请指定目录路径');
}

const targetDir = path.resolve(targetArg);

/**
 * 生成并打印目录树。
 *
 * @param {string} dirPath - 目标目录的绝对路径
 */
async function printTree(dirPath) {
  let dirCount = 0;
  let fileCount = 0;

  const stat = await fs.stat(dirPath).catch(() => null);
  if (!stat) {
    fail(`目录不存在: ${dirPath}`);
  }
  if (!stat.isDirectory()) {
    fail(`不是目录: ${dirPath}`);
  }

  console.log(`${path.basename(dirPath)}/`);

  /**
   * 递归遍历并打印子项。
   *
   * @param {string} currentDir - 当前目录
   * @param {string} prefix - 行前缀（缩进与连接线）
   */
  async function walk(currentDir, prefix = '') {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    entries.sort((a, b) => {
      const aIsDir = a.isDirectory();
      const bIsDir = b.isDirectory();
      if (aIsDir !== bIsDir) return aIsDir ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const isLast = i === entries.length - 1;
      const connector = isLast ? '└── ' : '├── ';
      const childPrefix = prefix + (isLast ? '    ' : '│   ');
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        dirCount++;
        console.log(`${prefix}${connector}${entry.name}/`);
        await walk(fullPath, childPrefix);
      } else {
        fileCount++;
        console.log(`${prefix}${connector}${entry.name}`);
      }
    }
  }

  await walk(dirPath);
  console.log(`\n${dirCount} directories, ${fileCount} files`);
}

await printTree(targetDir);
