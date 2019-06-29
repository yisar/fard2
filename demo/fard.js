import { options, scheduleWork } from 'fre'

const ARRAYTYPE = '[object Array]'
const OBJECTTYPE = '[object Object]'
const FUNCTIONTYPE = '[object Function]'
let prevLevel = 0
let nextLevel = 0
let handlerId = 0
let handlerMap = {}
let that = null
let oldVdom = {}

options.platform = 'miniapp'
options.commitWork = fiber => {
  let { type, props } = fiber.child.child
  let vdom = { type, props }

  let json = diff(oldVdom, vdom)

  if (oldVdom.type) {
    that.setData(json)
  } else {
    that.setData(vdom)
  }
  oldVdom = vdom

  for (let k in handlerMap) {
    that[k] = handlerMap[k]
  }
}

export function render (vdom) {
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

function diff (prevObj, nextObj) {
  const out = {}
  idiff(prevObj, nextObj, '', out)
  return out
}

function idiff (prev, next, path, out) {
  if (prev === next) return

  if (type(next) == OBJECTTYPE) {
    wireVnode(next)
    for (let key in next) {
      const nextValue = next[key]
      const prevValue = prev && prev[key]

      if (type(nextValue) !== ARRAYTYPE && type(nextValue) !== OBJECTTYPE) {
        if (prev && nextValue != prev[key]) {
          setOut(out, (path == '' ? '' : path + '.') + key, nextValue)
        }
      } else if (type(nextValue) == ARRAYTYPE) {
        if (prevValue && type(prevValue) != ARRAYTYPE) {
          setOut(out, (path == '' ? '' : path + '.') + key, nextValue)
        } else {
          if (nextValue.length < prevValue.length) {
            setOut(out, (path == '' ? '' : path + '.') + key, nextValue)
          } else {
            nextValue.forEach((item, index) => {
              idiff(
                prevValue[index],
                item,
                (path == '' ? '' : path + '.') + key + '[' + index + ']',
                out
              )
            })
          }
        }
      } else if (type(nextValue) == OBJECTTYPE) {
        if (prevValue && type(prevValue) != OBJECTTYPE) {
          setOut(out, (path == '' ? '' : path + '.') + key, nextValue)
        } else {
          for (let name in nextValue) {
            idiff(
              prevValue && prevValue[name],
              nextValue[name],
              (path == '' ? '' : path + '.') + key + '.' + name,
              out
            )
          }
        }
      }
    }
  } else if (type(next) == ARRAYTYPE) {
    if (prev && type(prev) != ARRAYTYPE) {
      setOut(out, path, next)
    } else {
      for(let index in next){
        let last = prev && prev[index]
        next[index] = wireVnode(next[index])
        idiff(last, next[index], (path == '' ? '' : path) + '[' + index + ']', out)
      }
    }
  } else {
    setOut(out, path, next)
  }
}

function setOut (out, key, value) {
  if (type(value) != FUNCTIONTYPE) {
    out[key] = value
  }
}

function type (obj) {
  return Object.prototype.toString.call(obj)
}

function wireVnode (vnode) {
  if (type(vnode.type) == FUNCTIONTYPE) {
    vnode = vnode.type(vnode.props)
  } else if (vnode.type == 'view') {
    vnode.type = 'view' + nextLevel
    nextLevel++
  }
  return vnode
}
