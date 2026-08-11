import path from 'node:path';

const filePath = path.join('/users', 'user1', 'documents', 'file.txt');
console.log(filePath);

const index = path.resolve('src', 'index.js');
console.log(index);

// 获取路径各部分
const filePath1 = '/home/user/documents/report.pdf';
path.dirname(filePath1);   // '/home/user/documents'
path.basename(filePath1);  // 'report.pdf'
path.basename(filePath1, '.pdf'); // 'report'
path.extname(filePath1);   // '.pdf'
console.log(path.dirname(filePath1));
console.log(path.basename(filePath1));
console.log(path.basename(filePath1, '.pdf'));
console.log(path.extname(filePath1));

const parser = path.parse('/home/user/file.txt');
console.log(parser);

// 相对路径
console.log(path.relative('/data/src', '/data/dist/bundle.js'));
// → '../dist/bundle.js'

// 标准化路径
path.normalize('/users//john/../jane/./docs');
// → '/users/jane/docs'
console.log(path.normalize('/users//john/../jane/./docs'));