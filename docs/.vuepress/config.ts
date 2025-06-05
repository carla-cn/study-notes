import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { markdownMathPlugin } from "@vuepress/plugin-markdown-math";

const Navbar = [
  {
    text: "数学",
    children: [
      {
        text: "最优化：建模、算法与理论",
        link: "/math/wzw/index.md",
      },
    ],
  },
  {
    text: "通用",
    children: [
      {
        text: "工具",
        link: "/general/tool/index.md",
      },
      {
        text: "UI",
        link: "/general/ui/index.md",
      },
      {
        text: "前端",
        link: "/general/frontend/index.md",
      },
      {
        text: "后端",
        link: "/general/backend/index.md",
      },
    ],
  },
];

export default defineUserConfig({
  bundler: viteBundler(),
  port: 8081,
  lang: "zh-CN",
  title: "瓢儿白施肥记",
  description: "记录一些学习内容",
  head: [["link", { rel: "icon", href: "/study-notes/favicon.ico" }]],
  base: "/study-notes/",
  plugins: [
    markdownMathPlugin({
      type: "mathjax",
    }),
  ],
  markdown: {
    headers: {
      level: [2, 3, 4, 5],
    },
  },
  theme: defaultTheme({
    logo: "/imgs/logo.png",
    repo: "https://github.com/carla-cn",
    docsDir: "docs",
    sidebarDepth: 4,
    navbar: Navbar,
    editLink: false,
    contributors: false,
    backToHome: "返回首页",
    toggleColorMode: "",
  }),
});
