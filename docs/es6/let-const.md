---
title: let 和 const 命令
toc: content
---

## 二、let 和 const 命令

### 1. let\const 命令 与 var 的比较

- 不存在变量提升：变量不能在声明之前使用
- 暂时性死区：当前块级作用域下的变量不再受外部影响，在声明前都不能使用
- 不允许重复声明

### 2. for 循环中的 let 声明的计数器

```js
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

- i 只在 for 循环体内有效
- i 只在本轮循环中有效，每一轮循环中都是重新声明的
- i 所在的部分是一个父作用域，循环体内部是一个单独的子作用域

### 3. 块级作用域

ES6 允许块级作用域的任意嵌套

#### 3.1 为什么需要块级作用域

ES5 只有全局作用域和函数作用域，没有块级作用域，带来如下不合理的场景：

- 场景一，内层变量可能会覆盖外层变量
  ```js
  var out = 1;
  function f() {
    if (false) {
      var out = 2;
    }
    console.log(out); // undefined
  }
  ```
- 场景二，用来计数的循环变量泄露为全局变量

#### 3.2 块级作用域与函数声明

ES5 规定，函数只能在顶层作用域和函数作用域之中声明，不能在块级作用域声明，但是浏览器为了兼容以前的旧代码还是支持在块级作用域中声明函数，因此下面两种情况实际都能运行

```js
// 情况一
if (true) {
  function f() {}
}

// 情况二
try {
  function f() {}
} catch (e) {
  // ...
}
```

ES6 规定，块级作用域之中，函数声明语句的行为类似于 let，在块级作用域之外不可引用

思考下面一段代码分别在 ES5 环境，浏览器的 ES6 环境下的运行情况

```js
function f() {
  console.log('I am outside!');
}

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() {
      console.log('I am inside!');
    }
  }

  f();
})();
```

ES5 中运行，会得到“I am inside!”，因为在 if 内声明的函数 f 会被提升到函数头部

```js
// ES5 环境
function f() {
  console.log('I am outside!');
}

(function () {
  function f() {
    console.log('I am inside!');
  }
  if (false) {
  }
  f();
})();
```

ES6 就完全不一样了，理论上会得到“I am outside!”。但是 ES6 规定浏览器可以不遵守上面的规定，有自己的行为方式

- 允许在块级作用域内声明函数
- 函数声明类似与 var，会提升到全局作用域或函数作用域的头部
- 函数声明还会提升到所在块级作用域的头部

```js
// 浏览器的 ES6 环境
function f() {
  console.log('I am outside!');
}
(function () {
  var f = undefined;
  if (false) {
    function f() {
      console.log('I am inside!');
    }
  }

  f();
})();
// Uncaught TypeError: f is not a function
```

> 考虑到环境导致的行为差异太大，应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句

### 4. ES6 一共有 6 种声明变量的方法

var function let const import class

### 5. 顶层对象的属性

顶层对象，在浏览器环境指的是 window 对象，在 Node 指的是 global 对象

ES5 之中，顶层对象的属性与全局变量是等价的，带来几个问题：

- 没有办法在编译时就报出变量未声明的错误
- 很容易不知不觉地就创建了全局变量（比如打字出错）
- 顶层对象的属性是到处可以读写的，这非常不利于模块化编程
- 顶层对象是一个有实体含义的对象，与全局变量混在一起也是不合适的

ES6 为了改变这一点，一方面规定，为了保持兼容性，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性

### 6. globalThis 对象

任何环境下，globalThis 都是存在的，都可以从它拿到顶层对象，指向全局环境下的 this
