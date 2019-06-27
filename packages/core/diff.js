// Largely inspired by:
// * https://github.com/Tencent/westore/blob/master/packages/westore/utils/diff.js

const isArray = Array.isArray
let prevLevel = 0
let nextLevel = 0

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