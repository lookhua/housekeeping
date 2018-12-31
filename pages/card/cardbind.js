// pages/member/remainingSum/withdrawCash/recharge.js
const app = getApp(); //获取全局app.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userMobile: '15255108906',
    cardNumber: '阿擦边'
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
  bindCardToUser: function() {
    var page = this;
    if (page.data.cardNumber == '') {
      app.common.errorToShow("请输入正确的卡号");
      return false;
    }

    var data = {
      openid: 'openid',
      userId: 'dfweee',
      userMobile: 'wechatpay',
      cardNumber: 2
    };

    
  }
})