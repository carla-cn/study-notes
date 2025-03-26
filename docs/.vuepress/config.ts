import { path } from "@vuepress/utils";
import { defineUserConfig, defaultTheme } from "vuepress";

const Navbar = [
  {
    text: "UI",
    children: [
      {
        text: "PS",
        link: "/ui/ps",
      },
    ],
  },
  {
    text: "前端",
    children: [
      {
        text: "JavaScript",
        children: [
          {
            text: "红宝书",
            link: "/frontend/js/red-book",
          },
        ],
      },
      {
        text: "框架",
        children: [
          {
            text: "小程序",
            link: "/frontend/framework/we-app",
          },
        ],
      },
      {
        text: "工程化",
        children: [
          {
            text: "umi框架",
            link: "/frontend/engineering/umi",
          },
        ],
      },
      {
        text: "其他",
        children: [
          {
            text: "小工具",
            link: "/frontend/other/tools",
          },
          {
            text: "错误收集",
            link: "/frontend/other/errors",
          },
        ],
      },
    ],
  },
  {
    text: "后端",
    children: [
      {
        text: "Go",
        link: "/backend/go",
      },
    ],
  },
  {
    text: "通用",
    children: [
      // {
      //   text: "计算机网络",
      //   link: "/general/network"
      // },
      {
        text: "数据结构与算法",
        link: "/general/algorithm",
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
