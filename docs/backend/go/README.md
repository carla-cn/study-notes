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

### 数组

数组是一种固定长度且有序的元素集合

```go
var colors [3]string
colors[0] = "Red"
colors[1] = "Green"

color := colors[1]
fmt.Println(color) // Green
fmt.Println(colors[2] == "") // true
fmt.Println(len(colors)) // 3
```

> 数组的长度可以由内置函数 len 确定
>
> 在声明数组时，未被赋值元素的值是对应类型的零值

#### 数组越界

```go
var colors [3]string
colors[3] = "Red"
i := 3
fmt.Println(colors[i]) // panic: runtime error: index out of range
```

> Go 编译器在检测到对越界元素的访问时会报错
>
> 如果 Go 编译器在编译时未能发现越界错误，那么程序在运行时会出现 Panic
>
> Panic 会导致程序崩溃

#### 使用复合字面值初始化数组

复合字面值（composite literal）是一种用于初始化复合类型（数组、切片、字典和结构体）的紧凑语法

只用一步就完成数组声明和数组初始化

```go
colors := [3]string{"Red", "Green", "Blue"}
```

可以在复合字面值里使用 ... 作为数组的长度，这样 Go 编译器会自动算出数组的元素数量

```go
colors := [...]string{"Red", "Green", "Blue"}
```

> 无论哪种方式，数组的长度都是固定的

#### 遍历数组

for 循环

```go
dwarfs := [5]string{"Ceres", "Pluto", "Haumea", "Makemake", "Eris"}
for i := 0; i < len(dwarfs); i++ {
  fmt.Println(i, dwarfs[i])
}
```

range 关键字

```go
dwarfs := [5]string{"Ceres", "Pluto", "Haumea", "Makemake", "Eris"}
for i, dwarf := range dwarfs {
  fmt.Println(i, dwarf)
}
```

#### 数组的复制

无论数组赋值给新的变量还是将它传递给函数，都会产生一个完整的数组副本

```go
planets := [...]string{"Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"}

planetsMarkII := planets
planets[2] = "whoops"
fmt.Println(planets) // [Mercury Venus whoops Mars Jupiter Saturn Uranus Neptune]
fmt.Println(planetsMarkII) // [Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune]
fmt.Println(planets == planetsMarkII) // false
```

> 数组也是一种值，函数通过值传递来接受参数，所以数组作为函数的参数就非常低效
>
> 数组的长度也是数组类型的一部分，将长度不符的数组作为参数传递会报错
>
> 函数一般使用 slice 而不是数组作为参数

#### 数组的数组

二维数组

```go
var board [8][8]string

board[0][0] = "r"
board[0][7] = "r"

for column := range board[1] {
  board[1][column] = "p"
}

fmt.Println(board)
```

### 切片 Slice

#### Slice 指向数组的窗口

假设 planets 是一个数组，那么 planets[0:4] 就是一个切片，它指向 planets 数组的前 4 个元素

切分数组不会导致数组被修改，它只是创建了指向数组的一个窗口或视图，这种视图就是 slice 类型

```go
planets := [...]string{"Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"}

// terrestrial := planets[0:4]
terrestrial := planets[:4]
gasGiants := planets[4:6]
// iceGiants := planets[6:8]
iceGiants := planets[6:]

allPlanets := planets[:]

fmt.Println(terrestrial) // [Mercury Venus Earth Mars]
fmt.Println(gasGiants) // [Jupiter Saturn]
fmt.Println(iceGiants) // [Uranus Neptune]
fmt.Println(allPlanets) // [Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune]
```

> 忽略掉 slice 的起始索引，表示从数组的起始位置进行切分
>
> 忽略掉 slice 的结束索引，相当于使用数组的长度作为结束索引
>
> 注意：slice 的索引不能是负数

切分数组的语法也可以用于切分字符串

```go
s := "hello, world"
c := s[0:5]
s = "1111111"
fmt.Println((c)) // hello
```

切分字符串时，索引代表的时字节数而非 rune 数

```go
question := "¿Cómo estás?"
fmt.Println(question[:6]) // ¿Cómo
```

