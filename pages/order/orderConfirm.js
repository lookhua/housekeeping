const app = getApp(); //获取全局app.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payMoney: 0,
    payMoneyTip: '不包含其他费用',
    serviceAddrId: 0,
    serviceAddr: '安徽省合肥市长江西路红枫路与尔西二环交口航线家园12栋1208室',
    serviceLongArray: [{
        id: 1,
        time: 3,
        price: 120
      },
      {
        id: 2,
        time: 4,
        price: 160
      },
      {
        id: 3,
        time: 5,
        price: 500
      },
      {
        id: 4,
        time: 6,
        price: 400
      }
    ],
    serviceArrayIndex: 0,
    formInit: {
      addressList: [],
      pickerDateStart: '2019-01-01',
      pickerDateEnd: '2019-02-01',
      pickerTimeStart: '09:01',
      pickerTimeEnd: '21:01',
    },
    serviceBeginDate: null,
    serviceBeginTime: null,
    orderRmark: ''
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
    app.requestUrl('order/init', {
      userId: userId
    }, 'GET', function(res) {
      //设置formInit
      page.setData({
        formInit: res.data.data
      });
      //设置默认地址
      console.log(" res.data.data.addressList.length is " + res.data.data.addressList.length);
      if (res.data.data.addressList.length != 0) {
        wx.setStorageSync('userPerfectAddr', res.data.data.addressList[0]);
      }
      //初始化地址
      var userPerfectAddr = wx.getStorageSync('userPerfectAddr')
      if (userPerfectAddr) {
        var ssq = userPerfectAddr.contactSsqx;
        ssq = ssq.replace(/,/g, "");
        var address = userPerfectAddr.contactAddress;
        let fullAddress = ssq + address;
        page.setData({
          serviceAddrId: userPerfectAddr.id,
          serviceAddr: fullAddress
        })
      } else {
        page.setData({
          serviceAddrId: 0,
          serviceAddr: '请输入服务地址'
        })
      }
      //初始金额
      var payMoney = page.data.serviceLongArray[0].price || 0;
      page.setData({
        serviceBeginDate: page.data.formInit.pickerDateStart,
        serviceBeginTime: page.data.formInit.pickerTimeStart,
        payMoney: payMoney
      })
    }, function() {
      app.common.errorToShow("请求失败");
    }, true);

  },

  chioceServiceAddr: function() {
    wx.navigateTo({
      url: '../member/addressList/addressList'
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var payMoney = this.data.serviceLongArray[e.detail.value].price;
    this.setData({
      serviceArrayIndex: e.detail.value,
      payMoney: payMoney
    })
  },

  bindDateChange: function(e) {
    console.log('日期picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      serviceBeginDate: e.detail.value
    })
  },

  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      serviceBeginTime: e.detail.value
    })
  },

  orderRmarkInput: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      orderRmark: e.detail.value
    })
  },

  //预约服务
  payFororderConfirm: function() {

    var userId = wx.getStorageSync('userId');
    console.log("payFororderConfirm userid is " + userId)

    var userMobile = wx.getStorageSync('userMobile');
    console.log("payFororderConfirm userMobile is " + userMobile)

    let index = this.data.serviceArrayIndex;

    var serviceHours = this.data.serviceLongArray[index].time;

    var serviceTime = this.data.serviceBeginDate + " " + this.data.serviceBeginTime;

    var data = {
      id: 0,
      name: "家政服务",
      telphone: userMobile,
      fkServiceId: {id:1},
      fkPriceId: 1,
      serviceHours: serviceHours,
      serviceTime: serviceTime,
      deviceFlag: 0,
      user: { id: userId},
      addressId: this.data.serviceAddrId,
      address: this.data.serviceAddr,
      pay: this.data.payMoney,
      prepay: this.data.payMoney,
      isConfirm: 0,
      title: "按时清洁",
      remark: this.data.orderRmark,
      status: 1
    };

    app.requestUrl('order/subscribe', data, 'POST', function(res) {
      wx.navigateTo({
        url: 'orderList?tabselected=1'
      })
    }, function() {
      app.common.errorToShow("请求失败");
    }, true,false);


  }


})