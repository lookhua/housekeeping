// pages/member/remainingSum/withdrawCash/recharge.js
const app = getApp(); //获取全局app.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardNo: '201946864131737101'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },

  cardNumInput:function(e){
    var cardNo = e.detail.value;
    this.setData({
      cardNo: cardNo
    });
  },

  //绑定卡
  bindCardToUser: function() {
    var page = this;
    if (page.data.cardNumber == '') {
      app.common.errorToShow("请输入正确的卡号");
      return false;
    }
    var userId = wx.getStorageSync('userId');
    var data = {
      userId: userId,
      cardNo: page.data.cardNo+''
    };
    app.requestUrl('card/bindcard', data, 'POST', function (res) {
      app.common.errorToShow("绑定成功！");
      setTimeout(function () {
        wx.navigateBack(1);
      }, 1500);
    }, function (res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);
    
  }
})