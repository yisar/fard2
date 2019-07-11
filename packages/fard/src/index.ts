// @ts-ignore
import { options, scheduleWork } from 'fre'

const ARRAYTYPE = '[object Array]'
const OBJECTTYPE = '[object Object]'
const FUNCTIONTYPE = '[object Function]'
let context = null
let oldVdom = null
let handlerId = 0;
let handlerMap = {};
let bridgeType = 'template';

options.end = true
options.commitWork = fiber => {
  let { type, props } = fiber.child.child
  let vdom = {
    type,
    props
  }

  const diffRes = diff(oldVdom, vdom)

  const update = () => {
    return new Promise((resolve, reject) => {
      if (!Object.keys(diffRes).length) {
        resolve(null)
        return
      }
      // @ts-ignore
      context.setData(diffRes, () => {
        resolve(diffRes)
      })
    })
  }

  console.log(vdom);
  if (!oldVdom) {
    // @ts-ignore
    context.setData({
      vdom
    })
  } else {
    update().then(diff => {
      // @ts-ignore
      context.setData(diff)
    })
  }
  if (bridgeType === 'template') {
    for (let k in handlerMap) {
      // @ts-ignore
      context[k] = handlerMap[k]
    }
  }
  // @ts-ignore
  oldVdom = vdom
}

function render (vdom, options) {
  let hostCofig = {
    data: {
      vdom: {}
    },
    onLoad () {
      // @ts-ignore
      context = this
      scheduleWork({
        tag: 2,
        props: {
          children: vdom
        }
      })
    }
  }
  // @ts-ignore
  Page({ ...options, ...hostCofig })
}

function diff (prevObj, nextObj) {
  // Largely inspired by:
  // * https://github.com/Tencent/westore/blob/master/packages/westore/utils/diff.js
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
          setOut(out, path + '.' + key, nextValue)
        }
      } else if (type(nextValue) == ARRAYTYPE) {
        if (prevValue && type(prevValue) != ARRAYTYPE) {
          setOut(out, path + '.' + key, nextValue)
        } else {
          nextValue.forEach((item, index) => {
            idiff(
              prevValue && prevValue[index],
              item,
              path + '.' + key + '[' + index + ']',
              out
            )
          })
        }
      } else if (type(nextValue) == OBJECTTYPE) {
        if (prevValue && type(prevValue) != OBJECTTYPE) {
          setOut(out, path + '.' + key, nextValue)
        } else {
          for (let name in nextValue) {
            if (name[0] === 'o' && name[1] === 'n') {
              if (bridgeType === 'template') {
                let key = name.toLowerCase() + handlerId
                // FIXME: memory leak here
                handlerMap[key] = nextValue[name]
                nextValue[name] = key
                handlerId++
              } else {
                let key = name.toLowerCase()
                nextValue[key] = name
              }
            }
            idiff(
              prevValue && prevValue[name],
              nextValue[name],
              path + '.' + key + '.' + name,
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
      for (let index in next) {
        let last = prev && prev[index]
        next[index] = wireVnode(next[index])

        idiff(
          last,
          next[index],
          (path == '' ? '' : path) + '[' + index + ']',
          out
        )
      }
    }
  } else {
    setOut(out, path, next)
  }
}

function setOut (out, key, value) {
  if (type(value) === FUNCTIONTYPE && bridgeType === 'template') {
    return;
  }
  out['vdom' + key] = value
}

function type (obj) {
  return Object.prototype.toString.call(obj)
}

function wireVnode (vnode) {
  return vnode.render || vnode
}

function h (type, props) {
  let rest = []
  let children = []
  let length = arguments.length

  // @ts-ignore
  while (length-- > 2) rest.push(arguments[length])
  while (rest.length) {
    let vnode = rest.pop()
    // @ts-ignore
    if (vnode && vnode.pop) {
      // @ts-ignore
      for (length = vnode.length; length--;) rest.push(vnode[length])
    } else if (typeof vnode === 'function') {
      children = vnode
    } else {
      // @ts-ignore
      children.push(vnode)
    }
  }

  props = props || {}

  if (typeof children[0] === 'string' || typeof children[0] === 'number') {
    props.nodeValue = children[0]
    children = []
  }

  const isFn = typeof type === 'function'

  return {
    type,
    name: isFn ? 'component' : type,
    render: isFn ? type(props) : null,
    props: { ...props, children }
  }
}

// FIXME: will be removed later
const unstable_setBridgreType = (newBridgeType) => {
  bridgeType = newBridgeType
};

// @ts-ignore
const api = wx || my || tt || swan

export { h, render, api, context, unstable_setBridgreType }
