# Node.js 目录操作（dir 模块）

本节介绍使用 `fs` 模块处理目录（创建、读取、递归遍历、删除）的常见模式。

## 创建目录

```js
// 创建单层目录
await fs.mkdir('./output');

// 创建多层目录（类似 mkdir -p）
await fs.mkdir('./a/b/c', { recursive: true });
```

## 读取目录内容

```js
// 仅返回文件名列表
const names = await fs.readdir('./src');
// → ['index.js', 'utils', 'config.json']

// 返回 Dirent 对象，可判断类型
const entries = await fs.readdir('./src', { withFileTypes: true });
entries.forEach((entry) => {
  if (entry.isDirectory()) console.log(`DIR  ${entry.name}`);
  else                     console.log(`FILE ${entry.name}`);
});

// Node.js v20+ 内置递归
const all = await fs.readdir('./src', { recursive: true });
```

## 自定义递归遍历

```js
async function walkDir(dir) {
  const results = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walkDir(fullPath)));
    } else {
      results.push(fullPath);
    }
  }

  return results;
}
```

## 删除目录

```js
// 删除空目录
await fs.rmdir('./emptyDir');

// 删除非空目录（Node.js v14.14+）
await fs.rm('./dist', { recursive: true, force: true });
```
