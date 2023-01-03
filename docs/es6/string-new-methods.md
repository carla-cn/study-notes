---
title: 字符串的新增方法
toc: content
order: 5
---

## 五、字符串的新增方法

### 1. String.fromCodePoint()

```js
console.log(String.fromCodePoint('0x20bb7')); // 𠮷
console.log(String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'); // true
```

### 2. String.raw()

专门用于模板字符串的标签函数

```js
console.log(String.raw`Hi\n${2 + 3}`); // Hi\n5
console.log(String.raw({ raw: ['Hi\\n'] }, 2 + 3)); // Hi\n，为什么没有 5 ？
```

手动实现一个 raw 方法

```js
String.raw = function (strings, ...values) {
  const { raw } = strings;
  return raw.reduce(
    (res, str, i) => `${res}${str}${values.length > i ? values[i] : ''}`,
    '',
  );
};
console.log(String.raw({ raw: ['Hi\\n'] }, 2 + 3)); // Hi\n5
```

### 3. 实例方法：codePointAt()

#### 对于占用 4 个字节的字符，JS 不能正确处理

- 字符串长度会误判为 2
- charAt() 方法无法读取整个字符
- charCodeAt() 方法只能分别返回前 2 个字节和后 2 个字节（十进制）
- codePointAt() 方法分别返回正确的编码和后 2 个字节（十进制）

```js
const s = '𠮷';
console.log(s.length); // 2
console.log(s.charAt(0)); // �
console.log(s.charAt(1)); // �
console.log(s.charCodeAt(0).toString(16)); // d842
console.log(s.charCodeAt(1).toString(16)); // dfb7
console.log(s.codePointAt(0).toString(16)); // 20bb7
console.log(s.codePointAt(1).toString(16)); // dfb7
```

#### codePointAt() 不能对应正确位置序号的字符编码

```js
const s = '𠮷a';
console.log(s.codePointAt(1)); // 57271
console.log(s.codePointAt(2)); // 97
```

#### 针对占用 4 个字节的字符，如何获得对应位置序号的字符？

for...of

```js
const s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61
```

展开运算符

```js
const s = '𠮷a';
const sArr = [...s];
console.log(sArr.length); // 2
sArr.forEach((ch) => console.log(ch.codePointAt(0).toString(16)));
// 20bb7
// 61
```

#### 如何测试一个字符由两个字节还是四个字节组成

```js
const is32Bit = (c) => c.codePointAt(0) > 0xffff;
console.log(is32Bit('a')); // false
console.log(is32Bit('𠮷')); // true
```

### 4. 实例方法：normalize()

Unicode 正规化：将字符的不同表示方法统一为同样的形式

### 5. 实例方法：includes(), startsWith(), endsWith()

传统上，JavaScript 只有 indexOf 方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

- includes()：返回布尔值，表示是否找到了参数字符串。
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部

> 这三个方法都支持第二个参数，表示开始搜索的位置。endsWith 的行为与其他两个方法有所不同，它针对前 n 个字符，而其他两个方法针对从第 n 个位置直到字符串结束

### 6. 实例方法：repeat()

repeat 方法返回一个新字符串，表示将原字符串重复 n 次

- 如果参数是负数或者 Infinity，会报错
- 如果参数是 0 到 -1 之间的小数，则等同于 0
- 如果参数是小数会被向下取整
- NaN 等同于 0
- repeat 的参数是字符串，则会先转换成数字 0

```js
console.log('x'.repeat('a') === ''); // true
```

### 7. 实例方法：padStart()，padEnd()

ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。

```js
console.log('x'.padStart(4, 'ab')); // abax
console.log('x'.padEnd(4, 'ab')); // xaba
```

如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串

```js
console.log('xxx'.padStart(2, 'ab')); // xxx
console.log('xxx'.padEnd(2, 'ab')); // xxx
```

如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串

```js
console.log('abc'.padStart(10, '0123456789')); // 0123456abc
```

如果省略第二个参数，默认使用空格补全长度

```js
console.log('x'.padStart(4)); // '   x'
```

#### 用途

为数值补全指定位数

```js
console.log('1'.padStart(2, '0')); // 01
```

提示字符串格式

```js
console.log('12'.padStart(10, 'YYYY-MM-DD')); // YYYY-MM-12
```

### 8. 实例方法：trimStart()，trimEnd()

```js
const s6 = '  abc  ';
s6.trim(); // "abc"
s6.trimStart(); // "abc  "
s6.trimEnd(); // "  abc"
```

### 9. 实例方法：matchAll()

返回一个正则表达式在当前字符串的所有匹配

### 10. 实例方法：replaceAll()

一次性替换所有匹配

```js
'aabbcc'.replaceAll('b', '_');
// 'aa__cc'
```

如果 searchValue 是一个不带有 g 修饰符的正则表达式，replaceAll()会报错，这一点跟 replace()不同

```js
// 不报错
'aabbcc'.replace(/b/, '_');

// 报错
'aabbcc'.replaceAll(/b/, '_');
```

replaceAll()的第二个参数 replacement 是一个字符串，表示替换的文本，其中可以使用一些特殊字符串。

- $&：匹配的字符串。
- $`：匹配结果前面的文本。
- $'：匹配结果后面的文本。
- $n：匹配成功的第 n 组内容，n 是从 1 开始的自然数。这个参数生效的前提是，第一个参数必须是正则表达式。
- $$：指代美元符号$

```js
// $& 表示匹配的字符串，即`b`本身
// 所以返回结果与原字符串一致
'abbc'.replaceAll('b', '$&');
// 'abbc'

// $` 表示匹配结果之前的字符串
// 对于第一个`b`，$` 指代`a`
// 对于第二个`b`，$` 指代`ab`
'abbc'.replaceAll('b', '$`');
// 'aaabc'

// $' 表示匹配结果之后的字符串
// 对于第一个`b`，$' 指代`bc`
// 对于第二个`b`，$' 指代`c`
'abbc'.replaceAll('b', `$'`);
// 'abccc'

// $1 表示正则表达式的第一个组匹配，指代`ab`
// $2 表示正则表达式的第二个组匹配，指代`bc`
'abbc'.replaceAll(/(ab)(bc)/g, '$2$1');
// 'bcab'

// $$ 指代 $
'abc'.replaceAll('b', '$$');
// 'a$c'
```

replaceAll()的第二个参数 replacement 除了为字符串，也可以是一个函数
