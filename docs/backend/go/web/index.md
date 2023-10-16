## 使用 Go 创建 Web 应用

- 处理请求
- 模板
- 中间件
- 存储数据
- HTTPS，HTTP2
- 测试
- 部署

```go
package main

import "net/http"

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hell world"))
	})

	http.ListenAndServe("localhost:8080", nil) // 传入 nil，即 DefaultServeMux
}
```

### 处理（Handle）请求

- 如何处理（Handle）Web 请求
  - http.Handle 函数
  - http.HandleFunc 函数

![handler](./imgs/handler.png)

#### 创建 Web Server

http.ListenAndServe(addr string, handler Handler) error

- addr：监听的地址，如果为空字符串，则使用 ":http"，即监听 80 端口
- handler：处理请求的 Handler，如果为空，则使用 DefaultServeMux

DefaultServeMux 是一个 multiplexer，即多路复用器，用于将请求分发到不同的处理器（可以看作是路由器）

```go
http.ListenAndServe("localhost:8080", nil)
```

http.Server 是一个 struct

- Addr 字段表示网络地址
  - 如果为 ""，则使用 ":http"，即监听所有网络接口的 80 端口
- Handler 字段
  - 如果为 nil，则使用 DefaultServeMux
- ListenAndServe 方法

```go
// serve := &http.Server{
serve := http.Server{
	Addr:    "localhost:8080",
	Handler: nil,
}

serve.ListenAndServe()
```

上面两种创建 Web Server 的方式，都只能使用 http。如果要用 https，则需要使用同理的 http.ListenAndServeTLS() 和 server.ListenAndServeTLS() 方法

#### Handler

Handler 是一个接口

```go
type Handler interface {
	ServeHTTP(ResponseWriter, *Request)
}
```

自己实现 Handler 接口

```go
type myHandler struct{}

func (m *myHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello world"))
}

func main() {
	mh := myHandler{}
	server := http.Server{
		Addr:    "localhost:8080",
		Handler: &mh,
	}
	server.ListenAndServe()
}
```

![handler](./imgs/more-handler.png)

#### DefaultServeMux

DefaultServeMux 是一个 multiplexer，即多路复用器，用于将请求分发到不同的处理器（可以看作是路由器）

![DefaultServeMux](./imgs/default-serve-mux.png)

#### 多个 Handler - http.Handle

```go
func Handle(pattern string, handler Handler)
```

不指定 Server struct 里面的 Handler 字段值（指定为 nil）

可以使用 http.Handle 将某个 Handler 附加到 DefaultServeMux 上

- http 包有一个 Handle 函数
- ServerMux struct 也有一个 Handle 方法

如果调用 http.Handle，实际上调用的是 DefaultServeMux 的 Handle 方法

- DefaultServeMux 就是 ServerMux 的指针变量

```go
type helloHandler struct{}

func (h *helloHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello world"))
}

type aboutHandler struct{}

func (a *aboutHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("About!"))
}

func main() {
	hello := helloHandler{}
	about := aboutHandler{}
	server := http.Server{
		Addr:    "localhost:8080",
		Handler: nil, // DefaultServeMux
	}
	http.Handle("/hello", &hello)
	http.Handle("/about", &about)
	server.ListenAndServe()
}
```

#### Handler 函数 - http.HandleFunc

Handler 函数就是那些行为与 handler 类似的函数：

- Handler 函数的签名与 ServeHTTP 方法的签名一样，接收
  - http.ResponseWriter
  - 指向 http.Request 的指针

http.HandleFunc 原理

- Go 有一个函数类型 HandlerFunc。可以将某个具有适当签名的函数 f，适配成为一个 Handler，而这个 Handler 就是调用 f 本身

