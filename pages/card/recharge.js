// pages/member/remainingSum/withdrawCash/recharge.js
const app = getApp(); //获取全局app.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rechargeItemList: [
      //   {
      //   id: 0,
      //   title: 0,
      //   rechargeMoney: 0,
      //   presentMoney: 0,
      //   remark: 0
      // }
    ],
    needPay: 0,
    realRecharge: 0,
    inputMonney: null,
    itemSelected: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onShow: function() {
    var page = this;
    var userId = wx.getStorageSync('userId');
    console.log("getorderInit userid is " + userId)
    app.requestUrl('recharge/rechagerTypeList', {}, 'POST', function(res) {
      page.setData({
        rechargeItemList: res.data.data
      });
    }, function() {
      app.common.errorToShow("请求失败");
    }, true);

  },

  //选择套餐
  chioceRechargeItem: function(e) {
    var page = this;
    let index = e.currentTarget.dataset.index;
    let id = page.data.rechargeItemList[index].id;
    let chong = page.data.rechargeItemList[index].rechargeMoney;
    let song = page.data.rechargeItemList[index].presentMoney + chong;
    this.setData({
      needPay: chong,
      inputMonney: null,
      realRecharge: song,
      itemSelected: id
    });
  },

  //输入金额
  realRechargeInput: function(e) {
    var money = e.detail.value;
    this.setData({
      needPay: money,
      inputMonney: money,
      realRecharge: money,
      itemSelected: null
    });
  },

  //充值支付
  payForRecharge: function() {
    var page = this;
    var userId = wx.getStorageSync('userId');
    console.log("getorderInit userid is " + userId)
    if (!this.data.itemSelected && !this.data.inputMonney) {
      app.common.errorToShow("请输入正确的金额或者选择充值套餐");
      return false;
    }
    var data = {
      userId: userId,
      id: this.data.itemSelected || 0,
      inputMoney: this.data.inputMonney
    };
    app.requestUrl('recharge/prepay', data, 'POST', function(res) {
      wx.requestPayment({
        'timeStamp': '' + res.data.timeStamp,
        'nonceStr': res.data.nonceStr,
        'package': res.data.package,
        'signType': res.data.signType,
        'paySign': res.data.paySign,
        'success': function(e) {
          if (e.errMsg == "requestPayment:ok") {
            app.common.errorToBack('支付成功');
            setTimeout(function () {
              wx.navigateBack(1);
            }, 1500);
          } else if (res.errMsg == 'requestPayment:cancel') {
            app.common.errorToShow('支付已取消');
          }
        },
        'fail': function(e) {
          app.common.errorToShow('支付失败请重新支付');
        }
      });
    }, function(res) {
      app.common.errorToShow("支付订单出现问题，请返回重新操作");
    }, true);

  }


})