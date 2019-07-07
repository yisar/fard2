const isON = (item) => item[0] === 'o' && item[1] === 'n'

Component({
  properties: {
    vdom: {
      type: Object,
      value: {}
    }
  },
  attached: function() {
    const props = this.data.vdom.props
    for (let k in props) {
      if (k[0] === 'o' && k[1] === 'n') {
        this[props[k]] = () => {
          console.log(111)
        }
      }
    }
  },
  options: {
    addGlobalClass: true
  },
  methods: {
    onclick() {
      console.log(this)
    }
  }
})