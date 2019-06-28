import { options, scheduleWork } from 'fre'

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