```go
type helloHandler struct{}

func (h *helloHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello world"))
}

type aboutHandler struct{}

func (a *aboutHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("About!"))
}

func welcome(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Welcome!"))
}

func main() {
	hello := helloHandler{}
	about := aboutHandler{}
	server := http.Server{
		Addr:    "localhost:8081",
		Handler: nil, // DefaultServeMux
	}

	http.Handle("/hello", &hello)
	http.Handle("/about", &about)

	http.HandleFunc("/home", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Home!"))
	})
	// http.HandleFunc("/welcome", welcome)

	http.Handle("/welcome", http.HandlerFunc(welcome))

	server.ListenAndServe()
}
```

http.HandleFunc

- http.HandleFunc(pattern string, handler func(ResponseWriter, \*Request))
- type HandlerFunc func(ResponseWriter, \*Request)

#### 内置的 handlers

- NotFoundHandler
- RedirectHandler
- StripPrefix
- TimeoutHandler
- FileServer

http.NotFoundHandler

- func NotFoundHandler() Handler
- 返回一个 handler，它给每个请求的响应都是 “404 page not found”

http.RedirectHandler

- func RedirectHandler(url string, code int) Handler
- 返回一个 handler，它把每个请求使用给定的状态码跳转到指定的 URL
  - url，要跳转到的 URL
  - code，跳转的状态码（3xx），常见的：StatusMovedPermanently，StatusFound，StatusSeeOther，StatusTemporaryRedirect，StatusPermanentRedirect

http.StripPrefix

- func StripPrefix(prefix string, h Handler) Handler
- 返回一个 handler，它从请求的 URL 中去掉指定的前缀，然后再调用另一个 handler
  - 如果请求的 URL 与提供的前缀不符，那么 404
- 略像中间件
  - prefix，URL 将要被移除的字符串前缀
  - h，是一个 handler，在移除字符串前缀之后，这个 handler 将会收到请求
- 修饰了另一个 handler

http.TimeoutHandler

- func TimeoutHandler(h Handler, dt time.Duration, msg string) Handler
- 返回一个 handler，它在指定的时间内处理请求，如果超时，就返回一个错误信息
- 也相当于是一个修饰器
  - h，将要被修饰的 handler
  - dt，第一个 handler 允许的处理时间
  - msg，如果超时，那么就把 msg 返回给请求，表示响应时间过长

http.FileServer

- func FileServer(root FileSystem) Handler
- 返回一个 handler，它会在 root 中寻找文件，并将其提供给请求

```go
type FileSystem interface {
	Open(name string) (File, error)
}
```

- 使用时需要用到操作系统的文件系统，所以还需要委托给
  - type Dir string
  - func (d Dir) Open(name string) (File, error)

例子

![FileServer](./imgs/file-server-demo.png)

通过 localhost:8081/ 访问 index.html

```go
/* 方法1 */
// http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
// 	http.ServeFile(w, r, "wwwroot" + r.URL.Path)
// })
// http.ListenAndServe(":8081", nil)

/* 方法2 */
http.ListenAndServe(":8081", http.FileServer(http.Dir("wwwroot")))
```

### 请求

- HTTP 请求
- Request
- URL
- Header
- Body

#### HTTP 消息

- HTTP Request 和 HTTP Response（请求和响应）
- 它们具有相同的结构
  - 请求（响应）行
  - 0 个或多个 Header
  - 空行
  - 可选的消息体（Body）
- net/http 包提供了用于表示 HTTP 消息的结构

#### 请求 Request

- Request 是个 struct，代表了客户端发送的 HTTP 请求消息
- 重要的字段
  - URL
  - Header
  - Body
  - Form、PostForm、MultipartForm
- 也可以通过 Request 的方法访问请求中的 Cookie、URL、User Agent 等信息
- Request 既可以代表发送到服务器的请求，又可代表客户端发出的请求

请求的 URL

- Request 的 URL 字段就代表了请求行（请求信息第一行）里面的部分内容
- URL 字段是指向 url.URL 类型的一个指针，url.URL 是一个 struct:

