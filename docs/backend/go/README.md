## Go

编译型语言

Go 是静态类型语言，一旦某个变量被声明，那么它的类型就无法再改变了

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

#### 比较大的数

浮点类型可以存储非常大的数值，但是精度不高

整型很精确，但是取值范围有限

使用指数表示的数，默认就是 float64 类型

```go
var distance = 24e2
fmt.Printf("%T", distance) // float64
```

如果需要存储非常大的整数，可以使用 math/big 包

- 对于比较大的整数（超过 10^18），big.Int
- 对于任意精度的浮点类型，big.Float
- 对于分数，big.Rat

```go
lightSpeed := big.NewInt(299792)
secondsPerDay := big.NewInt(86400)

distance := new(big.Int)
distance.SetString("24000000000000000000000", 10)
fmt.Println(distance) // 24000000000000000000000

seconds := new(big.Int)
seconds.Div(distance, lightSpeed) // seconds = distance / lightSpeed

days := new(big.Int)
days.Div(seconds, secondsPerDay) // days = seconds / secondsPerDay

fmt.Println("That is", days, "days of travel at light speed.")
```

> 一旦使用了 big.Int，那么等式里其他部分也必须使用 big.Int
>
> NewInt() 函数可以把 int64 转化为 big.Int 类型
>
> 缺点：用起来繁琐，速度较慢

#### 较大数值的常量

```go
// 会报错
const distance unit64 = 24000000000000000000000
// 但在 Go 里面，常量是可以无类型的（untyped），下面就不会报错
const distance = 24000000000000000000000 // untyped int
fmt.Printf("%T", distance) // 报错
```

常量使用 const 关键字来声明，程序里每个字面值都是常量，这意味着比较大的数值可以直接使用（作为字面值）

```go
fmt.Println(24000000000000000000000/299792/86400) // 926568346646
```

> 针对字面值和常量的计算是在编译阶段完成的
>
> Go 的编译器是用 Go 编写的，这种无类型的数值字面值就是由 big 包所支持的，这使得可以操作很大的数（超过 18 的 10^18）

### 多语言文本

#### 声明字符串

声明

```go
peace := "peace"
var peace = "peace"
var peace string = "peace"
```

字符串的零值

```go
var empty string
fmt.Println(empty == "") // true
```

#### 字符串字面值/原始字符串字面值

字符串字面值（string literal）可以包含转义字符，例如 \n

但如果想得到 \n 而不是换行的话，可以使用 ` 来代替 "，这叫做原始字符串字面值（raw string literal）

```go
fmt.Println("peace be upon you\nupon you be peace")
fmt.Println(`strings can span multiple lines with the \n escape sequence`)
fmt.Println(`
peace be upon you
upon you be peace
`)
```

#### 字符，code points，runes，bytes

Unicode 联盟为超过 100 万个字符分配了相应的数值，这个数叫做 code point

- 例如：65 代表 A，128515 代表 😃

为了表示这样的 unicode code point，Go 提供了 rune 类型，它是 int32 的别名

byte 是 unit 8 类型的别名，目的是用于二进制数据

- byte 倒是可以表示由 ASCII 定义的英语字符，它是 Unicode 的一个子集（共 128 个字符）

#### 类型别名

类型别名就是同一个类型的另一个名字

- 所以，rune 和 int32 可以互换使用

也可以自定义类型别名，语法如下

```go
type byte = uint8
type rune = int32
```

#### 打印

如果想打印字符而不是数值，使用 c% 格式化动词

```go
fmt.Printf("%c", 128515) // 😃
```

任何整数类型都可以使用 %c 打印，但是 rune 意味着该数值表示了一个字符

#### 字符

字符字面值使用 '' 括起来，例如 'A'

如果没有指定字符类型的话，Go 会推断它的类型为 rune

```go
grade := 'A'
var grade1 = 'A'
var grade2 rune = 'A'
```

> 这里的 grade 仍然包含一个数值，本例中就是 65，它是 A 的 code point

字符字面值也可以用 byte 类型

```go
var star byte = '*'
```

#### string

可以给某个变量赋予不同的 string 值，但是 string 本身是不可变的

```go
message := "shalom"
c := message[5]
fmt.Printf("%c\n", c) // m
message[5] = 'd' // 报错
```

#### Caesar cipher 凯撒加密法

凯撒加密法是一种简单的加密方法，它是通过将每个字符移动固定数目的位置来实现的

```go
c := 'a'
c = c + 3
fmt.Printf("%c", c) // d
if c > 'z' {
  c = c - 26
}
```

#### ROT13

ROT13 (旋转 13) 是凯撒加密在 20 世纪的变体, 它会把字母替换成 +13 后对应的字母

```go
originalMessage := "uv vagreangvbany fcnpr fgngvba"
for i := 0; i < len(originalMessage); i++ {
  c := originalMessage[i]
  if c >= 'a' && c <= 'z' {
    c = c + 13
    if c > 'z' {
      c = c - 26
    }
  }
  fmt.Printf("%c", c)
}
```

#### Go 的内置函数

len 是 Go 语言的一个内置函数

```go
message := "uv vagreangvbany fcnpr fgngvba"
fmt.Println(len(message)) // 32
```

> 本例中 len 返回 message 所占的 byte 数

#### UTF-8

Go 中的字符串是用 UTF-8 编码的，UTF-8 是 Unicode Code Point 的几种编码之一

UTF8 是一种有效率的可变长度的编码，每个 code point 可以是 8 位、16 位或 32 位的

通过使用可变长度编码，UTF-8 使得从 ASCII 的转换变得简单明了，因为 ASCII 字符与其 UTF-8 编码对应的字符是相同的

UTF-8 是万维网的主要字符编码，它是由 Ken Thompson（Go 语言的设计者之一） 于 1992 年发明的

```go
question := "¿Cómo estás?"
fmt.Println(len(question), "bytes") // 15
fmt.Println(utf8.RuneCountInString(question), "runes") // 12

