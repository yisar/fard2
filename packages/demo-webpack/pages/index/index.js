import React, { useState } from 'react'
import { render, unstable_setBridgreType } from 'fard'
import './index.styl'

unstable_setBridgreType('template')

function Counter () {
  const [count, setCount] = useState(0)
  return (
    <view>
      <text className='text'>{count}</text>
      <button className='btn' onClick={() => setCount(count + 1)}>
        +
      </button>
      <button className='btn' onClick={() => setCount(count - 1)}>
        -
      </button>
    </view>
  )
}

render(Counter)
