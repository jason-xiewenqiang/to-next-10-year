/**
 * 日期工具（CommonJS）
 */

/**
 * 将日期格式化为 `YYYY-MM-DD HH:mm:ss`。
 *
 * @param {Date|string|number} date - Date 对象、可解析的日期字符串，或时间戳
 * @returns {string} 格式化后的日期字符串；无效日期返回空字符串
 *
 * @example
 * formatDate(new Date('2026-07-31T14:30:00')) // '2026-07-31 14:30:00'
 */
function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '';

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

/**
 * 计算给定时间相对当前的「多久以前」文案。
 *
 * @param {Date|string|number} date - Date 对象、可解析的日期字符串，或时间戳
 * @returns {string} 相对时间描述，如 `2 小时前`；未来时间返回 `未来`；无效日期返回空字符串
 *
 * @example
 * timeAgo(new Date(Date.now() - 120000)) // '2 分钟前'
 */
function timeAgo(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '';

  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

  if (seconds < 0) return '未来';
  if (seconds < 60) return `${seconds} 秒前`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} 分钟前`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} 小时前`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)} 天前`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} 个月前`;
  return `${Math.floor(seconds / 31536000)} 年前`;
}

/**
 * 判断给定日期是否为周末（周六或周日）。
 *
 * @param {Date|string|number} date - Date 对象、可解析的日期字符串，或时间戳
 * @returns {boolean} 是周末返回 `true`，否则 `false`；无效日期返回 `false`
 *
 * @example
 * isWeekend(new Date('2026-08-01')) // true（周六）
 */
function isWeekend(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return false;
  const day = d.getDay();
  return day === 0 || day === 6;
}

module.exports = { formatDate, timeAgo, isWeekend };