#### Slice 的复合字面值

切分数组并不是创建 slice 的唯一方法，可以直接声明 slice

```go
dwarfArray := [...]string{"Ceres", "Pluto", "Haumea", "Makemake", "Eris"}
dwarfs := dwarfArray[:]

// 直接声明 slice，不需要指定长度
dwarfs := []string{"Ceres", "Pluto", "Haumea", "Makemake", "Eris"}
```

切片应用

```go
func hyperspace(worlds []string) {
  for i := range worlds {
    worlds[i] = strings.TrimSpace(worlds[i])
  }
}

func main() {
  planets := []string{" Venus  ", "Earth ", " Mars"}
  hyperspace(planets)
  fmt.Println(strings.Join(planets, "")) // VenusEarthMars
}
```

#### 带有方法的切片

在 Go 里，可以将 slice 或数组作为底层类型，然后绑定其它方法

```go
planets := []string{"Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"}

sort.StringSlice(planets).Sort()
fmt.Println(planets) // [Earth Jupiter Mars Neptune Saturn Uranus Venus]
```

#### 更大的 slice

append 函数也是内置函数，它用于向 slice 里追加元素

```go
dwarfs := []string{"Ceres", "Pluto", "Haumea", "Makemake", "Eris"}
dwarfs = append(dwarfs, "Orcus")
fmt.Println(dwarfs) // [Ceres Pluto Haumea Makemake Eris Orcus]
```

#### 长度和容量（length & capacity）

Slice 中元素的个数决定了 slice 的长度

如果 slice 的底层数组比 slice 还大，那么就说 slice 还有容量可供增长

```go
func dump(label string, slice []string) {
  fmt.Printf("%v: length %v, capacity %v %v\n", label, len(slice), cap(slice), slice)
}

func main() {
  dwarfs := []string{"Ceres", "Pluto", "Haumea", "Makemake", "Eris"}
  dump("dwarfs", dwarfs) // dwarfs: length 5, capacity 5 [Ceres Pluto Haumea Makemake Eris]
  dump("dwarfs[1:2]", dwarfs[1:2]) // dwarfs[1:2]: length 1, capacity 4 [Pluto]
}
```

再结合 append 函数看一看

```go
func dump(label string, slice []string) {
  fmt.Printf("%v: length %v, capacity %v %v\n", label, len(slice), cap(slice), slice)
}

func main() {
  dwarfs1 := []string{"Ceres", "Pluto", "Haumea", "Makemake", "Eris"}
  dwarfs2 := append(dwarfs1, "Orcus")
  dwarfs3 := append(dwarfs2, "Salacia", "Quaoar", "Sedna")

  dump("dwarfs1", dwarfs1) // dwarfs1: length 5, capacity 5 [Ceres Pluto Haumea Makemake Eris]
  dump("dwarfs2", dwarfs2) // dwarfs2: length 6, capacity 10 [Ceres Pluto Haumea Makemake Eris Orcus]
  dump("dwarfs3", dwarfs3) // dwarfs3: length 9, capacity 10 [Ceres Pluto Haumea Makemake Eris Orcus Salacia Quaoar Sedna]

  dwarfs3[1] = "Pluto!"
  fmt.Println(dwarfs1) // [Ceres Pluto Haumea Makemake Eris]
	/* 下面两个切片的底层数组是相同的 */
  fmt.Println(dwarfs2) // [Ceres Pluto! Haumea Makemake Eris Orcus]
  fmt.Println(dwarfs3) // [Ceres Pluto! Haumea Makemake Eris Orcus Salacia Quaoar Sedna]
}
```

#### 三个索引的切分操作

Go 1.2 中引入了能够限制新建切片容量的三索引切分操作

