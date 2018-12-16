//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    advertisements: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    users: [],
    cardNumber: '00000',
    totalBalance: 90.56,
    cardTotalCount: 4
  },
  //事件处理函数
  scanCardNumber: function() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        this.setData({
          cardNumber: res.result
        });
      }
    });
  },
  onLoad: function() {
    this.pullUserInfo();
    this.pullAdvertisements();
  },
  pullAdvertisements: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/advertisement',
      method: "GET",
      success: function(res) {
        that.setData({
          advertisements: res.data
        });
        console.log(res)
      },
      fail: function(e) {
        console.log(e);
      },
      complete: function(e) {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  pullUserInfo: function() {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/user',
      method: "GET",
      success: function(res) {
        that.setData({
          users: res.data
        });
        console.log(res)
      },
      fail: function(e) {
        console.log(e);
      },
      complete: function(e) {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  // 下拉刷新
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.pullUserInfo();
  }

})