<p align="center"><img src="https://ae01.alicdn.com/kf/HTB1gg8cc8aE3KVjSZLeq6xsSFXaQ.jpg" alt="fard logo" width="200px"></p>

# fard [![NPM version](https://img.shields.io/npm/v/fard.svg?style=flat-square)](https://npmjs.com/package/fard) [![NPM downloads](https://img.shields.io/npm/dt/fard.svg?style=flat-square)](https://npmjs.com/package/fard)

:snowman: fre 转小程序的新思路 ♂ learn once, write anywhere.

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
由于小程序不支持 babel，所以以上代码仍然需要 webpack 打包

工作日每天搞一点点，节假日会大更新~