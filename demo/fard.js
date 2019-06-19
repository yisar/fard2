import { options, scheduleWork } from 'fre'

let uuid = 0
let once = true
export function h (type, props) {
  let rest = []
  let children = []
  let length = arguments.length

  while (length-- > 2) rest.push(arguments[length])
  while (rest.length) {
    let vnode = rest.pop()
    if (vnode && vnode.pop) {
      for (length = vnode.length; length--;) rest.push(vnode[length])
    } else if (vnode === null || vnode === true || vnode === false) {
      vnode = { type: () => {} }
    } else if (typeof vnode === 'function') {
      children = vnode
    } else {
      children.push(
        typeof vnode === 'object'
          ? vnode
          : { type: 'text', props: { nodeValue: vnode } }
      )
    }
  }

  uuid++
  return {
    name: '@' + uuid,
    type,
    props: { ...props, children }
  }
}

export function render (vdom) {
  options.platform = 'miniapp'

  scheduleWork({
    tag: 2,
    props: {
      children: vdom
    }
  })
  let context
  options.commitWork = fiber => {
    let { type, props, name } = fiber.child.child
    console.log(fiber)
    let vdom = { type, props, name }
    uuid = 1

    if (once) {
      Page({
        data: {
          vdom: {}
        },
        onLoad () {
          context = this
          this.setData({
            vdom
          })
        },
        $3_onClick: vdom.props.children[1].props.onClick
      })
      once = false
    } else {
      context.setData({ vdom })
    }
  }
}
