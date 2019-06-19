import { useState } from 'fre'
import { h, render } from '../../fard'

function Counter () {
  const [count, setCount] = useState(0)

  return h('view', {}, [
    h('text', {}, count),
    h(
      'button',
      {
        class: 'btn',
        onClick: () => {
          setCount(count + 1)
        },
        onclick: '$3_onClick'
      },
      '+'
    )
  ])
}

render(h(Counter, null))
