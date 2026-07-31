/**
 * utils 统一导出（CommonJS）
 *
 * 汇总 string / array / date 模块的全部工具函数，便于一次引入：
 *   const { capitalize, chunk, formatDate } = require('./utils');
 *
 * 导出列表：
 *   - string: capitalize, truncate, slugify
 *   - array:  chunk, unique, shuffle
 *   - date:   formatDate, timeAgo, isWeekend
 */

const string = require('./string');
const array = require('./array');
const date = require('./date');

module.exports = {
  ...string,
  ...array,
  ...date,
};
