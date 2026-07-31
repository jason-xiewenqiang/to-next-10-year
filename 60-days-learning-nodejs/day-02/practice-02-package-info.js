/**
 * 练习 2：依赖分析器
 *
 * 编写一个 deps-analyzer.js 脚本：
 *   - 读取指定目录（或当前目录）的 package.json
 *   - 列出所有 dependencies 和 devDependencies
 *   - 按字母排序显示
 *   - 检查是否有 package-lock.json 或 pnpm-lock.yaml
 *   - 输出统计信息（总依赖数量等）
 *
 * 用法：
 *   node practice-02-package-info.js
 *   node practice-02-package-info.js ../some-project
 *   node practice-02-package-info.js D:\path\to\project
 */

const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(process.argv[2] || process.cwd());
const pkgPath = path.join(targetDir, 'package.json');

function fail(message) {
  console.error(`错误: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(pkgPath)) {
  fail(`未找到 package.json\n路径: ${pkgPath}`);
}

let pkg;
try {
  pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
} catch (err) {
  fail(`无法解析 package.json: ${err.message}`);
}

const dependencies = pkg.dependencies || {};
const devDependencies = pkg.devDependencies || {};

const depNames = Object.keys(dependencies).sort((a, b) => a.localeCompare(b));
const devDepNames = Object.keys(devDependencies).sort((a, b) => a.localeCompare(b));

const hasNpmLock = fs.existsSync(path.join(targetDir, 'package-lock.json'));
const hasPnpmLock = fs.existsSync(path.join(targetDir, 'pnpm-lock.yaml'));
const hasYarnLock = fs.existsSync(path.join(targetDir, 'yarn.lock'));

const divider = '─'.repeat(48);

function printDeps(title, names, deps) {
  console.log(`\n${title} (${names.length})`);
  console.log(divider);
  if (names.length === 0) {
    console.log('  （无）');
    return;
  }
  for (const name of names) {
    console.log(`  ${name.padEnd(32)} ${deps[name]}`);
  }
}

console.log(`\n${divider}`);
console.log('  📦 依赖分析器');
console.log(divider);
console.log(`  项目目录   : ${targetDir}`);
console.log(`  包名       : ${pkg.name || '（未命名）'}`);
console.log(`  版本       : ${pkg.version || '（未知）'}`);

printDeps('dependencies', depNames, dependencies);
printDeps('devDependencies', devDepNames, devDependencies);

console.log(`\n锁文件`);
console.log(divider);
console.log(`  package-lock.json : ${hasNpmLock ? '✅ 存在' : '❌ 不存在'}`);
console.log(`  pnpm-lock.yaml    : ${hasPnpmLock ? '✅ 存在' : '❌ 不存在'}`);
console.log(`  yarn.lock         : ${hasYarnLock ? '✅ 存在' : '❌ 不存在'}`);

const total = depNames.length + devDepNames.length;
console.log(`\n统计信息`);
console.log(divider);
console.log(`  生产依赖     : ${depNames.length}`);
console.log(`  开发依赖     : ${devDepNames.length}`);
console.log(`  合计         : ${total}`);
console.log(`${divider}\n`);
