/**
 * 练习 2：命令行计算器
 *
 * 编写一个 calc.js，支持通过命令行参数进行计算：
 *
 *   node calc.js add 3 5       # 输出: 8
 *   node calc.js subtract 10 3 # 输出: 7
 *   node calc.js multiply 4 6  # 输出: 24
 *   node calc.js divide 15 3   # 输出: 5
 *
 * 要求：
 *   - 使用 process.argv 解析参数
 *   - 处理除以零的错误
 *   - 处理无效操作符的错误
 *   - 使用不同的退出码来表示成功(0)和失败(1)
 */

const [, , op, aStr, bStr] = process.argv;

function fail(message) {
  console.error(`错误: ${message}`);
  console.error('用法: node practice-02-calc.js <add|subtract|multiply|divide> <数字> <数字>');
  process.exit(1);
}

if (!op || aStr === undefined || bStr === undefined) {
  fail('参数不足');
}

const a = Number(aStr);
const b = Number(bStr);

if (Number.isNaN(a) || Number.isNaN(b)) {
  fail('操作数必须是有效数字');
}

const operations = {
  add: (x, y) => x + y,
  subtract: (x, y) => x - y,
  multiply: (x, y) => x * y,
  divide: (x, y) => {
    if (y === 0) fail('除数不能为零');
    return x / y;
  },
};

if (!operations[op]) {
  fail(`无效操作符 "${op}"，支持: add | subtract | multiply | divide`);
}

const result = operations[op](a, b);
console.log(result);
process.exit(0);
