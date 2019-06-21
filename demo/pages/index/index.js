import {
  useState
} from 'fre'
import {
  h,
  render
} from '../../fard'

function App() {
  return h(
    'view', {
      class: 'app'
    }, [
      h(Counter, null),
      h('text', {
        class: 'footer'
      }, '© fard.js 2019')
    ]
  )
}

function Counter() {
  const [count, setCount] = useState(0)

  return h('view', {}, [
    h(
      'text', {
        class: 'text'
      },
      count
    ),
    h(
      'button', {
        class: 'button',
        onClick: () => setCount(count + 1)
      },
      '+'
    )
  ])
}

render(h(App, null))