URL 的通用格式：`scheme://[userinfo@]host/path[?query][#fragment]`
不以斜杠开头的 URL 被解释为：`scheme:opaque[?query][#fragment]`

```go
type URL struct {
	Scheme		string
	Opaque		string		// 编码后的不透明数据
	User		*Userinfo	// 用户名和密码信息
	Host		string		// host 或 host:port
	Path		string
	RawPath		string		// 编码后的 path，保留了转义符
	ForceQuery	bool		// 是否在 URL 中添加 ? 强制添加查询参数
	RawQuery	string		// 编码后的查询字符串，没有 '?'
	Fragment	string		// 引用的片段（文档位置），没有 '#'
}
```

URL Query

- RawQuery 会提供实际查询的字符串
- 例如：`http://localhost:8080/?name=abc&age=18`
  - RawQuery 为：`name=abc&age=18`

URL Fragment

- 如果从浏览器发出的请求，就无法提取出 Fragment 字段的值
  - 浏览器在发送请求时会把 fragment 部分去掉
- 但不是所有的请求都是从浏览器发出的（例如从 http 客户端包）

Request Header

- 请求和响应（Request、Response）的 headers 是通过 Header 类型来描述的，它是一个 map，用来表述 HTTP Header 里的 Key-Value 对
- Header map 的 key 是 string 类型，value 是一个字符串切片 []string
- 设置 key 的时候会创建一个空的 []string 作为 value，value 里面第一个元素就是新 header 的值
- 为指定的 key 添加一个新的 header 值，执行 append 操作即可
- r.Header，返回 map
- r.Header["Accept-Encoding"]，返回 [gzip, deflate]，[]string 类型
- r.Header.Get("Accept-Encoding")，返回 gzip, deflate，string 类型

```go
server := http.Server{
	Addr: "localhost:8081",
}

http.HandleFunc("/header", func(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, r.Header)
	fmt.Fprintln(w, r.Header["Accept-Encoding"])
	fmt.Fprintln(w, r.Header.Get("Accept-Encoding"))
})

server.ListenAndServe()
```

Request Body

- 请求和响应的 bodies 都是使用 Body 字段来表示的
- Body 是一个 io.ReadCloser 接口

```go
type ReadCloser interface {
	Reader
	Closer
}
```

- Reader 接口定义了一个 Open() 方法
  - 参数：[]byte
  - 返回：byte 的数量、可选的错误
- Closer 接口定义了一个 Close() 方法
  - 返回：可选的错误
- 想要读取请求 Body 的内容，可以调用 Body 的 Read 方法

```go
server := http.Server{
	Addr: "localhost:8081",
}

http.HandleFunc("/post", func(w http.ResponseWriter, r *http.Request) {
	length := r.ContentLength
	body := make([]byte, length)
	r.Body.Read(body)
	fmt.Fprintln(w, body)
	fmt.Fprintln(w, string(body))
})

server.ListenAndServe()
```

#### 查询参数（Query Parameters）

URL Query

- http://localhost:8080/?name=abc&age=18
  - r.URL.RawQuery 为：`name=abc&age=18`（实际查询的原始字符串）
  - r.URL.Query() 方法返回 map[string][]string
    - map 的 key 是 string 类型
    - map 的 value 是 []string 类型

```go
// http://localhost:8081/query?id=123&name=张三&id=466&name=李四
	server := http.Server{
		Addr: "localhost:8081",
	}

	http.HandleFunc("/query", func(w http.ResponseWriter, r *http.Request) {
		url := r.URL
		query := url.Query()

		id := query["id"]
		log.Println(id)

		name := query.Get("name")
		log.Println(name)
	})

	server.ListenAndServe()
```

#### Form

Request 上的函数允许从 URL 或 / 和 Body 中提取数据，通过如下字段

- Form
- PostForm
- MultipartForm
- FormValue
- PostFormValue
- FormFile
- MultiPartReader

**Form 里面的数据是 key-value 对**

