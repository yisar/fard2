
Component({
  properties: {
    vdom: {
      type: Object,
      value: {}
    }
  },
  observers: {
    'vdom.props.**': function () {
      const props = this.data.vdom.props
      for (let k in props) {
        if (typeof props[k] === 'function') {
          this[k] = props[k]
        }
      }
    },
  },
  options: {
    styleIsolation: 'shared'
  }
})
    