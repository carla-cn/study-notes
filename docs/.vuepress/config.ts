import { path } from '@vuepress/utils'
import { defineUserConfig, defaultTheme } from 'vuepress'

const Navbar = [
	{
		text: '前端',
		children: [
			{
				text: 'JavaScript',
				children: [
					{
						text: '红宝书',
						link: '/frontend/js/red-book',
					},
				],
			},
			{
				text: '框架',
				children: [
					{
						text: '小程序',
						link: '/frontend/framework/we-app',
					},
				],
			},
			{
				text: '其他',
				children: [
					{
						text: '小工具',
						link: '/frontend/other/tools',
					},
					{
						text: '错误收集',
						link: '/frontend/other/errors',
					},
				],
			},
		],
	},
	{
		text: '后端',
		children: [
			{
				text: 'Go',
				link: '/backend/go',
			},
		],
	},
	{
		text: '通用',
		children: [
			{
				text: '计算机网络',
				link: '/general/network',
			},
		],
	},
]

export default defineUserConfig({
	lang: 'zh-CN',
	title: '瓢儿白施肥记',
	description: '记录一些学习内容',
	alias: {
		'@': path.resolve(__dirname, '../'),
	},
	base: '/study-notes/',
	markdown: {
		headers: {
			level: [2, 3, 4, 5],
		},
	},
	theme: defaultTheme({
		logo: '/favicon.ico',
		repo: 'https://github.com/carla-cn/study-notes',
		docsDir: 'docs',
		sidebarDepth: 4,
		navbar: Navbar,
		editLink: false,
		contributors: false,
		backToHome: '返回首页',
		toggleColorMode: '',
	}),
})
