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

function Counter ({ msg }) {
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
        onClick: () => setCount(count + 1)
      },
      '+'
    ),
    h(
      'text',
      {
        class: 'footer'
      },
      msg
    )
  ])
}

render(h(App, null))
