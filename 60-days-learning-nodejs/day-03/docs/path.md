# Node.js 路径处理（path 模块）

`path` 模块提供跨平台的文件路径处理工具，是文件操作的基础依赖。

## 引入方式

```js
import path from 'node:path';
```

## 核心 API

| API | 说明 | 示例 |
| --- | --- | --- |
| `path.join(...parts)` | 拼接路径片段 | `path.join('src', 'index.js')` → `src/index.js` |
| `path.resolve(...parts)` | 解析为绝对路径 | `path.resolve('src', 'app.js')` |
| `path.dirname(p)` | 获取目录部分 | `'/home/user/file.txt'` → `'/home/user'` |
| `path.basename(p, ext?)` | 获取文件名 | `'report.pdf'` 或 `'report'` |
| `path.extname(p)` | 获取扩展名 | `'.pdf'` |
| `path.parse(p)` | 解析路径为对象 | `{ root, dir, base, ext, name }` |
| `path.relative(from, to)` | 计算相对路径 | `'../dist/bundle.js'` |
| `path.normalize(p)` | 规范化路径 | 消除 `..` / `//` 等 |

## 使用示例

```js
const filePath = path.join('/home', 'user', 'docs', 'file.txt');
// → /home/user/docs/file.txt

const rel = path.relative('/data/src', '/data/dist/bundle.js');
// → ../dist/bundle.js
```

## ESM 中获取 `__dirname`

ESM 模块中没有 `__dirname`，需要手动构建：

```js
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
```