```go
func dump(label string, slice []string) {
  fmt.Printf("%v: length %v, capacity %v %v\n", label, len(slice), cap(slice), slice)
}

func main() {
  planets := []string{"Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"}

  terrestrials := planets[0:4:4] // 又新分配了一个数组，长度为 4，容量为 4
  worlds := append(terrestrials, "Ceres") // 又新分配了一个数组，长度为 4，容量为 8
  dump("terrestrials", terrestrials) // terrestrials: length 4, capacity 4 [Mercury Venus Earth Mars]
  dump("worlds", worlds) // worlds: length 5, capacity 8 [Mercury Venus Earth Mars Ceres]

  worlds2 := append(terrestrials, "Ceres", "Pluto", "Haumea", "Makemake", "Eris")
  dump("worlds2", worlds2) // worlds2: length 9, capacity 12 [Mercury Venus Earth Mars Ceres Pluto Haumea Makemake Eris]
}
```

#### 使用 make 函数对 slice 进行预分配

当 slice 的容量不足以执行 append 操作时，Go 必须创建新数组并复制旧数组中的内容

但通过内置的 make 函数，可以对 slice 进行预分配策略

- 尽量避免额外的内存分配和数组重复操作

```go
func dump(label string, slice []string) {
  fmt.Printf("%v: length %v, capacity %v %v\n", label, len(slice), cap(slice), slice)
}

func main() {
  dwarfs := make([]string, 0, 10) // 预分配了一个长度为 0，容量为 10 的 slice。如果省略第三个参数，则第二个参数即规定长度也规定容量

  dump("dwarfs", dwarfs) // dwarfs: length 0, capacity 10 []

  dwarfs = append(dwarfs, "Ceres", "Pluto", "Haumea", "Makemake", "Eris")

  dump("dwarfs", dwarfs) // dwarfs: length 5, capacity 10 [Ceres Pluto Haumea Makemake Eris]
}
```

#### 声明可变参数的函数

声明 Printf、append 这样的可变参数函数，需要在函数的最后一个参数前面加上 ... 符号

```go
func terraform(prefix string, worlds ...string) []string {
  newWorlds := make([]string, len(worlds))
  for i := range worlds {
    newWorlds[i] = prefix + " " + worlds[i]
  }
  return newWorlds
}

func main() {
  twoWorlds := terraform("New", "Venus", "Mars")
  fmt.Println(twoWorlds) // [New Venus New Mars]

  planets := []string{"Venus", "Mars", "Jupiter"}
  newPlanets := terraform("New", planets...)
  fmt.Println(newPlanets) // [New Venus New Mars New Jupiter]
}
```

### map

map 是 Go 提供的另外一种集合

- 它可以将 key 映射到 value
- 它快速通过 key 找到对应的 value
- 它的 key 几乎可以是任何类型

#### 声明 map

声明 map 必须指定 key 和 value 的类型

```go
temperature := map[string]int{
"Earth": 15,
"Mars": -65,
}

temp := temperature["Earth"]

fmt.Println("On average the Earth is", temp, "Celsius.")

temperature["Earth"] = 16
temperature["Venus"] = 464

fmt.Println(temperature) // map[Earth:16 Mars:-65 Venus:464]

moon := temperature["Moon"]
fmt.Println(moon) // 0
```

#### , 与 ok 写法

```go
temperature := map[string]int{
  "Earth": 15,
  "Mars": -65,
}

temp, ok := temperature["Earth"]
fmt.Println(temp, ok) // 15 true

if moon, ok := temperature["Moon"]; ok {
  fmt.Println(moon)
} else {
  fmt.Println("Where is the Moon?") // Where is the Moon?
}
```

#### map 不会复制

数组、int、float64 等类型在赋值给新变量或传递至函数/方法时会创建相应的副本

但 map 不会

```go
planets := map[string]string{
  "Earth": "Sector ZZ9",
  "Mars": "Sector ZZ9",
}

planetsMarkII := planets
planets["Earth"] = "whoops"

fmt.Println(planets) // map[Earth:whoops Mars:Sector ZZ9]
fmt.Println(planetsMarkII) // map[Earth:whoops Mars:Sector ZZ9]

delete(planets, "Earth")
fmt.Println(planetsMarkII) // map[Mars:Sector ZZ9]
```

#### 使用 make 函数对 map 进行预分配

