const app = getApp(); //获取全局app.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payMoney: 0,
    payMoneyTip: '实际费用以实际工时为准',
    serviceAddrId: 0,
    serviceAddr: '',
    priceIndex: 0,
    perPrice: 0,
    serviceHours: 3,
    formInit: {
      addressList: [],
      services: [],
      serviceHoursStart: 3,
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
      var userPerfectAddr = wx.getStorageSync('userPerfectAddr')
      if (res.data.data.addressList.length != 0 && !userPerfectAddr) {
        wx.setStorageSync('userPerfectAddr', res.data.data.addressList[0]);
      }
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
      //初始服务单价
      var priceIndex = page.data.priceIndex;
      var perPrice = page.data.formInit.services[priceIndex].price || 0;

      //初始支付金额
      var payMoney = page.data.formInit.serviceHoursStart * perPrice;

      //初始化
      page.setData({
        priceIndex: 0,
        perPrice: perPrice,
        serviceHours: page.data.formInit.serviceHoursStart,
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
      url: '../me/userAddr/addressList?editMod=0'
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index = e.detail.value;
    var perPrice = this.data.formInit.services[index].price;
    var money = perPrice * this.data.serviceHours;
    this.setData({
      priceIndex: e.detail.value,
      perPrice: perPrice,
      payMoney: money
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

  orderServiceHoursInput: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var hours = e.detail.value;
    var money = this.data.perPrice * hours;
    this.setData({
      serviceHours: hours,
      payMoney: money
    })
  },

  orderServiceHoursBlur: function (e) {
    console.log('orderServiceHoursBlur发送选择改变，携带值为', e.detail.value)
    var hours = e.detail.value || 0;
    var hours = parseFloat(hours).toFixed(1);
    var money = this.data.perPrice * hours;
    this.setData({
      serviceHours: hours,
      payMoney: money
    })
  },

  //预约服务
  payFororderConfirm: function() {

    var userId = wx.getStorageSync('userId');
    console.log("payFororderConfirm userid is " + userId)

    let userMobile = wx.getStorageSync('userMobile');
    console.log("payFororderConfirm userMobile is " + userMobile)

    let serviceHours = this.data.serviceHours;

    if (this.data.formInit.serviceHoursStart > serviceHours ){
      app.common.errorToShow("小时数不小于" + this.data.formInit.serviceHoursStart);
      return ;
    }
    
    let serviceTime = this.data.serviceBeginDate + " " + this.data.serviceBeginTime;

    let sindex = this.data.priceIndex;

    let serviceTypeId = this.data.formInit.services[sindex].id;

    var userPerfectAddr = wx.getStorageSync('userPerfectAddr');
  
    if (!userPerfectAddr || this.data.serviceAddrId == 0){
      app.common.errorToShow("地址不能为空");
      return false;
    }

    var data = {
      id: 0,
      name: userPerfectAddr.contactUser,
      telphone: userMobile,
      fkServiceId: { id: serviceTypeId},
      fkPriceId: 0,
      serviceHours: serviceHours,
      serviceTime: serviceTime,
      deviceFlag: 0,
      user: {id: userId},
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
    }, true, false);


  }


})