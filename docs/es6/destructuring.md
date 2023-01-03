---
title: 变量的解构赋值
toc: content
order: 3
---

## 三、变量的解构赋值

### 1. 几种解构赋值

解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象

- string 进行解构赋值被转换成类似数组的对象

  ```js
  const [a, b, c, d, e] = 'hello';
  a; // "h"
  let { length: len } = 'hello';
  len; // 5
  ```

- number 和 boolean 进行解构赋值被转换成包装对象

  ```js
  let { toString: str } = 123;
  s === Number.prototype.toString; // true

  let { toString: str2 } = true;
  s === Boolean.prototype.toString; // true
  ```

- null 和 undefined 因为无法转为对象进行解构赋值时会报错
- 函数的参数也可以进行解构赋值

### 2. 数组的解构赋值

对于具有 iterator 接口的数据结构，都可以采用数组形式的解构赋值

- Set 结构

  ```js
  let [x, y, z] = new Set(['a', 'b', 'c']);
  ```

- Generator 函数

  ```js
  function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

  let [first, second, third, fourth, fifth, sixth] = fibs();
  sixth; // 5
  ```

由于数组本质是特殊的对象，因此可以对数组进行对象属性解构

```js
let arr = [1, 2, 3];
let { 0: first, [arr.length - 1]: last } = arr;
first; // 1
last; // 3
```

### 3. 圆括号问题

ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括

解构赋值中能使用圆括号只有一种情况：赋值语句的非模式部分

```js
[b] = [3]; // 正确
({ p: d } = {}); // 正确
[parseInt.prop] = [3]; // 正确
```