c,size := utf8.DecodeRuneInString(question)
fmt.Printf("First rune: %c %v bytes", c, size) // First rune: ¿ 2 bytes
```

#### range

使用 range 关键字，可以遍历各种集合

```go
question := "¿Cómo estás?"
for i, c := range question {
  fmt.Printf("%v %c\n", i, c)
}
```

#### 类型不能混用

连接两个字符串，使用 + 运算符

```go
countdown := "Launch in T minus " + "10 seconds."
```

如果想连接字符串和数值，是会报错的

```go
countdown := "Launch in T minus " + 10 + " seconds."
```

整型和浮点类型也不能混着用

```go
age := 41
marsDays := 687
earthDays := 365.2425
fmt.Println("I am", age * earthDays / marsDays, "years old on Mars.") // invalid operation: age * earthDays (mismatched types int and float64)
```

#### 数值间类型转换

整数类型转换为浮点类型

```go
age := 41
// 将 age 转换为浮点类型
marsAge := float64(age)
```

浮点类型转换为整数类型，小数点后边的部分会被截断，而不是舍入

```go
earthDays := 365.2425
// 将 earthDays 转换为整数类型
fmt.Println(int(earthDays)) // 365
```

> 无符号和有符号整数类型之间也需要转换
>
> 不同大小的整数类型之间也需要转换

**类型转换时需谨慎**

环绕行为

```go
var bh float64 = 32768
var h = int16(bh)
fmt.Println(h) // -32768
```

可以通过 math 包提供的 max、min 常量，来判断是否超过最大最小值

```go
var bh float64 = 32768
if bh < math.MinInt16 || bh > math.MaxInt16 {
   // handle out of range error
}
```

#### 字符串转换

把 rune、byte 转换为 string

```go
var pi rune = 960
var alpha rune = 940
var omega rune = 969
var bang byte = 33
fmt.Printf("%v %v %v %v\n", string(pi), string(alpha), string(omega), string(bang)) // π ά ω !
```

想把数值转化为有意义的字符串，它的值必须能转化为 code point

```go
countdown := 10
str := "Launch in T minus " + strconv.Itoa(countdown) + " seconds."
fmt.Println(str) // Launch in T minus 10 seconds.
```

> Itoa 是 Integer to ASCII 的意思
>
> Unicode 是 ASCII 的超集，它们前 128 个 code points 是一样的（数字、英文字母、常用标点）

另外一种把数值转化为 string 的方式是使用 Sprintf 函数，和 Printf 略类似，但是会返回一个 string

```go
countdown := 9
str := fmt.Sprintf("Launch in T minus %v seconds.", countdown)
fmt.Println(str) // Launch in T minus 9 seconds.
```

strconv 包中的 Atoi 函数（ASCII to Integer），由于字符串里面可能包含任意字符，或者要转换的数字字符串太大，所以 Atoi 函数可能会发生错误

```go
countdown, err := strconv.Atoi("10ds")
if err != nil {
  // handle error
  fmt.Println(err.Error())
}
fmt.Println(countdown) // 10
```

#### 布尔类型的转换

Print 家族函数，会把 bool 类型的值打印成 true/false 文本

```go
launch := false
launchText := fmt.Sprintf("%v", launch)
fmt.Println("Ready for launch:", launchText) // Ready for launch: false

