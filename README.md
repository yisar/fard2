<p align="center"><img src="https://ae01.alicdn.com/kf/HTB1gg8cc8aE3KVjSZLeq6xsSFXaQ.jpg" alt="fard logo" width="200px"></p>

# fard [![NPM version](https://img.shields.io/npm/v/fard.svg?style=flat-square)](https://npmjs.com/package/fard) [![NPM downloads](https://img.shields.io/npm/dt/fard.svg?style=flat-square)](https://npmjs.com/package/fard)

:snowman: fre 转小程序的新思路 ♂ learn once, write anywhere.

> 工作日每天搞一点点，节假日会大更新~

### Use

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

### fard-webpack-plugin

fard 原理上是无需编译的，但是小程序不支持 babel 不支持 stylus ，最终还是需要 webpack 打包

`fard-webpack-plugin` 是 fard 唯一一个额外的插件，用来包办 webpack 相关

```js
const FardWebpackPlugin = require('fard-webpack-plugin')

plugins: [
  new FardWebpackPlugin({
    filename: 'base.wxml', //需要事先打包的 template，后缀可以是 wxml、axml
    nestedlevel: 5, // jsx 嵌套层级数，不要嵌套太多层，默认 5
  }),
]
```

### shortscreen

<img src="https://ae01.alicdn.com/kf/HTB1hwrVdfWG3KVjSZFP5jXaiXXaZ.gif" width="300px"/>