除非使用复合字面值来初始化 map，否则必须使用内置的 make 函数来为 map 分配空间

创建 map 时，make 函数可以接收一个或两个参数

- 第一个参数是 map 的类型
- 第二个参数是可选的，用于指定 map 的初始容量（为指定数量的 key 预先分配空间）

使用 make 函数创建的 map 初始长度是 0

```go
temperature := make(map[float64]int, 8)
fmt.Println(len(temperature)) // 0
```

#### 使用 map 作计数器

```go
temperature := []float64{
  -28.0, 32.0, -31.0, -29.0, -23.0, -29.0, -28.0, -33.0,
}

frequency := make(map[float64]int)

for _, t := range temperature {
  frequency[t]++
}

/* range 遍历 map 时是无法保证顺序的 */
for t, num := range frequency {
  fmt.Printf("%+.2f occurs %d times\n", t, num)
}
```

#### 使用 map 和 slice 实现数据分组

```go
temperature := []float64{
  -28.0, 32.0, -31.0, -29.0, -23.0, -29.0, -28.0, -33.0,
}

groups := make(map[float64][]float64)

for _, t := range temperature {
  g := math.Trunc(t/10) * 10
  groups[g] = append(groups[g], t)
}

for g, temperatures := range groups {
  fmt.Printf("%v: %v\n", g, temperatures)
}
```

#### 将 map 用作 set

Set 这种集合与数组类似，但元素不会重复

Go 语言里没有提供 set 集合

但可以使用 map 来实现 set 集合

```go
var temperatures = []float64{
  -28.0, 32.0, -31.0, -29.0, -23.0, -29.0, -28.0, -33.0,
}

/* 去重 */

set := make(map[float64]bool)

for _, t := range temperatures {
  set[t] = true
}

if set[-28.0] {
  fmt.Println("set member") // set member
}

fmt.Println(set)

/* 排序 */

unique := make([]float64, 0, len(set))

for t := range set {
  unique = append(unique, t)
}

sort.Float64s(unique)

fmt.Println(unique) // [-33 -31 -29 -28 -23 32]
```

### 结构 struct

为了将分散的零件组成一个完整的结构体，Go 提供了 struct 类型

#### 声明结构

```go
var curiosity struct {
  lat float64
  long float64
}

curiosity.lat = -4.5895
curiosity.long = 137.4417

fmt.Println(curiosity.lat, curiosity.long) // -4.5895 137.4417
fmt.Println(curiosity) // { -4.5895 137.4417}
```

#### 通过类型复用结构体

```go
type location struct {
  lat float64
  long float64
}

var spirit location
spirit.lat = -14.5684
spirit.long = 175.472636

/* 通过成对的字段和值进行初始化 */
opportunity := location{lat: -1.9462, long: 354.4734}

/* 按照字段声明的顺序初始化 */
insight := location{-4.5, 135.9}

fmt.Printf("%v\n", insight) // {-4.5 135.9}
fmt.Printf("%+v\n", insight) // {lat:-4.5 long:135.9}

fmt.Println(spirit, opportunity) // {-14.5684 175.472636} {-1.9462 354.4734}
```

#### struct 的复制

```go
type location struct {
  lat, long float64
}

bradbury := location{-4.5895, 137.4417}
curiosity := bradbury // 两个不同的实例

curiosity.long += 0.0106

fmt.Println(bradbury, curiosity) // {-4.5895 137.4417} {-4.5895 137.4523}
```

#### 由结构体组成的 slice

```go
type location struct {
  lat, long float64
  name string
}

lats := []float64{-4.5895, -14.5684, -1.9462}
longs := []float64{137.4417, 175.472636, 354.4734}

locations := []location{
  {lat: -4.5895, long: 137.4417, name: "Bradbury Landing"},
  {lat: -14.5684, long: 175.472636, name: "Columbia Memorial Station"},
  {lat: -1.9462, long: 354.4734, name: "Challenger Memorial Station"},
}

fmt.Println(locations) // [{-4.5895 137.4417 Bradbury Landing} {-14.5684 175.472636 Columbia Memorial Station} {-1.9462 354.4734 Challenger Memorial Station}]
```

