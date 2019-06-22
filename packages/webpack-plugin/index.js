class FardWebpackPlugin {
  constructor ({ filename = 'base.wxml', nodes = 20, ignoreElements }) {
    this.filename = filename
    this.nodes = nodes
    this.ignoreElements = ignoreElements
  }
  createSource () {
    let viewStr = ''
    let staticStr =
      `
<template name="text">
  <text class="{{props.class}}">{{props.nodeValue}}</text>
</template>
<template name="button">
  <button class="{{props.class}}" bindtap="{{props.onclick}}">{{props.nodeValue}}</button>
</template>
<template name="image">
  <image class="{{props.class}}" src="{{props.src}}"></image>
</template>
<template name="hook">
  <template is="{{child.name}}" data="{{...child}}"></template>
</template>
<template name="navigator">
  <navigator class="{{props.class}}" url="{{props.url}}">{{props.nodeValue}}</navigator>
</template>
<template name="video">
  <video class="{{props.class}}" src="{{props.src}}"></video>
</template>
    ` + '\n\r'
    
    for (let i = 1; i < this.nodes; i++) {
      viewStr +=
        `
<template name="view$${i}">
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
      compilation.assets[this.filename] = {
        source: () => this.createSource(),
        size: () => 1
      }
      cb()
    })
  }
}

module.exports = FardWebpackPlugin
