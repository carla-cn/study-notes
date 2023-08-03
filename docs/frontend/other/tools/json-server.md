---
title: 小工具
---

## JSON Server

模拟数据接口

### 开始

安装

```bash
npm install -g json-server
```

创建一个 db.json 文件

```json
{
	"posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
	"comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
	"profile": { "name": "typicode" }
}
```

启动

```bash
json-server --watch db.json
```

> 注意：
>
> - POST, PUT, PATCH, DELETE 请求带来的改变会出现在 db.json 中
> - 请求体必须是对象
> - id 不可变。使用 PUT / PATCH 请求改变 id 的值将会被忽略，用 POST 创建的 id 也不能与已有的重复
> - POST / PUT / PATCH 请求必须设置 `Content-Type: application/json`

### 路由

#### 默认路由

基于上述的 db.json，所有的默认路由如下：

| 路由              | 描述             |
| ----------------- | ---------------- |
| `GET /posts`      | 所有的 posts     |
| `GET /posts/1`    | 单个 post        |
| `GET /profile`    | profile 对象     |
| `POST /posts`     | 创建一个 post    |
| `POST /profile`   | 创建一个 profile |
| `PUT /posts/1`    | 替换一个 post    |
| `PUT /profile`    | 替换一个 profile |
| `PATCH /posts/1`  | 更新一个 post    |
| `PATCH /profile`  | 更新一个 profile |
| `DELETE /posts/1` | 删除一个 post    |

#### 过滤

用 `.` 访问深层属性

```bash
GET /posts?title=json-server&author=typicode
GET /comments?author.name=typicode
```

#### 分页

```bash
GET /posts?_page=7
GET /posts?_page=7&_limit=20 # _limit 默认为 10
```

#### 排序

默认升序，降序加 `_order=desc`

```bash
GET /posts?_sort=views
GET /posts/1/comments?_sort=votes&_order=desc

# 多个字段排序
GET /posts?_sort=user,views&_order=desc,asc
```

#### 切片

行为同 Array.slice，不包含 \_end

```bash
GET /posts?_start=20&_end=30
GET /posts/1/comments?_start=20&_end=30
GET /posts/1/comments?_start=20&_limit=10
```

#### 操作符

`_gte` `_lte`，取得范围内的值

```bash
GET /posts?views_gte=10&views_lte=20
```

`_ne`，排除值

```bash
GET /posts?id_ne=1
```

`_like`，模糊查询（可以使用 RegExp）

```bash
GET /posts?title_like=server
```

#### 全文搜索

`q` 参数，搜索所有的字段

```bash
GET /posts?q=internet
```

#### 关系

`_embed`，获取子资源

```bash
GET /posts?_embed=comments
GET /posts/1?_embed=comments
```

`_expand`，获取父资源

```bash
GET /comments?_expand=post
GET /comments/1?_expand=post
```

创建或者获取嵌套资源

```bash
GET /posts/1/comments
POST /posts/1/comments
```
