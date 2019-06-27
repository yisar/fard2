import { options, scheduleWork } from 'fre'

let uuid = 0
let handlerMap = {}
let that = null
let isArray = Array.isArray
let prevLevel = 0
let nextLevel = 0

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

  let hostCofig = {
    data: {
      vdom: {}
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

// Largely inspired by:
// * https://github.com/Tencent/westore/blob/master/packages/westore/utils/diff.js

function diff(prevObj, nextObj) {
  const out = {}
  walk(prevObj, nextObj, '', out)
  return out
}


function walk(prev, next, path, out) {
  if (prev === next) return

  if (typeof next === 'object') {
      for (let key in next) {

          if (next[key] === 'view') {
              next[key] = next[key] + nextLevel
              nextLevel++
          }

          if (prev[key] === 'view') {
              prev[key] = prev[key] + prevLevel
              prevLevel++
          }

          const nextValue = next[key]
          const prevValue = prev[key]

          if (!isArray(nextValue) && typeof nextValue !== 'object') {
              if (nextValue != prev[key]) {
                  setOut(out, path + '.' + key, nextValue)
              }
          } else if (isArray(nextValue)) {
              if (!isArray(prevValue)) {
                  setOut(out, path + '.' + key, nextValue)
              } else {
                  if (nextValue.length < prevValue.length) {
                      setOut(out, path + '.' + key, nextValue)
                  } else {
                      nextValue.forEach((item, index) => {
                          walk(item, prevValue[index], path + '.' + key + '[' + index + ']', out)
                      })
                  }
              }
          } else if (typeof nextValue === 'object') {
              if (typeof prevValue !== 'object') {
                  setOut(out, path + '.' + key, nextValue)
              } else {
                  for (let nKey in nextValue) {
                      walk(nextValue[nKey], prevValue[nKey], path + '.' + key + '.' + nKey, out)
                  }
              }
          }
      }
  } else if (isArray(next)) {
      if (isArray(prev)) {
          setOut(out, path, next)
      } else {
          if (next.length < prev.length) {
              setOut(out, path, next)
          } else {
              next.forEach((item, index) => {
                  walk(item, prev[index], path + '[' + index + ']', out)
              })
          }
      }
  } else {
      setOut(out, path, next)
  }
}

function setOut(out, key, value) {
  if (typeof value != 'function') {
      out[key.substr(1)] = value
  }
}