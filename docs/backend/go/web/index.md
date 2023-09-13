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
