<p align="center"><img src="https://ae01.alicdn.com/kf/HTB1gg8cc8aE3KVjSZLeq6xsSFXaQ.jpg" alt="fard logo" width="200px"></p>

# fard [![NPM version](https://img.shields.io/npm/v/fard.svg?style=flat-square)](https://npmjs.com/package/fard) [![NPM downloads](https://img.shields.io/npm/dt/fard.svg?style=flat-square)](https://npmjs.com/package/fard)

:snowman: [fre](https://github.com/132yse/fre) 转小程序的新思路 ♂ learn once, write anywhere.

> 工作日只处理 issue，节假日迭代~

### Use

```xml
<import src="../../bridge.wxml"/> <!--brideg.wxml 由 fard-webpack-plugin 构建-->
<template is="{{vdom.name}}" data="{{...vdom}}" wx:if="{{vdom.name}}"/>
```

```js
import { useState } from 'fre'
import { h, render } from 'fard'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <view>
      <text>{count}</text>
      <button onClick={() => setCount(count + 1)}>+</button>
    </view>
  )
}

render(<Counter />)
```

以上，改造了 render 和 h 方法，其中 h 方法无需关心

由于非 web 环境，不存在 dom ，所以 render 不需要第二个参数

### hooks

所有 fre 的 hooks API 都是支持的

hooks 相关行为都发生在 fre 层，和小程序无关，不做赘述，请移步：[fre readme](https://github.com/132yse/fre)

### api

fard 提供 api 对象，用来抹平各个端的差异

```js
import { h, render, api } from 'fard'

function App() {
  const toJack = () => {
    api.navigateTo({
      url: '../user/user?name=jack'
    })
  }
  return (
    <view>
      <button onClick={toJack}>+</button>
    </view>
  )
}

render(<App />)
```
如上，api 等同于 wx、my、tt、swan，会根据环境自行更换命名空间

### Lifecycle

由于 render 一次相当于生成一个 Page，所以支持 Page 的生命周期，它通过根组件的 props 进行传递

```js
const onLoad = () => console.log('onLoad……')
const onShow = () => console.log('onShow……')
const onReady = () => console.log('onReady……')
const onHide = () => console.log('onHide……')

render(
  <App onLoad={onLoad} onShow={onShow} onReady={onReady} onHide={onHide} />
)
```

注意，只有根组件和原生组件拥有生命周期，而内置的 fre 组件，请使用 `useEffect`

### fard-webpack-plugin

fard 原理上是无需编译的，但是小程序不支持 babel 不支持 stylus ，最终还是需要 webpack 打包

借助 webpack，还可以顺便做一些构建的工作，如 `生成 template bridge`、`复制小程序的配置文件`

`fard-webpack-plugin` 是 fard 唯一一个额外的插件，用来包办 webpack 相关

```js
const FardWebpackPlugin = require('fard-webpack-plugin')

plugins: [
  new FardWebpackPlugin({
    filename: 'bridge.wxml', //事先生成的 bridge template
    viewLevel: 10, // view 标签嵌套的层级数
    ignoreElements: {
      'my-component': ['name', 'msg'],
    }, //设置忽略元素，渲染时会将其认为是原生组件而不是 fre 组件
  }),
]
```

### template bridge

经过 fard-webpack-plugin 声称的 bridge.wxml 是用来桥接的文件，无需关注其内容

我们只需要在我们每个 page 的 wxml 引用它即可：

```xml
<import src="../../bridge.wxml"/>
<template is="{{vdom.name}}" data="{{...vdom}}" wx:if="{{vdom.name}}"/>
```

写死的，不用修改

### 原理

fard 之所以称之为新思路，是因为它不同于其他编译型框架，它的原理和 RN 类似，是比较好的跨端方案

如图：

![](http://tva1.sinaimg.cn/large/0060lm7Tly1g4jfdp3i3sj30d00mkwh0.jpg)

它通过 template bridge 来桥接 fre 和小程序的 vdom，是在小程序里跑 fre 而不是将 fre 编译成小程序

另外，fard 还在 setData 之前做了一层 diff 处理，性能靠谱

这里有一篇详细的文章：[fard：fre 转小程序的新思路](https://zhuanlan.zhihu.com/p/70363354)

### shortscreen

<img src="https://ae01.alicdn.com/kf/HTB1hwrVdfWG3KVjSZFP5jXaiXXaZ.gif" width="300px"/>
