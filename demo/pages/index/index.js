import {
  scheduleWork,
  options,
  useState
} from 'fre'
import {
  h
} from '../../fard'

function Counter() {
  const [count, setCount] = useState(0)

  return h('view', {}, [
    h('text', {}, count),
    h('button', {
      class: 'btn',
      onclick: function click() {
        console.log(111)
        setCount(count + 1)
      }
    }, '+')
  ])
}

function render(vdom) {
  options.platform = 'miniapp'
  scheduleWork({
    tag: 2,
    props: {
      children: vdom
    }
  })
  options.commitWork = fiber => {
    let {
      type,
      props,
      name
    } = fiber.child.child
    let vdom = {
      type,
      props,
      name
    }

    Page({
      data: {
        vdom: {}
      },
      onLoad() {
        this.setData({
          vdom
        })
        console.log(vdom)
      }
    })
  }
}

render(h(Counter, {}, []))