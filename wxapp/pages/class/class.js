//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    tmpl: {
      load: 'loading'
    },
    day: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    classTable: []
  },
  //事件处理函数
  onLoad: function () {
    if (!wx.getStorageSync('LoginSessionKey')) {
      wx.redirectTo({url: '../login/login'})
    } else {
      wx.request({
        url: 'http://localhost:3000/class',
        data: {
          username: wx.getStorageSync('username'),
          password: wx.getStorageSync('password')
        },
        method: 'POST', 
        success: (res) => {
          this.setData({
            tmpl: {
              load: true
            },
            classTable: res.data
          })
        },
        fail: (res) => {
          this.setData({
            tmpl: {
              load: false
            },
          })
        }
      })
    }
  }
})
