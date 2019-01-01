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
    serviceLongArray: [
    { id: 1, time: 3, price: 120 }, 
    { id: 2, time: 4, price: 160 }, 
    { id: 3, time: 5, price: 500 }, 
    { id: 4, time: 6, price: 400 }],
    serviceArrayIndex: 0,
    pickerDateStart: '2019-01-01',
    pickerDateEnd: '2019-02-01',
    serviceBeginDate: null,
    pickerTimeStart: '09:01',
    pickerTimeEnd: '21:01',
    serviceBeginTime: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      serviceBeginDate: this.data.pickerDateStart,
      serviceBeginTime: this.data.pickerTimeStart
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      serviceArrayIndex: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('日期picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      serviceBeginDate: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      serviceBeginTime: e.detail.value
    })
  },

  //选择套餐
  chioceOrderConfirmItem: function (e) {
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
  realOrderConfirmInput: function (e) {
    var money = e.detail.value;
    this.setData({
      needPay: money,
      realOrderConfirm: money,
      itemSelected: ''
    });
  },

  //充值支付
  payFororderConfirm: function () {
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
    app.api.post2('user/charge', data, function (res) {
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