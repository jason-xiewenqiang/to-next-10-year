/**
 * 练习 2：文件拷贝工具
 * 实现一个 file-copy.js，支持：
 *
 * # 复制文件
 * node practice-02-copy-file.js ./src/index.js ./dist/index.js
 *
 * # 复制目录（递归）
 * node practice-02-copy-file.js ./src ./dist
 *
 * 要求：
 * - 自动创建目标目录（如果不存在）
 * - 如果目标已存在，提示用户确认是否覆盖
 * - 显示复制进度和耗时
 * - 正确处理错误（源文件不存在、权限不足等）
 */

const fs = require('node:fs/promises');
const fssync = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const [, , srcArg, destArg] = process.argv;

function fail(message) {
  console.error(`错误: ${message}`);
  console.error('用法: node practice-02-copy-file.js <源路径> <目标路径>');
  process.exit(1);
}

function formatMs(ms) {
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(2)} s`;
}

async function ensureParentDir(filePath) {
  const parent = path.dirname(filePath);
  await fs.mkdir(parent, { recursive: true });
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function askOverwrite(targetPath) {
  if (!fssync.isTTY || !stdin.isTTY || !stdout.isTTY) {
    return false;
  }

  const rl = readline.createInterface({ input: stdin, output: stdout });
  try {
    const answer = await rl.question(`目标已存在，是否覆盖？(y/N)\n${targetPath}\n> `);
    return /^y(es)?$/i.test(answer.trim());
  } finally {
    rl.close();
  }
}

async function collectFileList(sourcePath) {
  const stat = await fs.stat(sourcePath);
  if (stat.isFile()) {
    return [sourcePath];
  }

  if (!stat.isDirectory()) {
    fail(`不支持的源类型: ${sourcePath}`);
  }

  const files = [];
  async function walk(current) {
    const entries = await fs.readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }
  }

  await walk(sourcePath);
  return files;
}

if (!srcArg || !destArg) {
  fail('请提供源路径和目标路径');
}

const sourcePath = path.resolve(srcArg);
const targetPath = path.resolve(destArg);
const startedAt = Date.now();

async function main() {
  const sourceExists = await pathExists(sourcePath);
  if (!sourceExists) {
    fail(`源路径不存在: ${sourcePath}`);
  }

  const sourceStat = await fs.stat(sourcePath);

  if (await pathExists(targetPath)) {
    const ok = await askOverwrite(targetPath);
    if (!ok) {
      console.log('已取消复制。');
      process.exit(1);
    }
    await fs.rm(targetPath, { recursive: true, force: true });
  }

  const fileList = await collectFileList(sourcePath);
  const totalFiles = fileList.length;
  let copiedFiles = 0;
  let copiedBytes = 0;

  if (sourceStat.isFile()) {
    await ensureParentDir(targetPath);
    await fs.copyFile(sourcePath, targetPath);
    const st = await fs.stat(sourcePath);
    copiedFiles = 1;
    copiedBytes = st.size;
    console.log(`[1/1] ${path.basename(sourcePath)} -> ${targetPath}`);
  } else {
    await fs.mkdir(targetPath, { recursive: true });
    for (const srcFile of fileList) {
      const relPath = path.relative(sourcePath, srcFile);
      const destFile = path.join(targetPath, relPath);
      await ensureParentDir(destFile);
      await fs.copyFile(srcFile, destFile);
      const st = await fs.stat(srcFile);
      copiedFiles += 1;
      copiedBytes += st.size;
      console.log(`[${copiedFiles}/${totalFiles}] ${relPath}`);
    }
  }

  const elapsed = Date.now() - startedAt;
  console.log('\n复制完成');
  console.log(`文件数量: ${copiedFiles}`);
  console.log(`总大小: ${copiedBytes} bytes`);
  console.log(`耗时: ${formatMs(elapsed)}`);
}

main().catch((err) => {
  if (err && err.code === 'ENOENT') {
    fail('文件或目录不存在');
  }
  if (err && err.code === 'EACCES') {
    fail('权限不足，无法访问文件或目录');
  }
  if (err && err.code === 'EPERM') {
    fail('操作被系统拒绝，请检查权限');
  }
  fail(err?.message || String(err));
});