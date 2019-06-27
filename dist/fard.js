/**
 * by 132yse Copyright 2019-06-27
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fre = require('fre');

let handlerMap = {};
let that = null;
fre.options.platform = 'miniapp';
fre.options.commitWork = fiber => {
  let { type, props, name } = fiber.child.child;
  let vdom = { type, props, name };
  that.setData({
    vdom
  });
  for (let k in handlerMap) {
    that[k] = handlerMap[k];
  }
};
function render (vdom) {
  let hostCofig = {
    data: {
      vdom: {}
    },
    onLoad () {
      that = this;
      fre.scheduleWork({
        tag: 2,
        props: {
          children: vdom
        }
      });
    }
  };
  for (let k in handlerMap) {
    hostCofig[k] = handlerMap[k];
  }
  Page(hostCofig);
}

const isArray = Array.isArray;
let prevLevel = 0;
let nextLevel = 0;
function diff(prevObj, nextObj) {
    const out = {};
    walk(prevObj, nextObj, '', out);
    return out
}
function walk(prev, next, path, out) {
    if (prev === next) return
    if (typeof next === 'object') {
        for (let key in next) {
            if (next[key] === 'view') {
                next[key] = next[key] + nextLevel;
                nextLevel++;
            }
            if (prev[key] === 'view') {
                prev[key] = prev[key] + prevLevel;
                prevLevel++;
            }
            const nextValue = next[key];
            const prevValue = prev[key];
            if (!isArray(nextValue) && typeof nextValue !== 'object') {
                if (nextValue != prev[key]) {
                    setOut(out, path + '.' + key, nextValue);
                }
            } else if (isArray(nextValue)) {
                if (!isArray(prevValue)) {
                    setOut(out, path + '.' + key, nextValue);
                } else {
                    if (nextValue.length < prevValue.length) {
                        setOut(out, path + '.' + key, nextValue);
                    } else {
                        nextValue.forEach((item, index) => {
                            walk(item, prevValue[index], path + '.' + key + '[' + index + ']', out);
                        });
                    }
                }
            } else if (typeof nextValue === 'object') {
                if (typeof prevValue !== 'object') {
                    setOut(out, path + '.' + key, nextValue);
                } else {
                    for (let nKey in nextValue) {
                        walk(nextValue[nKey], prevValue[nKey], path + '.' + key + '.' + nKey, out);
                    }
                }
            }
        }
    } else if (isArray(next)) {
        if (isArray(prev)) {
            setOut(out, path, next);
        } else {
            if (next.length < prev.length) {
                setOut(out, path, next);
            } else {
                next.forEach((item, index) => {
                    walk(item, prev[index], path + '[' + index + ']', out);
                });
            }
        }
    } else {
        setOut(out, path, next);
    }
}
function setOut(out, key, value) {
    if (typeof value != 'function') {
        out[key.substr(1)] = value;
    }
}

exports.diff = diff;
exports.render = render;
