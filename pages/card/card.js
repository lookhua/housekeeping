//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    advertisements: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    users: [],
    cardNumber: '00000',
    totalBalance: 90.56,
    cardTotalCount: 4
  },
  //事件处理函数
  scanCardNumber: function() {
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //     this.setData({
    //       cardNumber: res.result
    //     });
    //   }
    // });
    wx.redirectTo({
      url: 'cardbind',
    })
  },
  moneyReCharge:function(){

  },
  onLoad: function() {
    //this.pullUserInfo();
    //this.pullAdvertisements();
  }

})