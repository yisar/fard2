import { options, scheduleWork } from 'fre'

let uuid = 0
let handlerMap = {}
let that = null

options.platform = 'miniapp'
options.commitWork = fiber => {
  uuid = 1
  let { type, props, name } = fiber.child.child
  let vdom = { type, props, name }

  that.setData({
    vdom
  })
  for (let k in handlerMap) {
    that[k] = handlerMap[k]
  }
}

export function render (vdom, el) {
  uuid = 1

  let hostCofig = {
    data: {
      vdom: vdom.child
    },
    onLoad () {
      that = this
      scheduleWork({
        tag: 2,
        props: {
          children: vdom
        }
      })
    }
  }

  for (let k in handlerMap) {
    hostCofig[k] = handlerMap[k]
  }
  Page(hostCofig)
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
