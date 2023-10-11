## 使用 umi 搭建一体机项目

设计稿 1080 x 1920，不确定实际屏幕的宽高比

### UI 组件库

考虑到一体机触摸体验，选用 Ant Design Mobile 高清适配，项目从 antd-mobile/2x 导入组件

1. 为了导入方便，做以下配置：

```ts
// config.ts 中，配置一个从 antd-mobile 到 antd-mobile/2x 的别名
alias: {
  "antd-mobile": require.resolve("antd-mobile/2x")
}
```

2. 设置主题色

```scss
// 正好 umi 中 a 标签的 color: var(--adm-color-primary)
:root:root {
  --adm-color-primary: #{$primary-color};
}
```

```ts
export const primaryColor = "#44bb55";
```

### 目录结构

```bash
📁owners-meeting
├─ 📁config
│  ├─ 📄config.ts # umi 配置文件
│  └─ 📄routes.ts # 从配置文件中提取出来的路由配置
├─ 📁public # 可能扔进服务器的静态资源
└─ 📁src
   ├─ 📁constants
   │  └─ 📄color.ts # 如主题色等常量
   ├─ 📁pages # 如果是一个单独的页面组件则采用大驼峰命名文件夹，否则采用小驼峰命名文件夹
   ├─ 📁styles # 里面所有的mixin、变量、函数都是全局的（index.scss 是被 sass-resources-loader 处理过的）
   ├─ 📁utils
   │  ├─ 📄format.ts # 用于格式化的一些函数
   │  └─ 📄px2.ts # 用于将 px 转换为 vw/vh 的函数
   ├─ 📁layouts
   └─ 📄global.scss # 全局样式文件
```

### sass-resources-loader

该 loader 处理过的 mixin、变量、函数等可以在任意 .scss 文件中不经导入使用

config.ts 中配置：

```ts
chainWebpack(config) {
  config.module
    .rule("scss")
    .test(/\.scss$/)
    .use("sass-loader")
    .loader("sass-loader")
    .end()
    .use("sass-resources-loader")
    .loader("sass-resources-loader")
    .options({
      resources: [path.resolve(__dirname, "../src/styles/index.scss")]
    });
}
```

> 注意：install sass-loader & sass-resources-loader

### 尺寸适配

基于 1080 x 1920 的设计稿，使用 `vw` 和 `vh` 单位进行适配。

```scss
@use "sass:math";

// 默认设计稿的宽度
$designWidth: 1080;
// 默认设计稿的高度
$designHeight: 1920;

// px 转为 vw 的函数
@function vw($px) {
  @return math.div($px, $designWidth) * 100vw;
}

// px 转为 vh 的函数
@function vh($px) {
  @return math.div($px, $designHeight) * 100vh;
}
```

```scss
.a {
  width: vw(100);
  height: vh(100);
}
```

```ts
// 定义设计稿的宽高
const designWidth = 1080;
const designHeight = 1920;

export const px2vw = (_px: number) => {
  return (_px * 100.0) / designWidth + "vw";
};

export const px2vh = (_px: number) => {
  return (_px * 100.0) / designHeight + "vh";
};
```

```ts
import { px2vw, px2vh } from "@/utils/px2.ts";
```

```scss
/**
* 设置字体在特定屏幕中整体缩放
*/
html {
  font-size: 100px !important;
}

@media (max-width: 800px) {
  html {
    font-size: 80px !important;
  }
}
```

- 字体使用 rem 单位，方便整体缩放或者根据屏幕大小进行缩放
  - `1rem = 100px`，即 20px 字体大小为 `0.2rem`。

### 静态资源

- 图片：`/public/imgs/`
  - scss 文件中 `url(/imgs/xxx.png)`，ts 文件中部分使用 `import xxx from "/public/imgs/xxx.png"`（否则就尝试删掉 /public）

### 手写的工具

#### 页面跳转

- 项目中有一个可以获取路径的函数，getPath
- umi 提供的跳转的 hook，[useNavigate](https://umijs.org/docs/api/api#usenavigate)

```ts
import { getPath } from "@/utils/get";
import { useNavigate } from "umi";

const navigate = useNavigate();
const handleClick = () => {
  navigate(getPath((component) => component.Step1_2));
};
```

#### 无用数据过滤

```ts
export const formatData = (
  data: any,
  format?: (v: any) => any,
  options?: { sign?: number | string }
) => {
  const { sign } = options || {};
  const uselessData = [undefined, null, ""];
  const isEmptyArr = Array.isArray(data) && data.length === 0;
  const isEmptyObj = typeof data === "object" && Object.keys(data).length === 0;
  if (uselessData.includes(data) || isEmptyArr || isEmptyObj)
    return sign || "-";
  return typeof format === "function" ? format(data) : data;
};
```
