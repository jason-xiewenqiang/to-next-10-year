/**
 * 数组工具（CommonJS）
 */

/**
 * 将数组按固定大小拆分为多个子数组。
 *
 * @param {Array} arr - 原始数组
 * @param {number} size - 每个子数组的长度，必须大于 0
 * @returns {Array[]} 拆分后的二维数组；入参非法时返回空数组
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
function chunk(arr, size) {
  if (!Array.isArray(arr) || size <= 0) return [];
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * 去除数组中的重复元素，保留首次出现的顺序。
 *
 * @param {Array} arr - 原始数组
 * @returns {Array} 去重后的新数组
 *
 * @example
 * unique([1, 2, 2, 3, 3, 3]) // [1, 2, 3]
 */
function unique(arr) {
  if (!Array.isArray(arr)) return [];
  return [...new Set(arr)];
}

/**
 * 随机打乱数组顺序（Fisher–Yates），不修改原数组。
 *
 * @param {Array} arr - 原始数组
 * @returns {Array} 打乱后的新数组
 *
 * @example
 * shuffle([1, 2, 3, 4, 5]) // 例如 [3, 1, 5, 2, 4]
 */
function shuffle(arr) {
  if (!Array.isArray(arr)) return [];
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

module.exports = { chunk, unique, shuffle };
