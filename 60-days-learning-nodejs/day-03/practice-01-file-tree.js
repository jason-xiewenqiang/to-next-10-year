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
 * 
 * 要求：
 *   - 递归遍历指定目录
 *   - 使用 ├── 和 └── 字符绘制树形结构
 *   - 统计文件和目录数量
 *   - 支持 --depth=N 参数限制深度
 *   - 忽略 node_modules 和 .git 目录
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);
const targetArg = args.find((arg) => !arg.startsWith('--'));
const depthArg = args.find((arg) => arg.startsWith('--depth='));
const maxDepth = depthArg ? Number(depthArg.split('=')[1]) : Infinity;
const IGNORED_DIRS = new Set(['node_modules', '.git']);

function fail(message) {
  console.error(`错误: ${message}`);
  console.error('用法: node practice-01-file-tree.js <目录路径> [--depth=N]');
  process.exit(1);
}

if (!targetArg) {
  fail('请指定目录路径');
}
if (depthArg && (!Number.isInteger(maxDepth) || maxDepth < 0)) {
  fail('参数 --depth 必须是大于等于 0 的整数');
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
  async function walk(currentDir, prefix = '', currentDepth = 0) {
    if (currentDepth >= maxDepth) {
      return;
    }

    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    const visibleEntries = entries.filter(
      (entry) => !(entry.isDirectory() && IGNORED_DIRS.has(entry.name))
    );

    visibleEntries.sort((a, b) => {
      const aIsDir = a.isDirectory();
      const bIsDir = b.isDirectory();
      if (aIsDir !== bIsDir) return aIsDir ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    for (let i = 0; i < visibleEntries.length; i++) {
      const entry = visibleEntries[i];
      const isLast = i === visibleEntries.length - 1;
      const connector = isLast ? '└── ' : '├── ';
      const childPrefix = prefix + (isLast ? '    ' : '│   ');
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        dirCount++;
        console.log(`${prefix}${connector}${entry.name}/`);
        await walk(fullPath, childPrefix, currentDepth + 1);
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
