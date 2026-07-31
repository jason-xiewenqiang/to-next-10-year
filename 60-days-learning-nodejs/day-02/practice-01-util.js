/**
 * 练习 1：模块化工具库
 *
 * 创建一个 utils 工具库，包含以下模块：
 *
 *   utils/
 *     ├── index.js          # 统一导出
 *     ├── string.js         # 字符串工具
 *     ├── array.js          # 数组工具
 *     └── date.js           # 日期工具
 *
 * 要求：
 *   - string.js：实现 capitalize(str) / truncate(str, length) / slugify(str)
 *   - array.js：实现 chunk(arr, size) / unique(arr) / shuffle(arr)
 *   - date.js：实现 formatDate(date) / timeAgo(date) / isWeekend(date)
 *   - 分别用 CJS 和 ESM 两种方式实现
 *   - index.js 统一导出所有工具函数
 *
 * 目录：
 *   utils/      → CommonJS
 *   utils-esm/  → ESModule（.mjs）
 *
 * 运行：
 *   node practice-01-util.js
 *   node practice-01-util.mjs
 */

const {
  capitalize,
  truncate,
  slugify,
  chunk,
  unique,
  shuffle,
  formatDate,
  timeAgo,
  isWeekend,
} = require('./utils');

console.log('=== CommonJS utils 演示 ===\n');

console.log('capitalize:', capitalize('hello world'));
console.log('truncate:', truncate('Node.js is awesome', 8));
console.log('slugify:', slugify('Hello World! Node.js'));

console.log('chunk:', chunk([1, 2, 3, 4, 5], 2));
console.log('unique:', unique([1, 2, 2, 3, 3, 3]));
console.log('shuffle:', shuffle([1, 2, 3, 4, 5]));

const past = new Date(Date.now() - 2 * 60 * 60 * 1000);
console.log('formatDate:', formatDate(new Date()));
console.log('timeAgo:', timeAgo(past));
console.log('isWeekend:', isWeekend(new Date()));
