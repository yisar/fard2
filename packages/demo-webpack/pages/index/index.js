import { useState } from 'fre'
import { h, render } from '../../fard'
import './index.styl'

function Counter () {
  const [count, setCount] = useState(0)
  return (
    <view>
      <text class='text'>{count}</text>
      <button class='btn' onClick={() => setCount(count + 1)}>
        +
      </button>
      <button class='btn' onClick={() => setCount(count - 1)}>
        -
      </button>
    </view>
  )
}

const options = {
  onReady () {
    console.log('ready……')
  }
}

render(<Counter />, options)
