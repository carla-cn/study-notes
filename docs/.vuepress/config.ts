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
				text: 'React',
				children: [
					{
						text: 'React 源码',
						link: '/frontend/react/react-code',
					},
				],
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
	theme: defaultTheme({
		logo: '/favicon.ico',
		repo: 'https://github.com/carla-cn/study-notes',
		docsDir: 'docs',
		navbar: Navbar,
		editLink: false,
		contributors: false,
		backToHome: '返回首页',
		toggleColorMode: '',
	}),
})
