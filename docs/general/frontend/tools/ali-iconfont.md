---
title: 小工具
---

## 阿里图标库

### Font class 用法

只需要引入 css 和字体文件，把字体编码为 base64 格式，那只需要引入一个 css 文件即可

```js
import fetch from 'node-fetch'
import fs from 'fs'
import prompts from 'prompts'

const main = async () => {
const validateUrl = url => (/\/(font.*)\.css/.test(url) ? true : '地址不对哦')
const questions = [
  {
    type: 'text',
    name: 'url',
    message: '输入下iconfont的fontClass地址？',
    validate: validateUrl
  }
]
const { url } = await prompts(questions)
const cssUrl = `https://${url}`
// 指定保存字体文件的目录
const fontDirectory = './fonts'
const cssDirectory = '.s'
// 创建字体文件保存目录
if (!fs.existsSync(fontDirectory)) {
  fs.mkdirSync(fontDirectory)
}
// 使用node-fetch获取CSS文件内容
fetch(cssUrl)
    .then(response => response.text())
    .then(cssContent => {
      // 使用正则表达式提取字体文件的URL
      const fontUrls = cssContent.match(/url\('\/\/([^']+)'\)/g)

      if (fontUrls) {
        // 使用Promise.all()等待所有字体文件的下载完成
        Promise.all(
          fontUrls.map(fontUrl => {
            // 提取URL中的字体文件链接
            const urlMatch = fontUrl.match(/url\('\/\/([^']+)'\)/)
            if (urlMatch && urlMatch[1]) {
              const fontFileUrl = `https://${urlMatch[1]}` // 添加协议
              // 下载字体文件并转换为Base64编码
              return fetchAndEncodeToBase64(fontFileUrl)
            }
            return Promise.resolve('')
          })
        ).then(encodedFonts => {
          // 将所有字体的Base64编码插入CSS
          encodedFonts.forEach((encodedFont, index) => {
            cssContent = cssContent.replace(fontUrls[index], encodedFont)
          })

          // 生成包含所有字体的Base64编码的CSS文件
          fs.writeFileSync('src/styles/iconfont.scss', cssContent)
          console.log('包含所有字体的Base64编码的CSS文件已生成')
        })
      } else {
        console.error('未找到字体文件URL')
      }
    })
    .catch(error => {
      console.error('下载CSS文件时出错：', error)
    })
}

// 下载字体文件并转换为Base64编码
async function fetchAndEncodeToBase64(fontFileUrl) {
  try {
    const response = await fetch(fontFileUrl)
    const buffer = await response.arrayBuffer()
    const base64Font = Buffer.from(buffer).toString('base64')
    const ext = fontFileUrl.substring(fontFileUrl.lastIndexOf('.') + 1)
    return `url('data:application/font-${ext};charset=utf-8;base64,${base64Font}')`
  } catch (error) {
    console.error(`下载字体文件并转换为Base64编码时出错：${fontFileUrl}`, error)
    return '' // 返回一个空字符串以避免破坏CSS
  }
}

main()
```