//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    advertisements: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    users: []
  },
  onLoad: function () {
    //获取广告列表
    // this.pullAdvertisements();
    //获取列表
    // this.pullUserInfo();
  },
  onShow:function(){
    //订单列表
    app.requestUrl('service/getAllServices', {}, 'GET', function (res) {
      console.log("getAllServices list success!");
      page.setData(res.data.data);
    }, function (res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);
  },

  pullAdvertisements: function () {
   /* var that = this;
    wx.request({
      url: 'http://localhost:8080/advertisement',
      method: "GET",
      data:{
        index:1,
        pageSize:10
      },
      success: function (res) {
        that.setData({
          advertisements: res.data
        });
        console.log(res)
      },
      fail: function (e) {
        console.log(e);
      },
      complete: function (e) {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    });*/
  },
  pullUserInfo: function () {
   /* var that = this;
    wx.request({
      url: 'http://localhost:8080/user',
      method: "GET",
      success: function (res) {
        that.setData({
          users: res.data
        });
        console.log(res)
      },
      fail: function (e) {
        console.log(e);
      },
      complete: function (e) {
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })*/
  },
  
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.pullUserInfo();
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    console.log("you are nin fa sfwe ");
  },

  gotoOrderConfirm:function(){
    wx.navigateTo({
      url: '../order/orderConfirm'
    })
  }

})
