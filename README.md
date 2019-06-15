<p align="center"><img src="https://ae01.alicdn.com/kf/HTB16X0Xc8WD3KVjSZFs763qkpXam.png" alt="fard logo" width="250px"></p>

# fard [![NPM version](https://img.shields.io/npm/v/fard.svg?style=flat-square)](https://npmjs.com/package/fard) [![NPM downloads](https://img.shields.io/npm/dt/fard.svg?style=flat-square)](https://npmjs.com/package/fard)

:snowman: New way to build mini programs with Fre runtime.

### Use
```js
import { useState } from 'fre'
import { h, render } from 'fre/wx'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <view>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </view>
  )
}

render(<Counter />)
```