通常的做法是：

- 先调用 ParseForm 或 ParseMultipartForm 来解析 Request
- 然后相应地访问 Form、PostForm、MultipartForm 字段

```html
<form
  action="http://localhost:8080/process"
  method="post"
  enctype="application/x-www-form-urlencoded"
>
  <input type="text" name="name" placeholder="Name" />
  <input type="text" name="email" placeholder="Email" />
  <button type="submit">Submit</button>
</form>
```

```go
server := http.Server{
	Addr: "localhost:8080",
}
http.HandleFunc("/process", func(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	fmt.Fprintln(w, r.Form) // map[email:[2439639832@qq.com] name:[客户1号]]
})
server.ListenAndServe()
```

**PostForm 字段**

- 上例中，如果只想得到 name 这个 Key 的 Value，可以使用 r.Form["name"]，它返回含有一个元素的 slice：["客户 1 号"]
- 如果表单和 URL 里有同样的 Key，那么它们都会放在一个 slice 里：表单里的值靠前，URL 的值靠后
- 如果只想要表单的 key-value 对，不要 URL 的，可以使用 PostForm 字段

```html {2}
<form
  action="http://localhost:8080/process?name=客户2号"
  method="post"
  enctype="application/x-www-form-urlencoded"
>
  <input type="text" name="name" placeholder="Name" />
  <input type="text" name="email" placeholder="Email" />
  <button type="submit">Submit</button>
</form>
```

```go {6-7}
server := http.Server{
	Addr: "localhost:8080",
}
http.HandleFunc("/process", func(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	fmt.Fprintln(w, r.Form) // map[email:[2439639832@qq.com] name:[客户1号 客户2号]]
	fmt.Fprintln(w, r.PostForm) // map[email:[2439639832@qq.com] name:[客户1号]]
})
server.ListenAndServe()
```

**MultipartForm 字段**

- PostForm 只支持 application/x-www-form-urlencoded 编码
- 要想得到 multipart/form-data 对，必须使用 MultipartForm 字段
- 要想使用 MultiPartForm 字段，必须先调用 ParseMultipartForm 方法
  - 该方法会在必要时调用 ParseForm 方法
  - 参数是需要读取数据的长度
- MultipartForm 只包含表单的 key-value 对
- 返回类型是一个 struct，这个 struct 里面有两个 map：
  - key 是 string，value 是 []string
  - key 是 string，value 是 文件

```html {4}
<form
  action="http://localhost:8080/process?name=客户2号"
  method="post"
  enctype="multipart/form-data"
>
  <input type="text" name="name" placeholder="Name" />
  <input type="text" name="email" placeholder="Email" />
  <button type="submit">Submit</button>
</form>
```

```go {6}
server := http.Server{
	Addr: "localhost:8080",
}
http.HandleFunc("/process", func(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(1024)
	fmt.Fprintln(w, r.MultipartForm) // &{map[email:[2439639832@qq.com] name:[客户1号]] map[]}
})
server.ListenAndServe()
```

**FormValue 和 PostFormValue 方法**

- FormValue 会返回 Form 字段中指定 key 对应的第一个 value
  - 无需调用 ParseForm 或 ParseMultipartForm
- PostFormValue 也一样，但只能读取 PostForm 字段
- FormValue 和 PostFormValue 都会调用 ParseMultipartForm 方法

**上传文件**

multipart/form-data 最常见的应用场景就是上传文件

- 首先调用 ParseMultiPartForm 方法
- 从 File 字段获得 FileHeader，调用其 Open 方法来获得文件
- 可以使用 io.ReadAll 函数把文件内容读取到 byte 切片里

```html
<form
  action="http://localhost:8080/process?name=客户2号"
  method="post"
  enctype="multipart/form-data"
>
  <input type="text" name="name" placeholder="Name" />
  <input type="text" name="email" placeholder="Email" />
  <input type="file" name="file" />
  <button type="submit">Submit</button>
</form>
```

