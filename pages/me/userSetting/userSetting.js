//更多设置
var app = getApp(); //全局APP

Page({
  //页面数据
  data: {

  },

  //设置用户信息
  setUserInfo: function() {
    wx.navigateTo({
      url: '../info/info'
    });
  },

  //退出登录
  logout: function() {
    wx.showModal({
      title: '提示',
      content: '确认退出登录吗？',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync('userId');
          wx.removeStorageSync('userToken');
          wx.removeStorageSync('userMobile');
          wx.removeStorageSync('userPerfectAddr');
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    })
  }
})