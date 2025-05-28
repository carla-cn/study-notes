import { path } from "@vuepress/utils";
import { defineUserConfig, defaultTheme } from "vuepress";

const Navbar = [
  {
    text: "数学",
    children: [
      {
        text: "最优化：建模、算法与理论",
        link: "/math/wzw",
      },
    ],
  },
  {
    text: "通用",
    children: [
      {
        text: "工具",
        link: "/general/tool",
      },
      {
        text: "UI",
        link: "/general/ui",
      },
      {
        text: "前端",
        link: "/general/frontend",
      },
      {
        text: "后端",
        link: "/general/backend",
      },
    ],
  },
];

export default defineUserConfig({
  port: 8081,
  lang: "zh-CN",
  title: "瓢儿白施肥记",
  description: "记录一些学习内容",
  alias: {
    "@": path.resolve(__dirname, "../"),
  },
  base: "/study-notes/",
  markdown: {
    headers: {
      level: [2, 3, 4, 5],
    },
  },
  theme: defaultTheme({
    logo: "/favicon.ico",
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