```go
func process(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(1024)

	fileHeader := r.MultipartForm.File["file"][0]
	file, err := fileHeader.Open()
	if err == nil {
		data, err := io.ReadAll(file)
		if err == nil {
			fmt.Fprintln(w, string(data))
		}
	}
}

func main() {
	server := http.Server{
		Addr: "localhost:8080",
	}

	http.HandleFunc("/process", process)

	server.ListenAndServe()
}

```

**FormFile 方法**

- 上传文件还有一个简便方法：FormFile
  - 无需调用 ParseMultipartForm 方法
  - 返回指定 key 对应的第一个 value
  - 同时返回 File 和 FileHeader，以及错误信息
  - 如果只上传一个文件，那么这种方式会快一些

```go
func process(w http.ResponseWriter, r *http.Request) {
	// r.ParseMultipartForm(1024)

	// fileHeader := r.MultipartForm.File["file"][0]
	// file, err := fileHeader.Open()

	file, _, err := r.FormFile("file")

	if err == nil {
		data, err := io.ReadAll(file)
		if err == nil {
			fmt.Fprintln(w, string(data))
		}
	}
}
```

**MultiPartReader()**

- func (r *Request) MultiPartReader() (*multipart.Reader, error)
- 如果是 multipart/form-data 或 multipart 混合的 POST 请求
  - MultiPartReader 方法会返回一个 MIME multipart reader
  - 否则返回一个错误
- 可以使用该函数代替 ParseMultipartForm，来把请求的 body 作为 stream 进行处理
  - 不是把表单作为一个对象来处理的，不是一次性获得整个 map
  - 逐个检查来自表单的值，然后每次处理一个

#### POST 请求 - JSON Body

- 不是所有的 POST 请求都来自 Form
- 客户端框架（例如 Angular 等）会议不同的方式对 POST 请求编码：
  - jQuery 通常使用 application/x-www-form-urlencoded
  - Angular 通常使用 application/json
- ParseForm 方法无法处理 application/json

### 响应

#### ResponseWriter

- 从服务器向客户端返回响应需要使用 ResponseWriter
- ResponseWriter 是一个接口，handler 用它来返回响应
- 真正支撑 ResponseWriter 的幕后 struct 是非导出的 http.response

**写入到 ResponseWriter**

- Write 方法接收一个 byte 切片作为参数，然后把它写入到 HTTP 响应的 body 里
- 如果在 Write 方法被调用时， header 里面没有设定 content-type，那么数据的前 512 字节就会用来被检测 content type

```go
func writeExample(w http.ResponseWriter, r *http.Request) {
	str := `<html>
<head><title>Go Web</title></head>
<body><h1>Hello World</h1></body>
</html>
`
	w.Write([]byte(str))
}


func main() {
	server := http.Server{
		Addr: "localhost:8080",
	}
	http.HandleFunc("/write", writeExample)
	server.ListenAndServe()
}
```

```bash
curl -i localhost:8080/write

# HTTP/1.1 200 OK
# Date: Sun, 15 Oct 2023 08:38:27 GMT
# Content-Length: 84
# Content-Type: text/html; charset=utf-8

# <html>
# <head><title>Go Web</title></head>
# <body><h1>Hello World</h1></body>
# </html>
```

#### WriteHeader 方法

- WriteHeader 方法接收一个整数类型（HTTP 状态码）作为参数，并把它作为 HTTP 响应的状态码返回
- 如果该方法没有显示调用，那么在第一次调用 Write 方法前，会隐式地调用 WriteHeader(http.StatusOK)
  - 所以 WriteHeader 主要用来发送错误类的 HTTP 状态码
- 调用完 WriteHeader 方法之后，仍然可以写入到 ResponseWriter，但无法再修改 header 了

