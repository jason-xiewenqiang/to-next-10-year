// process-demo.js

// 1. 环境变量
console.log('HOME:', process.env.HOME);
console.log('PATH:', process.env.PATH);

// 2. 命令行参数
// 运行: node process-demo.js --name=Node --version=20
console.log('argv:', process.argv);
// argv[0] = node 路径
// argv[1] = 脚本路径（REPL 中无此项）
// argv[2+] = 自定义参数

// 3. 标准 I/O
process.stdout.write('请输入你的名字: ');
process.stdin.once('data', (data) => {
  console.log(`你好, ${data.toString().trim()}!`);
  process.exit(0); // 退出程序，0 表示正常退出
});

// 4. 退出事件
process.on('exit', (code) => {
  console.log(`进程即将退出，退出码: ${code}`);
});