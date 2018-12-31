// pages/member/remainingSum/withdrawCash/recharge.js
const app = getApp(); //获取全局app.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeItemList: [{
      id: 123,
      chong: "100",
      song: "150"
    }, {
      id: 124,
      chong: "200",
      song: "250"
    }, {
      id: 125,
      chong: "300",
      song: "350"
    }, {
      id: 126,
      chong: "400",
      song: "450"
    }, {
      id: 127,
      chong: "500",
      song: "550"
    }, {
      id: 128,
      chong: "600",
      song: "650"
    }],
    needPay: 0,
    realRecharge: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      wx.navigateTo({
        url: '../login/login'
      })
    };
    this.setData({
      userInfo: userInfo,
    });
  },

  //绑定卡
  chioceRechargeItem: function(e) {
    var page = this;
    var chong = e.currentTarget.dataset.chong;
    var song = e.currentTarget.dataset.song;
    this.setData({
      needPay: chong,
      realRecharge: song
    });
  },

  //输入金额
  realRechargeInput:function(e){
    var money = e.detail.value;
    this.setData({
      needPay: money,
      realRecharge: money
    });
  }

})