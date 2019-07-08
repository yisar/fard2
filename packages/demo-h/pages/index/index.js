// FIXME: WeChat dev tools doesn't support symlink out of `demo-h`
// so we have to link dependencies manually
import { useState } from '../../npm/fre'
import { h, render } from '../../npm/fard'

function App () {
  return h(
    'view',
    {
      class: 'app'
    },
    [h(Counter, { msg: 'hello fard' })]
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
        onClick: () => {
          setCount(count + 1)
        }
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
