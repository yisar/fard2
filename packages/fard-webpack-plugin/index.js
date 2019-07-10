class FardWebpackPlugin {
  constructor () {
  }

  apply (compiler) {
    const wxml = `<fard vdom="{{vdom}}" />`
    const json = `
{
  "usingComponents": {
    "fard":"/block/block"
  }
}`

    const bridgeJson = `
{
  "component": true,
  "usingComponents": {
    "fard": "/block/block"
  }
}
    `
    const bridgeJs = `
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
  lifetimes: {
    attached() {
      const attach = (this.data.vdom.props||{}).onAttach
      attach && attach()
    },
    detached: function() {
      const detach = (this.data.vdom.props||{}).onDetach
      detach && detach()
    },
  },
  options: {
    addGlobalClass: true
  }
})
    `
    compiler.hooks.emit.tapAsync('FardWebpackPlugin', (compilation, cb) => {
      const bridgeWxml = this.createBridgeWxml()
      compilation.assets['block/block.wxml'] = {
        source: () => bridgeWxml,
        size: () => bridgeWxml.length
      }
      compilation.assets['block/block.json'] = {
        source: () => bridgeJson,
        size: () => bridgeJson.length
      }

      compilation.assets['block/block.js'] = {
        source: () => bridgeJs,
        size: () => bridgeJs.length
      }
      //批量生成 wxml和 json
      compilation.chunks.forEach((item) => {
        compilation.assets[`${item.name}.wxml`] = {
          source: () => wxml,
          size: () => wxml.length,
        }
        compilation.assets[`${item.name}.json`] = {
          source: () => json,
          size: () => json.length,
        }
      })
      cb()
    })
  }

  createBridgeWxml () {
    return `
<block wx:if="{{vdom.type === 'view'}}">
  <view class="{{vdom.props.class||vdom.props.className}}" bindtap="{{vdom.props.onclick||''}}">
    {{vdom.props.nodeValue}}
    <block wx:for="{{vdom.props.children}}" wx:key=''>
      <fard vdom="{{item}}" wx:if="{{item.type === 'view'}}" />
    </block>
  </view>
</block>
<block wx:elif="{{vdom.type === 'text'}}">
  <text class="{{vdom.props.class||vdom.props.className}}" bindtap="{{vdom.props.onclick||''}}">
      {{vdom.props.nodeValue}}
      <fard wx:for="{{vdom.props.children}}" wx:key='' vdom="{{item}}" />
    </text>
</block>
<block wx:elif="{{vdom.type === 'button'}}">
  <button class="{{vdom.props.class||vdom.props.className}}" bindtap="{{vdom.props.onclick||''}}">
    {{vdom.props.nodeValue}}
  </button>
</block>
<block wx:elif="{{vdom.type === 'image'}}">
  <image class="{{vdom.props.class||vdom.props.className}}" src="{{vdom.props.src}}" />
</block>
<block wx:elif="{{vdom.name === 'component'}}">
  <fard vdom="{{vdom.render}}" />
</block>
    `
  }
}

module.exports = FardWebpackPlugin
