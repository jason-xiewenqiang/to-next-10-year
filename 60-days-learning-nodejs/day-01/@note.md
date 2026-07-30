# 安装环境

## nvm

- macOS / Linux

```
    # 安装 nvm（macOS / Linux）
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

    # 重启终端后，安装 Node.js v20 LTS
    nvm install 20
    nvm use 20
    nvm alias default 20

    # 验证安装
    node --version    # 应显示 v20.x.x
    npm --version     # 应显示 10.x.x

```

- windows

Windows 用户推荐使用 nvm-windows。

```
    url: https://github.com/coreybutler/nvm-windows

```

## pnpm

```
    # 使用 corepack 启用 pnpm
    corepack enable
    corepack prepare pnpm@latest --activate

    # 验证
    pnpm --version

```

