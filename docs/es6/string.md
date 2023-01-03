---
title: 字符串的扩展
toc: content
---

## 四、字符串的扩展

### 1. JS 有 6 种方法可以表示一个字符

```js
'z' === 'z'; // true
'\172' === 'z'; // 八进制
'\x7A' === 'z'; // 十六进制
'\u007A' === 'z'; // 十六进制
'\u{7A}' === 'z'; // 十六进制，ES6 新增，将码点放入大括号，可正确读出大于 \uFFFF 的码点
```

ASCII 码：

- 32 空格
- 48-57 0-9
- 65-90 A-Z
- 97-122 a-z

### 2. 字符串的遍历器接口

ES6 为字符串添加了遍历器接口，使得字符串可以被 `for...of` 遍历，相比传统的 `for` 循环，该遍历器可以识别大于 0xFFFF 的码点

```js
let text = String.fromCodePoint(0x20bb7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// "�"
// "�"

for (let i of text) {
  console.log(i);
}
// "𠮷"
```

### 3. 直接输入 U+2028 和 U+2029

JavaScript 规定有 5 个字符，不能在字符串里面直接使用，只能使用转义形式

- U+2028 行分隔符
- U+2029 段分隔符
- U+000A 换行符
- U+000D 回车符
- U+005C 反斜杠

JSON 格式允许字符串里面直接使用 U+2028（行分隔符）和 U+2029（段分隔符）。这样一来，服务器输出的 JSON 被 JSON.parse 解析，就有可能直接报错

故 ES2019 允许 JavaScript 字符串直接输入 U+2028（行分隔符）和 U+2029（段分隔符）

### 4. JSON.stringify()

ES2019 改变了 JSON.stringify()的行为。如果遇到 0xD800 到 0xDFFF 之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理

```js
console.log(JSON.stringify('\uD842')); // "\ud842"
console.log(JSON.stringify('\u{20BB7}')); // "𠮷"
```

### 5. 标签模板

标签模板是函数调用的一种特殊形式

举例：

- 还原字符串

  ```js
  const restoreTag = (strings, ...values) =>
    strings.reduce(
      (res, str, i) => `${res}${str}${values.length > i ? values[i] : ''}`,
      '',
    );

  console.log(restoreTag`Hello ${5} world ${10}`); // Hello 5 world 10
  ```

- 过滤字符串，防止用户恶意输入

  ```js
  const saferHTML = (temp, ...userInputs) =>
    temp.reduce(
      (res, str, i) =>
        `${res}${str}${
          userInputs.length > i
            ? userInputs[i]
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
            : ''
        }`,
      '',
    );

  console.log(
    saferHTML`<p>${'<script>alert("abc")</script>'} has sent you a message.</p>`,
  ); // <p>&lt;script&gt;alert("abc")&lt;/script&gt; has sent you a message.</p>
  ```

模板处理函数的第一个参数（模板字符串数组）的 raw 属性，保存的是转义后的原字符串，与模板字符串数组一一对应

```js
tag`First line\nSecond line`;

function tag(strings) {
  console.log(strings.raw[0]); // "First line\nSecond line"
}
```