#### 将 struct 编码为 JSON

JSON (JavaScript Object Notation，JavaScript 对象表示法)

常用于 Web API

json 包中的 Marshal 函数可以将 struct 编码为 JSON

```go
type location struct {
  Lat, Long float64
  // lat, long float64
}

func main() {
  curiosity := location{-4.5895, 137.4417}

  bytes, err := json.Marshal(curiosity)
  exitOnError(err)

  fmt.Println(string(bytes)) // {"lat":-4.5895,"long":137.4417}
}

func exitOnError(err error) {
  if err != nil {
    fmt.Println(err)
    os.Exit(1)
  }
}
```

> Marshal 函数只会编码 struct 中被导出的字段（首字母大写）

#### 使用 struct 标签来定义 JSON

Go 语言中 json 包要求 struct 中的字段必须以大写字母开头（类似 CamelCase 大驼峰），但如果需要 snake_case 蛇形命名规范，可以为字段注明标签，使得 json 包在进行编码的时候能够按照标签里的样式修改字段名

```go

type location struct {
  Lat float64 `json:"latitude"xml:"latitude"`
  Long float64 `json:"longitude"`
}

func main() {
  curiosity := location{-4.5895, 137.4417}

  bytes, err := json.Marshal(curiosity)
  exitOnError(err)

  fmt.Println(string(bytes)) // {"latitude":-4.5895,"longitude":137.4417}
}

func exitOnError(err error) {
  if err != nil {
    fmt.Println(err)
    os.Exit(1)
  }
}
```

#### Go语言里没有 class

Go 和其他经典语言不同，它没有 class，没有对象，也没有继承

但是 Go 提供了 struct 和方法

```go
type coordinate struct {
  d, m, s float64
  h rune
}

func (c coordinate) decimal() float64 {
  sign := 1.0

  switch c.h {
  case 'S', 'W', 's', 'w':
    sign = -1
  }

  return sign * (c.d + c.m / 60 + c.s / 3600)
}

func main() {
  lat := coordinate{4, 35, 22.2, 'S'}
  long := coordinate{137, 26, 30.12, 'E'}
  fmt.Println(lat.decimal(), long.decimal()) // -4.5895 137.4417
}
```

#### 构造函数

可以使用 struct 复合字面值来初始化想要的数据；但如果 struct 初始化的时候还有做很多事情，那就可以考虑写一个构造用的函数：

```go
type coordinate struct {
  d, m, s float64
  h rune
}

func (c coordinate) decimal() float64 {
  sign := 1.0

  switch c.h {
  case 'S', 'W', 's', 'w':
    sign = -1
  }

  return sign * (c.d + c.m / 60 + c.s / 3600)
}

type location struct {
  lat, long float64
}

/* new/New 开头，后面跟一个类型的名称，通常就代表这个类型的构造函数（约定） */
func newLocation(lat, long coordinate) location {
  return location{lat.decimal(), long.decimal()}
}

```

Go 语言没有专门的构造函数，但以 new 或者 New 开头的函数，通常是用来构造数据的

有一些构造函数的名称就是 New（例如 errors 包里面的 New 函数），errors.New()

#### class 的替代方案

Go 语言中没有 class，但是可以使用 struct 和方法来实现类似的功能

```go
type location struct {
  lat, long float64
}

type world struct {
  radius float64
}

func rad(deg float64) float64 {
  return deg * math.Pi / 180
}

func (w world) distance(p1, p2 location) float64 {
  s1, c1 := math.Sincos(rad(p1.lat))
  s2, c2 := math.Sincos(rad(p2.lat))
  clong := math.Cos(rad(p1.long - p2.long))
  return w.radius * math.Acos(s1 * s2 + c1 * c2 * clong)
}

func main() {
  mars := world{radius: 3389.5}
  spirit := location{-14.5684, 175.472636}
  opportunity := location{-1.9462, 354.4734}
  fmt.Printf("%.2f km\n", mars.distance(spirit, opportunity)) // 9669.71 km
}
```

