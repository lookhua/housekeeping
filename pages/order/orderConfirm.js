const app = getApp(); //获取全局app.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payMoney: 0,
    payMoneyTip: '不包含其他费用',
    serviceAddr: '安徽省合肥市长江西路红枫路与尔西二环交口航线家园12栋1208室',
    serviceLong: 3,
    serviceDuration: 0
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
    var dura = util.formatTime(Date.now())
    this.setData({
      serviceDuration: dura
    });

  },

  //选择套餐
  chioceOrderConfirmItem: function(e) {
    var page = this;
    var itemId = e.currentTarget.dataset.id;
    var chong = e.currentTarget.dataset.chong;
    var song = e.currentTarget.dataset.song;
    this.setData({
      needPay: chong,
      inputMonney: null,
      realOrderConfirm: song,
      itemSelected: itemId
    });
  },

  //输入金额
  realOrderConfirmInput: function(e) {
    var money = e.detail.value;
    this.setData({
      needPay: money,
      realOrderConfirm: money,
      itemSelected: ''
    });
  },

  //充值支付
  payFororderConfirm: function() {
    var page = this;
    var userId = app.globalData.userInfo.id;
    if (!this.data.itemSelected && !this.data.inputMonney) {
      app.common.errorToShow("请输入正确的金额或者选择充值套餐");
      return false;
    }
    var data = {
      userId: userId,
      itemSelected: this.data.itemSelected,
      inputMoney: this.data.inputMonney
    };
    app.api.post2('user/charge', data, function(res) {
      if (res.status) {
        wx.requestPayment({
          'timeStamp': '' + res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': res.data.signType,
          'paySign': res.data.paySign,
          'success': function(e) {
            if (e.errMsg == "requestPayment:ok") {
              app.common.errorToBack('支付成功');
            } else if (res.errMsg == 'requestPayment:cancel') {
              app.common.errorToShow('支付已取消');
            }
          },
          'fail': function(e) {
            app.common.errorToShow('支付失败请重新支付');
          }
        });
      } else {
        app.common.errorToShow('支付订单出现问题，请返回重新操作');
      }
    });


  }


})