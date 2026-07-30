/**
 * 练习 1：系统信息收集器
 *
 * 编写一个 system-info 脚本，收集并美化输出以下系统信息：
 *   - Node.js 版本
 *   - 操作系统类型和版本
 *   - CPU 架构
 *   - 当前用户主目录
 *   - 当前工作目录
 *   - 内存使用情况（格式化为 MB）
 *   - 进程运行时间
 *
 * 提示：使用 process 对象和 os 模块（const os = require('os') 或 import os from 'os'）。
 */

const os = require('os');

function bytesToMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}

function formatUptime(seconds) {
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)} ms`;
  if (seconds < 60) return `${seconds.toFixed(2)} s`;
  const mins = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(2);
  return `${mins} m ${secs} s`;
}

const mem = process.memoryUsage();
const divider = '─'.repeat(40);

console.log(`\n${divider}`);
console.log('  📋 系统信息收集器');
console.log(divider);
console.log(`  Node.js 版本     : ${process.version}`);
console.log(`  操作系统         : ${os.type()} ${os.release()} (${os.platform()})`);
console.log(`  CPU 架构         : ${process.arch}`);
console.log(`  用户主目录       : ${os.homedir()}`);
console.log(`  当前工作目录     : ${process.cwd()}`);
console.log(divider);
console.log('  内存使用情况');
console.log(`    RSS            : ${bytesToMB(mem.rss)} MB`);
console.log(`    Heap Total     : ${bytesToMB(mem.heapTotal)} MB`);
console.log(`    Heap Used      : ${bytesToMB(mem.heapUsed)} MB`);
console.log(`    External       : ${bytesToMB(mem.external)} MB`);
console.log(divider);
console.log(`  进程运行时间     : ${formatUptime(process.uptime())}`);
console.log(`${divider}\n`);

/**
 * 运行: node practice-01-system-info.js
 *
 * 示例输出：
 *
 * ────────────────────────────────────────
 *   📋 系统信息收集器
 * ────────────────────────────────────────
 *   Node.js 版本     : v22.22.0
 *   操作系统         : Windows_NT 10.0.22621 (win32)
 *   CPU 架构         : x64
 *   用户主目录       : C:\Users\...
 *   当前工作目录     : D:\to-next-10-year\60-days-learning-nodejs\day-01
 * ────────────────────────────────────────
 *   内存使用情况
 *     RSS            : 48.67 MB
 *     Heap Total     : 5.34 MB
 *     Heap Used      : 3.74 MB
 *     External       : 1.23 MB
 * ────────────────────────────────────────
 *   进程运行时间     : 23 ms
 * ────────────────────────────────────────
 */
