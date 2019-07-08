<p align="center"><img src="https://ae01.alicdn.com/kf/HTB1gg8cc8aE3KVjSZLeq6xsSFXaQ.jpg" alt="fard logo" width="200px"></p>

# fard [![NPM version](https://img.shields.io/npm/v/fard.svg?style=flat-square)](https://npmjs.com/package/fard) [![NPM downloads](https://img.shields.io/npm/dt/fard.svg?style=flat-square)](https://npmjs.com/package/fard) [![QQ](https://img.shields.io/badge/qq.group-813783512-ff69b4.svg?maxAge=2592000&style=flat-square)](https://jq.qq.com/?_wv=1027&k=5Zyggbc)

:snowman: [fre](https://github.com/132yse/fre) 转小程序的新思路 ♂ learn once, write anywhere.

> 工作日只处理 issue，节假日迭代~

| Package                                                                            | Version                                                      | About          |
|------------------------------------------------------------------------------------|--------------------------------------------------------------|----------------|
| [`Fard`](https://github.com/132yse/fard)                                           | ![npm](https://img.shields.io/npm/v/fard.svg)                | fard core      |
| [`fard-webpack-plugin`](https://github.com/132yse/fard/tree/master/webpack-plugin) | ![npm](https://img.shields.io/npm/v/fard-webpack-plugin.svg) | webpack plugin |

## Usage

```js
import { useState } from 'fre'
import { h, render } from 'fard'
import './index.styl'

function App() {
  const [count, setCount] = useState(0)
  return (
    <view>
      <text>{count}</text>
      <button onClick={() => setCount(count + 1)}>+</button>
    </view>
  )
}

render(<App />)
```

以上，由于小程序不支持 babel 和 stylus，所以仍然需要借助 webpack

完整的 demo 用例在这里：[webpack-demo](https://github.com/132yse/fard/tree/master/demo/webpack)

### hooks

所有 fre 的 hooks API 都是支持的

hooks 相关行为都发生在 fre 层，和小程序无关，不做赘述，请移步：[fre readme](https://github.com/132yse/fre)

### api & context

fard 提供 api 对象，用来抹平各个端的差异

```js
import { h, render, api, context } from 'fard'

function App() {
  const toJack = () => {
    api.navigateTo({
      url: '../user/user?name=jack',
    })
    console.log(context)
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

context 是 this 实例

### setup

有时候，我们需要自定义一些方法，比如生命周期，和小程序的默认事件

此时需要用到 render 的第二个参数

```js
const setup = {
  onReady() {
    //生命周期
    console.log('onReady……')
  },
  onShareAppMessage(res) {
    //微信自带的方法
    return {
      title: '转发',
      path: '/pages/index/index',
      success(res) {
        console.log('成功', res)
      },
    }
  },
}

render(<App />, setup)
```

注意，只有根组件和原生组件拥有生命周期，而内置的 fre 组件，请使用 `useEffect`

### fard-webpack-plugin

借助 webpack，还可以顺便做一些构建的工作，如 `生成 template bridge`、`复制小程序的配置文件`

`fard-webpack-plugin` 是 fard 唯一一个额外的插件，用来包办 webpack 相关

```js
const FardWebpackPlugin = require('fard-webpack-plugin')

plugins: [
  new FardWebpackPlugin(),
]
```

### template bridge

经过 fard-webpack-plugin 声称的 bridge.wxml 是用来桥接的文件，无需关注其内容

我们只需要在我们每个 page 的 wxml 引用它即可：

```xml
<fard vdom="{{vdom}}">
```

写死的，不用修改

## 原理

fard 之所以称之为新思路，是因为它不同于其他编译型框架，它的原理和 RN 类似，是比较好的跨端方案

如图：

![](https://ae01.alicdn.com/kf/HTB1hkZ2Xlv0gK0jSZKbq6zK2FXax.jpg)

它通过 bridge 来桥接 fre 和小程序的 vdom，是在小程序里跑 fre 而不是将 fre 编译成小程序

另外，fard 还在 setData 之前做了一层 diff/防抖/压缩 三连，性能靠谱

这里有一篇详细的文章：[fard：fre 转小程序的新思路](https://zhuanlan.zhihu.com/p/70363354)

## How to contribute

Since `fard` use monorepo managed by [lerna](https://github.com/lerna/lerna) you should install `lerna` at first.

```bash
npm i -g lerna
```

Then install all dependencies:

```bash
lerna bootstrap
```

For example run these commands if you'd like to run fard-demo with Webpack:

```bash
cd packages/demo-webpack
yarn start
```

## Contributors

| [![](https://avatars0.githubusercontent.com/u/12951461?s=300&v=4)](https://github.com/132yse)                |     [![](https://avatars2.githubusercontent.com/u/1812118?s=300&v=4)](https://github.com/malash)         | [![](https://avatars2.githubusercontent.com/u/622789?s=300&v=4)](https://github.com/Jimexist)    |