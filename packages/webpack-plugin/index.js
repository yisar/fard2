class FardWebpackPlugin {
  constructor ({ filename = 'base.wxml', viewLevel = 5, ignoreElements }) {
    this.filename = filename
    this.viewLevel = viewLevel
    this.ignoreElements = ignoreElements
  }
  createWxml(){
    return `
<import src="../../bridge.wxml"/>
<template is="{{vdom.name}}" wx:if="{{vdom.name}}" data="{{...vdom}}"/>
`
  }
  createBridgeWxml () {
    let viewStr = ''
    let staticStr =`
<template name="text">
  <text class="{{props.class}}">{{props.nodeValue}}</text>
</template>
<template name="button">
  <button class="{{props.class}}" bindtap="{{props.onClick}}">{{props.nodeValue}}</button>
</template>
<template name="image">
  <image class="{{props.class}}" src="{{props.src}}"></image>
</template>
<template name="navigator">
  <navigator class="{{props.class}}" url="{{props.url}}">{{props.nodeValue}}</navigator>
</template>
<template name="component">
  <template is="{{render.name}}" data="{{...render}}"></template>
</template>
    ` + '\n\r'

    for (let i = 0; i < this.viewLevel; i++) {
      viewStr +=
        `
<template name="view${i}">
  <view class="{{props.class}}">
    <block wx:for="{{props.children}}" wx:key="">
      <template is="{{item.name}}" data="{{...item}}"></template>
    </block>
  </view>
</template>` + '\n\r'
    }

    return staticStr + viewStr
  }

  ignoreElementsStr () {
    let str = ''
    for (let k in this.ignoreElements) {
      str += `
  <block wx:elif="{{component}}">
    <${this.ignoreElements[k]} props="{{props}}"></${this.ignoreElements[k]}>
  </block>
`
    }
    return str
  }

  apply (compiler) {
    compiler.hooks.emit.tapAsync('FardWebpackPlugin', (compilation, cb) => {
      // 生成 bridge.wxml
      compilation.assets[this.filename] = {
        source: () => this.createBridgeWxml(),
        size: () => 1
      }
      //生成普通的 wxml
      compilation.chunks.forEach((item) => {
        compilation.assets[`${item.name}.wxml`] = {
          source: () => this.createBridgeWxml(),
          size: () => 1,
        };
      });
      cb()
    })
  }
}

module.exports = FardWebpackPlugin