var yesNo string
if launch {
   yesNo = "yes"
} else {
   yesNo = "no"
}
fmt.Println("Ready for launch:", yesNo) // Ready for launch: no
```

如果想使用 string(false)，int(false)；bool(1), bool("yes") 等类似的方法进行转换，那么 Go 编译器会报错

### 函数

使用 func 关键字

大写字母开头的函数、变量或其他标识符都会被导出，对其他包可用；小写字母开头的则不会

实参（argument）和形参（parameter）

函数声明时，如果多个形参类型相同，那么该类型只写一次即可：

```go
// func Unix(sec int64, nsec int64) Time
func Unix(sec, nsec int64) Time
```

Go 的函数可以返回多个值

```go
countdown, err := strconv.Atoi("10")
```

> 上面的函数声明为 `func Atoi(s string) (i int, err error)`

函数的多个返回值需要用括号括起来，每个返回值名字在前，类型在后。声明函数时可以把名字去掉，只保留类型：

```go
func Atoi(s string) (int, error)
```

Println 是一个特殊的函数，它可以接收一个、两个甚至多个参数，参数类型还可以不同。其声明如下：

```go
func Println(a ...interface{}) (n int, err error)
```

> `...` 表示函数的参数数量是可变的
>
> 参数 `a` 的类型为 `interface{}`，是一个空接口

编写函数

```go
func kelvinToCelsius(k float64) float64 {
  k -= 273.15
  return k
}

func main() {
  k := 294.0
  c := kelvinToCelsius(k)
  fmt.Println(k, "°K is", c, "°C")
}
```

> 函数按值传递
>
> 同一个包中声明的函数在调用时彼此不需要加上包名

### 方法

#### 声明新类型

关键字 type 用来声明新类型

```go
type celsius float64
const degrees = 20
var temperature celsius = degrees
temperature += 10
fmt.Println(temperature) // 30
```

为什么声明新类型？极大地提高代码可读性和可靠性

不同的类型是无法混用的

声明函数类型

```go
type sensor func() kelvin
```

#### 通过方法添加行为

在 Go 里，它提供了方法，但是没提供类和对象

Go 比其他语言的方法要灵活

可以将方法与同包中声明的任何类型相关联，但不可以是 int、float32 等预声明的类型

```go
type celsius float64
type kelvin float64

func kelvinToCelsius(k kelvin) celsius {
  return celsius(k - 273.15)
}

func (k kelvin) celsius() celsius {
  return celsius(k - 273.15)
}
```

> celsius 方法虽然没有参数，但它前面却有一个类型参数的接收者
>
> 每个方法可以有多个参数，但只能有一个接收者
>
> 接收者的行为和其他参数是一样的

#### 方法调用

变量.方法名(参数)

#### 一等函数

在 Go 里，函数是头等的，它可以用在整数、字符串或其他类型能用的地方：

- 将函数赋给变量
- 将函数作为参数传递给函数
- 将函数作为函数的返回类型

#### 闭包和匿名函数

匿名函数就是没有名字的函数，在 Go 里也称作函数字面值

```go
var f = func() {
  fmt.Println("Dress up for the masquerade.")
}

f := func() {
  fmt.Println("Dress up for the masquerade.")
}

func() {
  fmt.Println("Dress up for the masquerade.")
}()
```

因为函数字面值需要保留外部作用域的变量引用，所以函数字面值都是闭包的

闭包就是由于匿名函数封闭并包围作用域中的变量而得名
