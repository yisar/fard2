// Largely inspired by:
// * https://github.com/Tencent/westore/blob/master/packages/westore/utils/diff.js

const ARRAYTYPE = '[object Array]'
const OBJECTTYPE = '[object Object]'
const FUNCTIONTYPE = '[object Function]'
let prevLevel = 0
let nextLevel = 0
let handlerId = 0
let handlerMap = {}

function diff (prevObj, nextObj) {
  const out = {}
  idiff(prevObj, nextObj, '', out)
  return out
}

function idiff (prev, next, path, out) {
  if (prev === next) return

  if (type(next) == OBJECTTYPE) {
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

      if (type(nextValue) !== ARRAYTYPE && type(nextValue) !== OBJECTTYPE) {
        if (nextValue != prev[key]) {
          setOut(out, (path == '' ? '' : path + '.') + key, nextValue)
        }
      } else if (type(nextValue) == ARRAYTYPE) {
        if (type(prevValue) != ARRAYTYPE) {
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
        if (type(prevValue) != OBJECTTYPE) {
          setOut(out, (path == '' ? '' : path + '.') + key, nextValue)
        } else {
          for (let name in nextValue) {
            if (name[0] === 'o' && name[1] === 'n') {
              handlerMap[name + handlerId] = nextValue[name]
              handlerId++
            }
            idiff(
              prevValue[name],
              nextValue[name],
              (path == '' ? '' : path + '.') + key + '.' + name,
              out
            )
          }
        }
      }
    }
  } else if (type(next) == ARRAYTYPE) {
    if (type(prev) != ARRAYTYPE) {
      setOut(out, path, next)
    } else {
      if (next.length < prev.length) {
        setOut(out, path, next)
      } else {
        next.forEach((item, index) => {
          let last = prev[index]
          if (type(item.type) == FUNCTIONTYPE) {
            next[index] = item.type(item.props)
          }
          if (type(last.type) == FUNCTIONTYPE) {
            prev[index] = last.type(last.props)
          }
          idiff(last, item, (path == '' ? '' : path) + '[' + index + ']', out)
        })
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