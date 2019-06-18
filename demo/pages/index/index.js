Page({
  data: {
    root: {
      name: '@1',
      type: 'View',
      children: [
        {
          type: 'Text',
          name: '@2'
        },
        {
          type: 'Text',
          name: '@3'
        }
      ]
    }
  }
})

// import { scheduleWork, options, h } from 'fre'
// function render (vnode) {
//   Page({
//     data: {
//       root: []
//     }
//   })
//   const rootFiber = {
//     tag: 'root',
//     props: { children: vnode }
//   }
//   scheduleWork(rootFiber) // 进入渲染流程
// }

// options.commitWork = fiber => {
//   console.log(fiber.children)
// }

// function App () {
//   return <text>hello world!</text>
// }

// render(<App />)