#### 组合与转发（composition & forwarding）

Go 通过结构体实现组合

Go 提供了“嵌入”（embedding）特性，它可以实现方法的转发（forwarding）

组合相对于继承更简单、灵活

```go
// type report struct {
// 	sol         int
// 	temperature temperature
// 	location    location
// }

type sol int

type report struct {
	sol
	temperature
	location
}

type temperature struct {
	high, low celsius
}

type location struct {
	lat, long float64
}

type celsius float64

func (t temperature) average() celsius {
	return (t.high + t.low) / 2
}

func (s sol) days(s2 sol) int {
	days := int(s2 - s)
	if days < 0 {
		return -days
	}
	return days
}

// func (r report) average() celsius {
// 	return r.temperature.average()
// }

func main() {
	t := temperature{high: -1.0, low: -78.0}
	fmt.Printf("%v\n", t.average()) // -39.5
	loc := location{-4.5895, 137.4417}
	rep := report{sol: 15, temperature: t, location: loc}

	fmt.Println(rep.temperature.average()) // -39.5
	fmt.Println(rep.average())             // -39.5
	fmt.Println(rep.high)                  // -1

	fmt.Println(rep.sol.days(1446)) // 1431
	fmt.Println(rep.days(1446))     // 1431

	fmt.Printf("%+v\n", rep) // {sol:15 temperature:{high:-1 low:-78} location:{lat:-4.5895 long:137.4417}}
}
```

> Go 可以通过 struct 嵌入来实现方法的转发
>
> 在 struct 中只给定字段类型，不给定字段名即可
>
> 在 struct 中可以转发任意类型

Go 语言中，如果两个字段名字相同，那么在访问的时候就必须使用完整的路径

#### 接口

类型关注于可以做什么，而不是存储了什么

接口通过列举类型必须满足的一组方法来进行声明

在 Go 语言中，不需要显示声明接口

```go
var t interface {
  talk() string
}

type martian struct {}

func (m martian) talk() string {
  return "nack nack"
}

type laser int

func (l laser) talk() string {
  return strings.Repeat("pew ", int(l))
}

func main() {
  t = martian{}
  fmt.Println(t.talk()) // nack nack

  t = laser(3)
  fmt.Println(t.talk()) // pew pew pew
}
```

为了复用，通常会把接口声明为类型

 按约定，接口名称通常以 er 结尾

```go
type talker interface {
  talk() string
}

type martian struct {}

func (m martian) talk() string {
  return "nack nack"
}

type laser int

func (l laser) talk() string {
  return strings.Repeat("pew ", int(l))
}

func shout(t talker) {
  louder := strings.ToUpper(t.talk())
  fmt.Println(louder)
}

/* 接口配合 struct 嵌入特性一起使用 */
type starship struct {
  laser
}

func main() {
   s := starship{laser(3)} 

  shout(martian{}) // NACK NACK
  shout(laser(2)) // PEW PEW
  shout(s) // PEW PEW PEW
}
```

> 同时使用组合和接口将构成非常强大的设计工具


#### 满足接口

Go 语言的接口都是隐式满足的

Go 标准库导出了很多只有单个方法的接口

例如 fmt 包声明的 Stringer 接口

```go
type Stringer interface {
  String() string
}
```

```go
type location struct {
  lat, long float64
}

func (l location) String() string {
  return fmt.Sprintf("%v, %v", l.lat, l.long)
}

func main() {
  curiosity := location{-4.5895, 137.4417}
  fmt.Println(curiosity) // -4.5895, 137.4417
}
```

标准库中常用的接口还包括：io.Reader、io.Writer、http.Handler、json.Marshaler 等

### 指针

指针是指向另一个变量地址的变量

Go 语言的指针同时强调安全性，不会出现迷途指针（dangling pointers）

变量会将它们的值存储在计算机 RAM 里，存储位置就是该变量的内存地址

& 表示地址操作符，通过 & 可以获得变量的内存地址

```go
func main() {
  answer := 42
  fmt.Println(&answer) // 0xc0000140a8 类似的一个地址
}
```

