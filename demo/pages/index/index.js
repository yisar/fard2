import { useState, h } from 'fre'
import { render } from '../../fard'

function App () {
  return h(
    'view',
    {
      class: 'app'
    },
    h(Counter, { msg: 'hello fard' })
  )
}

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
        onClick: () => {
          setCount(count + 1)
        }
      },
      '+'
    )
  ])
}

render(h(Counter, null))
