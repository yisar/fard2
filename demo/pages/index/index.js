import { useState } from 'fre'
import { h, render } from '../../fard'

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

render(
  h(App, {
    onLoad: () => console.log('onLoad……'),
    onReady: () => console.log('onReady……'),
    onShow: () => console.log('onShow……'),
    onHide: () => console.log('onHide……')
  })
)
