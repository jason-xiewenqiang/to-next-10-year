# Node.js 文件系统（fs 模块）

Node.js 的 `fs` 模块提供与文件系统交互的 API，分为同步、异步回调和 Promise 三种风格。

## 引入方式

```js
// Promise 风格（推荐）
import fs from 'node:fs/promises';

// 同步方法单独引入
import { existsSync } from 'node:fs';
```

## 常用 API

| API | 说明 |
| --- | --- |
| `fs.readFile(path, encoding)` | 读取文件内容 |
| `fs.writeFile(path, data)` | 写入文件（覆盖） |
| `fs.appendFile(path, data)` | 追加内容到文件 |
| `fs.copyFile(src, dest)` | 复制文件 |
| `fs.rename(oldPath, newPath)` | 重命名/移动文件 |
| `fs.unlink(path)` | 删除文件 |
| `fs.rm(path, options)` | 删除文件或目录（v14.14+） |
| `fs.stat(path)` | 获取文件/目录信息 |
| `fs.mkdir(path, options)` | 创建目录 |
| `fs.readdir(path, options)` | 列出目录内容 |
| `existsSync(path)` | 同步检查路径是否存在 |

## 读取文件

```js
const content = await fs.readFile('./config.json', 'utf-8');
```

## 写入文件

```js
await fs.writeFile('./output.txt', 'Hello World', 'utf-8');
await fs.appendFile('./log.txt', `[${new Date().toISOString()}] 新日志\n`);
```

## 文件信息

```js
const stats = await fs.stat('./package.json');
console.log(stats.isFile());      // true
console.log(stats.size);          // 文件字节大小
console.log(stats.mtime);         // 最后修改时间
```

## 注意事项

- 使用 `readFile` + `try/catch(ENOENT)` 比先 `existsSync` 再读取更安全，少一次 I/O 且不存在竞态窗口。
- `existsSync` 来自 `node:fs`，**不在** `node:fs/promises` 中。
