import os from 'node:os';

// 系统信息
console.log(os.platform());  // 'darwin' | 'linux' | 'win32'
console.log(os.type());      // 'Darwin' | 'Linux' | 'Windows_NT'
console.log(os.release());   // 系统版本
console.log(os.arch());      // 'x64' | 'arm64'
console.log(os.hostname());  // 主机名

// 用户信息
console.log(os.homedir());   // 用户主目录
console.log(os.tmpdir());    // 临时目录
console.log(os.userInfo());  // 用户详细信息

// 内存
console.log(os.totalmem());  // 总内存（字节）
console.log(os.freemem());   // 空闲内存
console.log(os.freemem() / os.totalmem() * 100);   // 空闲内存占比

// CPU
console.log(os.cpus());      // CPU 核心信息数组
console.log(os.cpus().length); // CPU 核心数

// 网络接口
console.log(os.networkInterfaces());

// 行结尾符
console.log(os.EOL);  // '\n' (Unix) 或 '\r\n' (Windows)