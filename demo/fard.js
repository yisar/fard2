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

export function render (vdom) {
  uuid = 1
  let props = vdom.props
  let hostCofig = {
    data: {
      vdom: {}
    },
    onLoad () {
      that = this
      props.onLoad && props.onLoad()
      scheduleWork({
        tag: 2,
        props: {
          children: vdom
        }
      })
    },
    onShow: () => props.onShow && props.onShow(),
    onReady: () => props.onReady && props.onReady(),
    onHide: () => props.onHide && props.onHide()
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
    } else if (typeof vnode === 'function') {
      children = vnode
    } else {
      children.push(vnode)
    }
  }

  if (typeof children[0] === 'string' || typeof children[0] === 'number') {
    props.nodeValue = children[0]
    children = []
  }
  if (props && props.onClick) {
    let key = '$' + uuid + 'onClick'
    handlerMap[key] = props.onClick || ''
    props.onclick = key
  }

  if (type === 'view') {
    type = 'view$' + uuid
    uuid++
  }

  const isFn = typeof type === 'function'

  return {
    type,
    name: isFn ? 'hook' : type,
    child: isFn ? type(props) : null,
    props: { ...props, children }
  }
}
