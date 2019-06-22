// pages/user/user.js
Page({
  data: {
    name: ''
  },
  onLoad: function (options) {
    this.setData({
      name: options.name
    })
  }
})
