/**
 * 练习 1：模块化工具库（ESM 演示）
 *
 * 运行: node practice-01-util.mjs
 */

import {
  capitalize,
  truncate,
  slugify,
  chunk,
  unique,
  shuffle,
  formatDate,
  timeAgo,
  isWeekend,
} from './utils-esm/index.mjs';

console.log('=== ESModule utils 演示 ===\n');

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
