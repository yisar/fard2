<p align="center"><img src="https://ae01.alicdn.com/kf/HTB1gg8cc8aE3KVjSZLeq6xsSFXaQ.jpg" alt="fard logo" width="200px"></p>

# fard [![NPM version](https://img.shields.io/npm/v/fard.svg?style=flat-square)](https://npmjs.com/package/fard) [![NPM downloads](https://img.shields.io/npm/dt/fard.svg?style=flat-square)](https://npmjs.com/package/fard)

:snowman: [fre](https://github.com/132yse/fre) 转小程序的新思路 ♂ learn once, write anywhere.

> 工作日每天搞一点点，节假日会大更新~

### Use

```xml
<import src="../../bridge.wxml"/> <!--brideg.wxml 由 webpack 自动生成-->
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

### props

fard 使用 fre 的组件化机制，通过 props 进行通信

```js
const Child = props => <text>{props.value}</text>
const Parent = () => <Child value="Hello Fard!" />
```

同时支持 render props

```js
const HelloBox = () => <Box render={value => <text>{value}</text>} />
const Box = props => <view>{props.render('Hello Fard!')}</view>
```

### fard-webpack-plugin

fard 原理上是无需编译的，但是小程序不支持 babel 不支持 stylus ，最终还是需要 webpack 打包

借助 webpack，还可以顺便做一些构建的工作，如 `生成 template bridge`、`复制小程序的配置文件`

`fard-webpack-plugin` 是 fard 唯一一个额外的插件，用来包办 webpack 相关

```js
const FardWebpackPlugin = require('fard-webpack-plugin')

plugins: [
  new FardWebpackPlugin({
    filename: 'bridge.wxml', //事先生成的 bridge template
    nodes: 20, // 每个组件的最大节点数，数量越少，性能越好
  }),
]
```

### shortscreen

<img src="https://ae01.alicdn.com/kf/HTB1hwrVdfWG3KVjSZFP5jXaiXXaZ.gif" width="300px"/>
