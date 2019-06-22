import { useState } from 'fre'
import { h, render } from '../../fard'

function App () {
  return h(
    'view',
    {
      class: 'app'
    },
    [
      h(Counter, { msg: 'I am props' }),
      h(
        'navigator',
        {
          url: '../user/user?name=jack',
          class: 'link'
        },
        'go jack'
      ),
      h('video', {
        class:'tv',
        src:
          'https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo/607272_aef7b86dff4ebf97649415dc1359bf7f.mp4'
      })
    ]
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
