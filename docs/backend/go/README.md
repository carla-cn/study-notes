## Go

编译型语言

### 搭建环境

vscode：

1. 插件
2. `Go install/update tools`：安装/更新工具

   Go 代理

   ```bash
   go env -w GO111MODULE=on
   go env -w GOPROXY=https://goproxy.cn,direct
   ```

### 变量及其作用域

作用域的范围就是 {} 之间的部分

短声明

```go
// 使用 var 声明变量
var a = 1
// 也可以使用短声明，效果同上，但可以在无法使用 var 的地方使用
a := 1

for i := 0; i < 10; i++ {
   // i 在 for 循环中声明，作用域只在 for 循环中
}

if a := 1; a > 0 {
   // a 在 if 语句中声明，作用域只在 if 语句中
}

switch a := 1; a {
case 1:
   // a 在 switch 语句中声明，作用域只在 switch 语句中
default:
   //...
}

```

main 函数外声明的变量拥有 package 作用域，短声明不能用来声明 package 作用域的变量

### 实数

#### 声明浮点型变量

只要数字含有小数部分，那么它的类型就是 float64

```go
/* 下面三个语句的效果是一样的 */
days := 365.2425
var days = 365.2425
var days float64 = 365.2425
/* 如果使用一个整数来初始化某个变量，则必须指定它的类型为 float64，否则它就是一个整数类型 */
var answer float32 = 42
```

> Go 语言里有两种浮点数类型：
>
> 默认是 float64
>
> - 64 位的浮点类型
> - 占用 8 字节
>
> float32
>
> - 占用 4 字节
> - 精度比 float64 低
> - 有时叫做单精度浮点数类型

想使用单精度类型，必须再声明变量的时候指定该类型：

```go
var pi64 = math.Pi
var pi32 float32 = math.Pi
fmt.Println(pi64) // 3.141592653589793
fmt.Println(pi32) // 3.1415927
```

- 当处理大量数据时，例如 3D 游戏中的数千个顶点，使用 float32 牺牲精度来节省内存是很有意义的
- math 包里面的函数操作都是 float64 类型，所以应该首选使用 float 64 类型，除非有足够的理由不去使用它

#### 零值

Go 里面的每个类型都有一个默认值，它称作零值

当声明变量却不对它进行初始化的时候，它的值就是零值

```go
var price float64
fmt.Println(price) // 0
```

#### 显示浮点类型

- Print 或 Println 打印浮点类型的时候，默认的行为是尽可能地多显示几位小数
- Printf 函数，结合 %f 格式化动词来指定显示小数的位数

```go
third := 1.0 / 3
fmt.Println(third) // 0.3333333333333333
fmt.Printf("%v\n", third) // 0.3333333333333333
fmt.Printf("%f\n", third) // 0.333333
fmt.Printf("%.3f\n", third) // 0.333
fmt.Printf("%4.2f\n", third) // 0.33
fmt.Printf("%05.2f\n", third) // 00.33，默认是空格填充
```

> 浮点类型不适合用于金融类计算，为了尽量最小化舍入错误，建议先做乘法，再做除法

#### 如何比较浮点类型

```go
piggyBank := 0.1
piggyBank += 0.2
fmt.Println(piggyBank == 0.3) // false

fmt.Println(math.Abs(piggyBank - 0.3) < 0.0001)
```

#### 整数类型

Go 提供了 10 种整数类型（不可以存小数部分，范围有限，通常根据数值范围来选取整数类型）

- 5 种整数类型是有符号的，能表示正数、0、负数
- 5 种整数类型是无符号的，能表示正数、0

```go
// 最常用的整数类型是 int
var year int = 2018
// 无符号整数类型是 uint
var month uint = 12
```

下面三个语句是等价的：

```go
year := 2018
var year = 2018
var year int = 2018
```

int 和 uint 是针对目标设备优化的类型

- 在树莓派 2、比较老的移动设备上，int 和 int32 都是 32 位的
- 在比较新的计算机上，int 和 int64 都是 64 位的

> 如果在比较老的 32 位设备上，使用了超过 20 亿的整数，并且代码还能运行，那么最好使用 int64 和 uint64 来代替 int 和 uint

#### 打印数据类型

在 Printf 函数里面，可以使用 %T 格式化动词来打印变量的类型

```go
year := 2018
fmt.Printf("Type %T for %v\n", year, year) // Type int for 2018
a := "text"
fmt.Printf("Type %T for %[1]v\n", a) // Type string for text
b := 3.14
fmt.Printf("Type %T for %[1]v\n", b) // Type float64 for 3.14
c := true
fmt.Printf("Type %T from %[1]v\n", c) // Type bool from true
```

#### uint8

取值范围 0-255

- unit8 可以用来表示 8 位的颜色（红绿蓝：0-255）
  ```go
  var red, green, blue unit8 = 0, 141, 213
  ```

#### 十六进制表示法

Go 语言里，在数前面加上 0x 前缀，就可以用十六进制的形式来表示

```go
var red, green, blue unit8 = 0, 141, 213
var red, green, blue unit8 = 0x00, 0x8d, 0xd5
```

#### 打印十六进制

打印十六进制的数，用 %x 格式化动词

```go
fmt.Printf("%x %x %x", red, green, blue)
// 也可以指定最小宽度和填充
fmt.Printf("color: #%02x%02x%02x;", red, green, blue)
```

#### 整数环绕

所有的整数都有一个取值范围，超出这个范围，就会发生“环绕”

```go
var red uint8 = 255
red++
fmt.Println(red) // 0

var number int8 = 127
number++
fmt.Println(number) // -128
```

> 如何避免时间发生环绕？
>
> Unix 系统里，时间是以 1970 年 1 月 1 日至今的秒数来表示的
>
> 但是在 2038 年，这个数就会超过 20 多亿，也就是超过了 int32 的范围
>
> 应使用：int64 或 uint64

```go
future := time.Unix(12622780800, 0)
fmt.Println(future) // 2370-01-01 08:00:00 +0800 CST
```

#### 打印每个 bit

使用 %b 格式化动词

```go
var green uint8 = 3
fmt.Printf("%08b\n", green) // 00000011
green++
fmt.Printf("%08b\n", green) // 00000100
```

#### 整数类型的最大值、最小值

- math 包里，为与架构无关的整数类型，定义了最大、最小值常量
  ```go
  math.MaxInt16
  math.MinInt64
  ```
- 而 int 和 uint，可能是 32 位 或 64 位的
