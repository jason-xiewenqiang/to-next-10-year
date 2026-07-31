# 模块系统

Node.js 支持两种模块系统：

| 特性 | CommonJS (CJS) | ESModule (ESM) |
| --- | --- | --- |
| 语法 | `require()` / `module.exports` | `import` / `export` |
| 加载时机 | 运行时（同步） | 编译时（静态分析） |
| 历史 | Node.js 原生支持 | ES2015 标准，Node.js v12+ 支持 |
| Tree Shaking | ❌ 不支持 | ✅ 支持 |
| 循环依赖 | 返回部分导出 | 返回引用（live binding） |
| Top-level await | ❌ 不支持 | ✅ 支持 |

## CommonJS 示例

```js
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// main.js
const { add } = require('./math');
console.log(add(1, 2)); // 3
```

## ESModule 示例

```js
// math.mjs 或 package.json 中 "type": "module"
export function add(a, b) {
  return a + b;
}

// main.mjs
import { add } from './math.mjs';
console.log(add(1, 2)); // 3
```

## 如何启用 ESM

1. 文件使用 `.mjs` 扩展名
2. 或在 `package.json` 中设置 `"type": "module"`（此时 `.js` 默认按 ESM 解析，CJS 可用 `.cjs`）

## ESM 中获取 __filename 和 __dirname

```js

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(__filename);  // /Users/you/project/app.js
console.log(__dirname);   // /Users/you/project

```

## package.json 详解

[CSDN-package.json](https://arrow.blog.csdn.net/article/details/132541079)

## 常用命令

```bash

# 初始化项目
npm init -y               # 快速初始化
pnpm init                 # pnpm 初始化

# 安装依赖
pnpm add express          # 生产依赖
pnpm add -D typescript    # 开发依赖
pnpm add -g nodemon       # 全局安装

# 删除依赖
pnpm remove express

# 安装项目所有依赖
pnpm install              # 或 pnpm i

# 运行脚本
pnpm run dev
pnpm start                # start/test 不需要 run

# 检查过时的依赖
pnpm outdated

# 查看依赖树
pnpm list --depth=0


```

## 模块解析算法

```js

require('./math')    → 相对路径，查找当前目录下的 math.js / math/index.js
require('express')   → 非相对路径，按以下顺序查找：
  1. Node.js 内置模块（fs, path, http...）
  2. node_modules/express （当前目录）
  3. ../node_modules/express（父目录）
  4. ../../node_modules/express（继续向上）
  5. ... 直到根目录

```