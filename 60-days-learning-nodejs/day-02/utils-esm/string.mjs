/**
 * 字符串工具（ESModule）
 */

/**
 * 将字符串首字母转为大写，其余部分保持不变。
 *
 * @param {string} str - 原始字符串
 * @returns {string} 首字母大写后的字符串；入参非法或为空时返回空字符串
 *
 * @example
 * capitalize('hello') // 'Hello'
 */
export function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 将字符串截断到指定长度，超出部分用 `...` 代替。
 *
 * @param {string} str - 原始字符串
 * @param {number} length - 保留的最大字符数（不含省略号）
 * @returns {string} 截断后的字符串；未超长则返回原字符串
 *
 * @example
 * truncate('Node.js is awesome', 8) // 'Node.js ...'
 */
export function truncate(str, length) {
  if (typeof str !== 'string') return '';
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * 将字符串转为 URL 友好的 slug（小写、连字符分隔）。
 * 会去除首尾空白，把空格/下划线换成 `-`，并去掉特殊符号。
 *
 * @param {string} str - 原始字符串
 * @returns {string} slug 字符串
 *
 * @example
 * slugify('Hello World! Node.js') // 'hello-world-nodejs'
 */
export function slugify(str) {
  if (typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
