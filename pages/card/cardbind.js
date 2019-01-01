// pages/member/remainingSum/withdrawCash/recharge.js
const app = getApp(); //获取全局app.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardNumber: '阿擦边'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },

  cardNumInput:function(e){
    var cardNumber = e.detail.value;
    this.setData({
      cardNumber: cardNumber
    });
  },

  //绑定卡
  bindCardToUser: function() {
    var page = this;
    if (page.data.cardNumber == '') {
      app.common.errorToShow("请输入正确的卡号");
      return false;
    }
    console.log("current card num is " + page.data.cardNumber);
    var userId = wx.getStorageSync('userId');
    console.log("current card num userid is " + userId);

    var data = {
      userId: userId,
      userMobile: page.data.cardNumber
    };

    
  }
})