```go
func writeHeaderExample(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(501)
	fmt.Fprintln(w, "No such service, try next door")
}


func main() {
	server := http.Server{
		Addr: "localhost:8080",
	}
	http.HandleFunc("/writeheader", writeHeaderExample)
	server.ListenAndServe()
}
```

```bash
curl -i localhost:8080/writeheader

# HTTP/1.1 501 Not Implemented
# Date: Sun, 15 Oct 2023 12:44:53 GMT
# Content-Length: 31
# Content-Type: text/plain; charset=utf-8

# No such service, try next door
```

#### Header 方法

- Header 方法返回 headers 的 map，可以进行修改
- 修改后的 headers 将会体现在返回给客户端的 HTTP 响应里

```go
type Post struct {
	User string
	Threads []string
}

func headerExample(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Location", "http://google.com")
	w.WriteHeader(302)
}

func jsonExample(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	post := &Post{
		User: "Sau Sheong",
		Threads: []string{"first", "second", "third"},
	}
	json, _ := json.Marshal(post)
	w.Write(json)
}


func main() {
	server := http.Server{
		Addr: "localhost:8080",
	}
	http.HandleFunc("/header", headerExample)
	http.HandleFunc("/json", jsonExample)
	server.ListenAndServe()
}
```

```bash
curl -i localhost:8080/header

# HTTP/1.1 302 Found
# Location: http://google.com
# Date: Sun, 15 Oct 2023 12:50:47 GMT
# Content-Length: 0

curl -i localhost:8080/json

# HTTP/1.1 200 OK
# Content-Type: application/json
# Date: Sun, 15 Oct 2023 12:56:51 GMT
# Content-Length: 58

# {"User":"Sau Sheong","Threads":["first","second","third"]}
```

#### 内置的 Response

- NotFound 函数，包装一个 404 状态码和一个额外的信息
- ServeFile 函数，从文件系统提供文件，返回给请求者
- ServeContent 函数，它可以把实现了 io.ReadSeeker 接口的任何东西里面的内容返回给请求者
  - 还可以处理 Range 请求（范围请求），如果只请求了资源的一部分内容，那么 ServeContent 就可以如此响应。而 ServeFile 或 io.Copy 就不行
- Redirect 函数，告诉客户端重定向到另一个 URL

### 模板

- Web 模板就是预先设计好的 HTML 页面，它可以被模板引擎反复的使用，来产生 HTML 页面
- Go 的标准库提供了 text/template 和 html/template 两个模板库
  - 大多数 Go 的 Web 框架都使用这些库作为默认的模板引擎

**模板与模板引擎**

模板引擎可以合并模板与上下文数据，产生最终的 HTML

**Go 的模板引擎**

- 主要使用的是 text/template，HTML 相关的部分使用了 html/template，是个混合体
- 模板可以完全无逻辑，但又具有足够的嵌入特性
- 和大多数模板引擎一样，Go Web 的模板位于无逻辑和嵌入逻辑之间的某个地方

**关于模板**

- 模板必须是可读的文本格式，扩展名任意。对于 Web 应用通常就是 HTML
  - 里面会内嵌一些命令（叫作 action）
- text/template 是通用模板引擎，html/template 是 HTML 模板引擎
- action 位于双层花括号之间：{{.}}
  - 这里的 . 就是一个 action
  - 它可以命令模板引擎将其替换成一个值

**使用模板引擎**

1. 解析模板源（可以是字符串或模板文件），从而创建一个解析好的模板的 struct
2. 执行解析好的模板，并传入 ResponseWriter 和数据
   - 这会触发模板引擎组合解析好的模板和数据，来产生最终的 HTML，并将它传递给 ResponseWriter

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style></style>
  </head>

  <body>
    {{ . }}
  </body>
</html>
```

```go
func process(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("tmpl.html")
	t.Execute(w, "Hello World")
}


func main() {
	server := http.Server{
		Addr: "localhost:8080",
	}
	http.HandleFunc("/process", process)
	server.ListenAndServe()
}
```
