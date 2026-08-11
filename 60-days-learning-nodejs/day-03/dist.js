import fs from 'node:fs/promises';

// 创建目录
await fs.mkdir('./dist');
// 递归创建
await fs.mkdir('./dist/assets/images', { recursive: true });

// 读取目录内容
const files = await fs.readdir('./src');
console.log(files); // ['index.js', 'utils.js', 'lib']

// 带文件类型信息
const entries = await fs.readdir('./src', { withFileTypes: true });
for (const entry of entries) {
  const type = entry.isDirectory() ? '📁' : '📄';
  console.log(`${type} ${entry.name}`);
}

// 复制文件
await fs.copyFile('./src/config.json', './dist/config.json');

// 删除目录
await fs.rm('./dist', { recursive: true, force: true });


// 监控文件变化
const watcher = fs.watch('./src', { recursive: true });
for await (const event of watcher) {
  console.log(`${event.eventType}: ${event.filename}`);
}