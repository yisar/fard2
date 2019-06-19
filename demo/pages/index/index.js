import { useState } from 'fre'
import { h, render } from '../../fard'

function Counter () {
  const [count, setCount] = useState(0)

  return h('view', {}, [
    h(
      'text',
      {
        class: 'text'
      },
      count
    ),
    h(
      'button',
      {
        class: 'button',
        onClick: () => setCount(count + 1),
        onclick: '$onClick'
      },
      '+'
    )
  ])
}

render(h(Counter, null))
