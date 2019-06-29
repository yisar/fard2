import { useState } from 'fre'
import { render, h } from '../../fard'

function App () {
  return h(
    'view',
    {
      class: 'app'
    },
    [h(Counter, { msg: 'hello fard' }), h(Child, null)]
  )
}

function Counter ({ msg }) {
  const [count, setCount] = useState(0)

  return h('view', {}, [
    h('view', {}, [
      h(
        'text',
        {
          class: 'text'
        },
        count
      )
    ]),
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

function Child () {
  return h('view', {}, [
    h('view', {}, [h('text', {}, '111')]),
    h('view', {}, [h('text', {}, '222')])
  ])
}

render(h(App, null))
