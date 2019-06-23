import { useState } from 'fre'
import { h, render } from '../../fard'

function App () {
  return h('scroll-view', {}, [
    h('view', {}, [h('view',{
      class:'item'
    })]),
    h('view', {}, [h('view')])
  ])
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

// [
//   h(Counter, { msg: 'I am props' }),
//   h(
//     'navigator',
//     {
//       url: '../user/user?name=jack',
//       class: 'link'
//     },
//     'go jack'
//   ),
//   h('view', {}, [h('text', {}, 'hello world')]),
//   h('view', {}, [h('text', {}, 'hello fard')])
// ]
