/**
 * 练习 3：Markdown 文档索引生成器
 *
 * 编写一个脚本，扫描指定目录中所有 .md 文件，生成一个目录索引文件：
 *   node practice-03-md-reader.js ./docs
 *
 * 要求：
 *   - 递归扫描所有 .md 文件
 *   - 提取每个文件的一级标题（# Title）
 *   - 按目录结构生成带链接的索引
 *   - 输出为 INDEX.md
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const [, , targetArg] = process.argv;

function fail(message) {
  console.error(`错误: ${message}`);
  console.error('用法: node practice-03-md-reader.js <目录路径>');
  process.exit(1);
}

if (!targetArg) fail('请指定目录路径');

const targetDir = path.resolve(targetArg);
const indexPath = path.join(targetDir, 'INDEX.md');

/**
 * 读取 markdown 文件，提取一级标题（仅匹配 "# Title"，不匹配 "##" 等）
 * @param {string} absPath - 文件绝对路径
 * @returns {Promise<string>} 一级标题；没有一级标题则返回文件名（不含扩展名）
 */
async function extractTitle(absPath) {
  const content = await fs.readFile(absPath, 'utf8');

  // ^#(?!#) 表示以单 # 开头且后面不是另一个 #（避免匹配 ## / ###）
  const match = content.match(/^#(?!#)\s*(.+)\s*$/m);
  if (match?.[1]) return match[1].trim();

  return path.basename(absPath, path.extname(absPath));
}

async function walkDir(dirPath, out = []) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await walkDir(abs, out);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      out.push(abs);
    }
  }
  return out;
}

function createTreeNode() {
  return { dirs: {}, files: [] };
}

// 以目录层级构建树：{ dirs: { [name]: node }, files: [{ relPath, title }] }
function insertIntoTree(tree, relPath, title) {
  const parts = relPath.split(path.sep);
  let node = tree;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const isLast = i === parts.length - 1;
    if (isLast) {
      node.files.push({ relPath, title });
    } else {
      node.dirs[part] ||= createTreeNode();
      node = node.dirs[part];
    }
  }
}

function renderTree(tree, level = 0) {
  const indent = '  '.repeat(level);
  const lines = [];

  const dirNames = Object.keys(tree.dirs).sort((a, b) => a.localeCompare(b));
  const fileItems = tree.files.sort((a, b) => a.title.localeCompare(b.title));

  for (const file of fileItems) {
    const link = `./${file.relPath.replaceAll(path.sep, '/')}`;
    lines.push(`${indent}- [${file.title}](${link})`);
  }

  for (const dirName of dirNames) {
    lines.push(`${indent}- **${dirName}/**`);
    lines.push(...renderTree(tree.dirs[dirName], level + 1));
  }

  return lines;
}

async function main() {
  const stat = await fs.stat(targetDir).catch(() => null);
  if (!stat || !stat.isDirectory()) fail(`不是目录: ${targetDir}`);

  const mdFiles = await walkDir(targetDir);
  const tree = createTreeNode();

  let indexedCount = 0;
  for (const absPath of mdFiles) {
    const relPath = path.relative(targetDir, absPath);
    if (relPath === 'INDEX.md') continue; // 跳过自身

    const title = await extractTitle(absPath);
    insertIntoTree(tree, relPath, title);
    indexedCount += 1;
  }

  const header = `# 目录索引\n\n已收录 ${indexedCount} 个 .md 文件。\n\n`;
  const bodyLines = renderTree(tree);
  const body = bodyLines.length ? bodyLines.join('\n') + '\n' : '_（无）_\n';

  await fs.writeFile(indexPath, header + body, 'utf8');
  console.log(`已生成: ${indexPath}`);
}

main().catch((err) => fail(err?.message || String(err)));