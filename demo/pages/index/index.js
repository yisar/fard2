import {
  scheduleWork,
  options,
  h
} from 'fre'

let vdom = {
  type: 'view',
  path: '/0',
  children: [{
      type: 'image',
      path: '/0/0',
      props: {
        class: 'logo',
        src: 'https://ws1.sinaimg.cn/large/0065Zy9ely1g45a2fme8dj30rs0kq772.jpg'
      }
    },
    {
      type: 'text',
      path: '/0/1',
      props: {
        class: 'title',
        nodeValue: 'fard'
      }
    }
  ]
}

function render(vdom) {
  options.platform = 'miniapp'
  scheduleWork({
    tag: 2,
    props: {
      children: vdom
    }
  })
  options.commitWork = fiber => {
    console.log(fiber)
  }
  Page({
    data: {
      vdom
    }
  })
}

render(vdom)