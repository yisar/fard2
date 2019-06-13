# fard
A progressive framework for building mini programme with Fre.

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