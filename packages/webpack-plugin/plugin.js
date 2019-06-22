class FardWebpackPlugin {
  constructor ({ filename = 'base.wxml', nodes = 20, ignoreElements }) {
    this.filename = filename
    this.nodes = nodes
    this.ignoreElements = ignoreElements
  }
  createSource () {
    let blockStr = ''
    for (let i = 1; i < this.nodes; i++) {
      blockStr +=
        `
<template name="@${i}">
  <block wx:if="{{type === 'view'}}">
    <view class="{{props.class}}">
      <block wx:for="{{props.children}}" wx:key="">
        <template is="{{item.name}}" data="{{...item}}"></template>
      </block>
    </view>
  </block>
  <block wx:elif="{{type === 'button'}}">
    <button class="{{props.class}}" bindtap="{{props.onclick}}">{{props.nodeValue}}</button>
  </block>
  <block wx:elif="{{type === 'text'}}">
    <text class="{{props.class}}">{{props.nodeValue}}</text>
  </block>
  <block wx:elif="{{type === 'image'}}">
    <image class="{{props.class}}" src="{{props.src}}"></image>
  </block>
  <block wx:elif="{{child}}">
    <template is="{{child.name}}" data="{{...child}}"></template>
  </block>
  ${this.ignoreElementsStr()}
</template>` + '\n\r'
    }

    return blockStr
  }

  ignoreElementsStr () {
    let str = ''
    for (let k in this.ignoreElements) {
      str += `
  <block wx:elif="{{type === 'ignore'}}">
    <${this.ignoreElements[k]} props="{{props}}"></${this.ignoreElements[k]}>
  </block>
`
    }
    return str
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
