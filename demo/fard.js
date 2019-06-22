import { options, scheduleWork } from 'fre'

let uuid = 0
let once = true
let handlerMap = {}

export function render (vdom) {
  uuid = 1
  options.platform = 'miniapp'
  scheduleWork({
    tag: 2,
    props: {
      children: vdom
    }
  })
  let context
  options.commitWork = fiber => {
    uuid = 1
    let { type, props, name } = fiber.child.child
    let vdom = { type, props, name }

    if (once) {
      let hostCofig = {
        data: {
          vdom: {}
        },
        onLoad () {
          context = this
          this.setData({
            vdom
          })
        }
      }
      for (let k in handlerMap) {
        hostCofig[k] = handlerMap[k]
      }
      Page(hostCofig)
      once = false
    } else {
      context.setData({
        vdom
      })
      for (let k in handlerMap) {
        context[k] = handlerMap[k]
      }
    }
  }
}

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
      vnode = {
        type: () => {}
      }
    } else if (typeof vnode === 'function') {
      children = vnode
    } else {
      children.push(vnode)
    }
  }

  if (type === 'text' || type === 'button') {
    props.nodeValue = children[0]
    children = []
  }
  if ((props || {}).onClick) {
    let key = '$' + uuid + 'onClick'
    handlerMap[key] = props.onClick || ''
    props.onclick = key
  }

  if (type === 'view') {
    type = 'view$' + uuid
    uuid++
  }

  return {
    type,
    name: typeof type === 'function' ? 'hook' : type,
    child: typeof type === 'function' ? type(props) : null,
    props: { ...props, children }
  }
}