> & 操作符无法获得字符串/数值/布尔字面值的地址，&42，&"hello" 都会导致编译器报错

\* 操作符与 & 的作用相反，它用来解引用，提供内存地址指向的值
  
```go
answer := 42
/* Go 语言不允许 address++ 这样的指针运算进行操作 */
address := &answer
fmt.Println(*address) // 42
fmt.Printf("%T\n", address) // *int
```

> 指针存储的是内存地址
>
> **指针类型**和其他普通类型一样，出现在所有需要用到类型的地方，如变量声明、函数形参、返回值类型、结构体字段等

指针类型

```go
canada := "Canada"
var home *string
fmt.Printf("home is a %T\n", home) // home is a *string
home = &canada
fmt.Println(*home) // Canada
```

> 将 \* 放在类型前面，表示声明一个指针类型
>
> 将 \* 放在变量前面，表示解引用操作，获取指针指向的值

两个指针变量指向同一个内存地址，那么它们就是相等的

#### 指向结构的指针

与字符串和数值不一样，复合字面量的前面可以放置 &

```go
type person struct {
  name, superpower string
  age int
}

timmy := &person{
  name: "Timothy",
  age: 10,
}

timmy.superpower = "flying" // 等价于 (*timmy).superpower = "flying"

fmt.Printf("%+v\n", timmy) // &{name:Timothy superpower:flying age:10}
```

> 访问字段时，对结构体进行解引用并不是必须的

#### 指向数组的指针

和结构体一样，可以把 & 放在数组的复合字面值前面来创建指向数组的指针

```go
superpowers := &[3]string{"flight", "invisibility", "super strength"}

fmt.Println(superpowers[0]) // flight
fmt.Println(superpowers[1:2]) // [invisibility]
```

> 数组在执行索引或切片操作时，会自动解引用，没有必要写 (*superpowers)[0] 这种形式
>
> Go 里面数组和指针是两种完全独立的类型
>
> slice 和 map 的复合字面值前面也可以放置 & 操作符，但是 Go 并没有为它们提供自动解引用的功能


#### 实现修改

Go 语言的函数和方法都是按值传递参数的，这意味着函数总是操作于被传递参数的副本

当指针被传递到函数时，函数将接受传入的内存地址的副本。之后函数可以通过解引用内存地址来修改指针指向的值

```go
type person struct {
  name string
  age int
}

func birthday(p *person) {
  p.age++
}

func main() {
  timmy := &person{
    name: "Timothy",
    age: 10,
  }

  birthday(timmy)
  fmt.Printf("%+v\n", timmy) // &{name:Timothy superpower: age:11}
}
```

#### 指针接收者

方法的接收者和方法的参数在处理指针方面是很相似的

```go
type person struct {
  name string
  age int
}

func (p *person) birthday() {
  p.age++
}

func main() {
  timmy := &person{
    name: "Timothy",
    age: 10,
  }

  timmy.birthday()
  fmt.Printf("%+v\n", timmy) // &{name:Timothy superpower: age:11}

  /* Go 语言在变量通过点标记法进行调用的时候，自动使用 & 取得变量的内存地址 */
  nathan := person{"Nathan", 18}
  nathan.birthday() // (&nathan).birthday()
  fmt.Printf("%+v\n", nathan) // {name:Nathan superpower: age:19}
}
```

> 使用指针作为接收者的策略应该始终如一：如果一种类型的某些方法需要用到指针作为接收者，这种类型的所有方法就应该都是用指针作为接收者

#### 内部指针

Go 提供了内部指针这种特性，它用于确定结构体中指定字段的内存地址

```go
type stats struct {
  level int
  endurance, health int
}

func levelUp(s *stats) {
  s.level++
  s.endurance = 42 + (14 * s.level)
  s.health = 5 * s.endurance
}

type character struct {
  name string
  stats stats
}

func main() {
  player := character{name: "Matthias"}
  levelUp(&player.stats)
  fmt.Printf("%+v\n", player) // {name:Matthias stats:{level:1 endurance:56 health:280}}
}
```
