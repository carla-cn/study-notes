## 了解

### 状态

- 不关心过程，只关心界面处于哪个状态
- 状态是动态数据，当前造成的结果。也就是 model 形成的 view

### 软件究竟在做什么

- 软件工程的核心，就是在管理数据
- 如果有一个功能需要开发的时候，首先考虑的是，一个数据的生命周期和作用范围

### 性能优化的两种方式

- 协商缓存
- 提前拿数据，prefetch preload prerender

## 状态管理

### 状态机应该具备的能力

- 有独立的区域存储数据，并且能被拿到
  - 闭包
  - 单例模式
- 有修改数据的明确方法，并且，能够让使用数据的地方感知到
  - 发布订阅
  - Proxy / Object.defineProperty
- model 的改变触发 view 的更新
  - forceUpdate
  - $forceUpdate
  - data.x = Math.random()

### 状态管理简易实现

```js
export const createData = (initialData) => {
  let data = initialData;
  const deps = [];

  const getData = () => data;

  const modifyData = (newData) => {
    data = newData;
    deps.forEach((fn) => fn());
  };

  const subscribeData = (handler) => {
    deps.push(handler);
  };

  return {
    getData,
    modifyData,
    subscribeData
  };
};
```

```jsx
import { useEffect, useState } from "react";
import { createData } from "./data";

const initialData = { count: 2 };
const { getData, modifyData, subscribeData } = createData(initialData);

const Demo = () => {
  const [state, setState] = useState(initialData);

  const change0 = () => {
    modifyData({ count: 0 });
  };

  const change1 = () => {
    modifyData({ count: 1 });
  };

  useEffect(() => {
    // 只需要订阅一次
    subscribeData(() => {
      const curData = getData();
      console.log("the cur data is", curData);
      setState(curData);
    });
  }, []);

  return (
    <div>
      {state.count}
      <button onClick={change0}>点击切换为0</button>
      <button onClick={change1}>点击切换为1</button>
    </div>
  );
};

export default Demo;
```
