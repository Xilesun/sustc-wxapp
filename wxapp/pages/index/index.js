//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    load: false,
    user: {
      name: '',
      id: ''
    },
    menu: [{
        name: '课程表',
        link: '../class/class'
      },
      {
        name: '成绩单',
        link: '../score/score'
      },
      {
        name: '关于',
        link: '../about/about'
      }],
    msg: ''
  },
  //事件处理函数
  onLoad: function () {
    if (!wx.getStorageSync('LoginSessionKey')) {
      wx.redirectTo({url: '../login/login'})
    } else {
      wx.request({
        url: 'http://localhost:3000/',
        data: {
          username: wx.getStorageSync('username'),
          password: wx.getStorageSync('password')
        },
        method: 'POST', 
        success: (res) => {
          this.setData({
            load: true,
            user: {
              name: res.data,
              id: wx.getStorageSync('username')
            }
          })
        },
        fail: (res) => {
          this.setData({
            msg: '程序出错'
          })
        }
      })
    }
  },
  logout: function () {
    wx.removeStorageSync('LoginSessionKey')
    wx.removeStorageSync('username')
    wx.removeStorageSync('password')
    wx.redirectTo({ url: '../login/login' })
  }
})
