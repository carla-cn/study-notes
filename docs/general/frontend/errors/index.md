### 终端错误

#### 1. `BUILD_ENV=XXX` 命令不支持

*package.json*  的  `scripts`  属性下配置命令  `"BUILD_ENV=XXX`，切换到  **Windows**  环境下报错

> 'BUILD_ENV' 不是内部或外部命令，也不是可运行的程序

原因： **Windows**  环境不支持  `BUILD_ENV=XXX`  命令

解决：开启 `VSCode` 的 `wls` 命令行，使用 `Linux` 环境 <br />
[# Get started using Visual Studio Code with Windows Subsystem for Linux](https://learn.microsoft.com/zh-cn/windows/wsl/tutorials/wsl-vscode)

### npm

#### 1. `Unable to authenticate, need: Basic realm="aliyun"`

解决：`npm login`

[云效账号密码](https://packages.aliyun.com/npm/npm-registry/guide)

#### 2. `cb() never called!`

使用 `npm i` 安装依赖出现此错误

使用 `rimraf` 可快速删除 `node_modules`

```bash
npm install -g rimraf
```

解决：

依次执行如下命令

```bash
rimraf node_modules
rimraf package-lock.json

npm cache verify
npm cache clean --force

npm i
```

若上述步骤不能解决，则细看究竟是哪个包导致的问题，分批拉依赖


### 编译

#### 1. `“xxxx”不能用作 JSX 组件`

解决：https://juejin.cn/post/7089463577634930718

通过 resolutions 指定版本

```json
"resolutions": {
  "@types/react": "17.0.44"
},
```

如果用的是 npm（yarn 不需要） 的话，还需要在 package.json 的 script 中添加如下 preinstall，通过使用 npm-force-resolutions 包来根据 resolutions 进行版本限定。

```json
"preinstall": "npm install --package-lock-only --ignore-scripts && npx npm-force-resolutions"
```
