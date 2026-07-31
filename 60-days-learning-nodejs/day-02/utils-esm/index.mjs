/**
 * utils 统一导出（ESModule）
 *
 * 汇总 string / array / date 模块的全部工具函数，便于一次引入：
 *   import { capitalize, chunk, formatDate } from './utils-esm/index.mjs';
 *
 * 导出列表：
 *   - string: capitalize, truncate, slugify
 *   - array:  chunk, unique, shuffle
 *   - date:   formatDate, timeAgo, isWeekend
 */

export { capitalize, truncate, slugify } from './string.mjs';
export { chunk, unique, shuffle } from './array.mjs';
export { formatDate, timeAgo, isWeekend } from './date.mjs';
