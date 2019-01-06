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
    realRecharge: 0,
    inputMonney: null,
    itemSelected: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //选择套餐
  chioceRechargeItem: function (e) {
    var page = this;
    var itemId = e.currentTarget.dataset.id;
    var chong = e.currentTarget.dataset.chong;
    var song = e.currentTarget.dataset.song;
    this.setData({
      needPay: chong,
      inputMonney: null,
      realRecharge: song,
      itemSelected: itemId
    });
  },

  //输入金额
  realRechargeInput: function (e) {
    var money = e.detail.value;
    this.setData({
      needPay: money,
      realRecharge: money,
      itemSelected: ''
    });
  },

  //充值支付
  payForRecharge: function () {
    var page = this;
    var userId = wx.getStorageSync('userId');
    console.log("getorderInit userid is " + userId)
    if (!this.data.itemSelected && !this.data.inputMonney) {
      app.common.errorToShow("请输入正确的金额或者选择充值套餐");
      return false;
    }
    var data = {
      userId: userId,
      itemSelected: this.data.itemSelected,
      inputMoney: this.data.inputMonney
    };
    app.requestUrl('user/charge',data, function (res) {
      if (res.status) {
        wx.requestPayment({
          'timeStamp': '' + res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': res.data.signType,
          'paySign': res.data.paySign,
          'success': function (e) {
            if (e.errMsg == "requestPayment:ok") {
              app.common.errorToBack('支付成功');
            } else if (res.errMsg == 'requestPayment:cancel') {
              app.common.errorToShow('支付已取消');
            }
          },
          'fail': function (e) {
            app.common.errorToShow('支付失败请重新支付');
          }
        });
      } else {
        app.common.errorToShow('支付订单出现问题，请返回重新操作');
      }
    });


  }


})