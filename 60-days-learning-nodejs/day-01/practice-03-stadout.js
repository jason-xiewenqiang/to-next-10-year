/**
 * 练习 3：交互式问候程序
 *
 * 编写一个 greeter.js，使用 process.stdin 和 process.stdout 实现：
 *   - 提示用户输入姓名
 *   - 提示用户输入年龄
 *   - 输出个性化问候信息
 */

process.stdout.write('请输入你的姓名: ');

process.stdin.once('data', (nameData) => {
  const name = nameData.toString().trim();

  process.stdout.write('请输入你的年龄: ');

  process.stdin.once('data', (ageData) => {
    const age = ageData.toString().trim();

    console.log(`\n你好, ${name}！很高兴认识你。`);
    console.log(`原来你已经 ${age} 岁了，祝你今天过得愉快！\n`);

    process.exit(0);
  });
});
