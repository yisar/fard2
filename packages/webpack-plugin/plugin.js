class FardWebpackPlugin {
  constructor ({ filename = 'base.wxml', nestedlevel = 5 }) {
    this.filename = filename
    this.nestedlevel = nestedlevel
  }
  createSource () {
    let rootStr = `<template is="{{vdom.name}}" data="{{...vdom}}" wx:if="{{vdom.name}}" />`
    let blockStr = ''
    for (let i = 0; i < this.nestedlevel; i++) {
      blockStr += `
<template name="@${i}">
  <block wx:if="{{item.type === 'view'}}">
    <view class="{{props.class}}">
      <block wx:for="{{props.children}}" wx:key="key">
        <template is="{{item.name}}" data="{{...item}}"></template>
      </block>
    </view>
  </block>
  <block wx:if="{{item.type === 'text'}}">{{item.text}}</block>
  <block wx:elif="{{item.type === 'button'}}">
    <button class="{{props.class}}" bind:touchstart="{{props.onclick}}">{{props.text}}</button>
  </block>
  <block wx:elif="{{item.type === 'image'}}">
    <image class="{{props.class}}" src="{{props.src}}"></image>
  </block>
</template>` + '\n\r'
    }

    return rootStr + '\n\r' + blockStr
  }

  apply (compiler) {
    compiler.hooks.emit.tapAsync('FardWebpackPlugin', (compilation, cb) => {
      compilation.assets[this.filename] = {
        source: () => this.createSource(),
        size: () => 1
      }
      cb()
    })
  }
}

module.exports = FardWebpackPlugin
