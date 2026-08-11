# 练习题

本目录（day-03）包含以下练习：

## 练习 1：目录树生成器

文件：`practice-01-file-tree.js`

实现类似 Unix `tree` 命令的工具，递归打印目录结构。

```bash
node practice-01-file-tree.js ./src
node practice-01-file-tree.js ./src --depth=1
```

要点：
- `├──` / `└──` / `│` 字符绘制树形
- `--depth=N` 限制遍历深度
- 自动忽略 `node_modules` 和 `.git`

## 练习 2：文件拷贝工具

文件：`practice-02-copy-file.js`

支持单文件或整个目录的递归拷贝。

```bash
node practice-02-copy-file.js ./src/lib.js ./dist/lib.js
node practice-02-copy-file.js ./src ./dist
```

要点：
- 自动创建目标目录
- 目标已存在时提示覆盖确认
- 输出逐文件进度和总耗时

## 练习 3：Markdown 索引生成器

文件：`practice-03-md-reader.js`

扫描目录内所有 `.md` 文件，提取一级标题，生成带链接的 `INDEX.md`。

```bash
node practice-03-md-reader.js ./docs
```

要点：
- 递归扫描 `.md`
- 正则提取 `# Title`，无标题时用文件名兜底
- 按目录层级生成树形列表
