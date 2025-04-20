---
title: 本地配置
---

## NVM-windows

管理 node.js 版本

[GitHub 地址](https://github.com/coreybutler/nvm-windows/releases)

::: tabs

@tab 配置镜像

```bash
nvm node_mirror https://npmmirror.com/mirrors/node/
nvm npm_mirror https://npmmirror.com/mirrors/npm/
```

@tab 常用命令

```bash
nvm list # 查看下载的 node 版本
nvm use # 指定当前使用的 node
nvm install <version>
nvm uninstall <version>
```

:::

## pnpm

```bash
pnpm i # 安装某个项目的所有依赖
pnpm run "/<regex>/" # 可以使用正则表达式来替代脚本名称从而同时运行多个脚本
```

## git

好使的教程 --> [猴子都能懂的 git 入门](https://backlog.com/git-tutorial/cn/intro/intro1_1.html)

### 常用命令

`init`

```bash
git init # 初始化 git 项目
```

`revert`

```bash
# 回退一个commit
git revert commit号

# 回退多个连续的commit (后面的，前面的]
git revert 后面的...前面的
```

`添加远程仓库并取别名`

```
git remote add upstream xxxxxx（上游仓库地址）
```

`基于远程分支新建一个分支并切换过去`

```
git checkout upstream/dev -b xxxx（分支名）
```

`stash`

```bash
# 暂存现在的内容
git stash [save '描述']
# 查看所有的暂存
git stash list
# 清空所有的暂存
git stash clear
# 删除某一个暂存，默认删除 stash@{0}
git stash drop [stash@{某一个序号}]
# 恢复某一个暂存并删掉它，默认恢复 stash@{0}
git stash pop [stash@{某一个序号}]
# 同上恢复，但是不删掉它
git stash apply [stash@{某一个序号}]
```

`clone`

git clone 加 --single-branch 是下载单个分支， --depth=1 是下载单个 commit 这俩配置项可以提高拉取代码的速度

```bash
 git clone --depth=1 --single-branch git @github.com:ant-design/ant-design.git
```

`设置命令别名`

```bash
# git lg
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

### 报错

`LF will be replaced by CRLF the next time Git touches it`

```bash
git config --global core.autocrlf false
```
