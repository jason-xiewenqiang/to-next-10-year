import fs from 'node:fs/promises';
import { existsSync } from 'node:fs'; // 同步检查用 fs.existsSync()


// ============ 检查文件是否存在 ============
// 注意：使用同步方法检查，因为异步 access 容易有竞态条件
if (existsSync('./config.json')) {
    console.log('配置文件存在');
} else {
    console.log('配置文件不存在');
}

// ============ 文件读取 ============

// 读取文本文件
const content = await fs.readFile('./config.json', 'utf-8');
const config = JSON.parse(content);
console.log(config);

// 读取二进制文件（不传 encoding 返回 Buffer）
const buffer = await fs.readFile('./image.png');
console.log(buffer.length); // 文件字节大小

// ============ 文件写入 ============

// 写入文件（覆盖）
await fs.writeFile('./output.txt', 'Hello World', 'utf-8');

// 追加内容
await fs.appendFile('./log.txt', `[${new Date().toISOString()}] 新日志\n`);

// ============ 文件信息 ============

const stats = await fs.stat('./package.json');
console.log(stats.isFile());      // true
console.log(stats.isDirectory()); // false
console.log(stats.size);          // 文件大小（字节）
console.log(stats.mtime);         // 最后修改时间

// ============ 文件删除/重命名 ============

await fs.rename('./old.txt', './new.txt');
await fs.unlink('./temp.txt');  // 删除文件
// 或使用 rm（Node.js v14.14+）
await fs.rm('./temp.txt', { force: true });
