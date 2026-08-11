# Node.js 操作系统信息（os 模块）

`os` 模块提供与操作系统交互的实用函数，常用于系统信息收集和平台兼容处理。

## 引入方式

```js
import os from 'node:os';
```

## 常用 API

| API | 说明 | 示例 |
| --- | --- | --- |
| `os.platform()` | 操作系统平台 | `'win32'` / `'linux'` / `'darwin'` |
| `os.type()` | 操作系统名称 | `'Windows_NT'` / `'Linux'` |
| `os.release()` | 操作系统版本号 | `'10.0.22621'` |
| `os.arch()` | CPU 架构 | `'x64'` / `'arm64'` |
| `os.cpus()` | CPU 核心信息数组 | `[{ model, speed, times }]` |
| `os.totalmem()` | 总内存（字节） | `17179869184` |
| `os.freemem()` | 可用内存（字节） | |
| `os.homedir()` | 当前用户主目录 | `'/Users/me'` |
| `os.tmpdir()` | 临时文件目录 | `'/tmp'` |
| `os.hostname()` | 主机名 | |
| `os.uptime()` | 系统运行时间（秒）| |
| `os.EOL` | 行尾符 | `'\r\n'`（Win）/ `'\n'`（Unix）|

## 使用示例

```js
import os from 'node:os';

console.log(`${os.type()} ${os.release()} (${os.platform()})`);
console.log(`CPU: ${os.arch()}, ${os.cpus().length} 核`);
console.log(`内存: ${(os.totalmem() / 1024 ** 3).toFixed(1)} GB`);
console.log(`主目录: ${os.homedir()}`);
```

## 跨平台路径分隔符

```js
import path from 'node:path';

// Windows: \   Unix: /
console.log(path.sep);

// 推荐用 path.join 拼接，避免硬编码分隔符
const p = path.join('src', 'utils', 'index.js');
```
