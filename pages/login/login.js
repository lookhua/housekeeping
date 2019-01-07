//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bindMobile: '15255108906'
  },
  //输入金额
  mobileInputFun: function(e) {
    var bindMobile = e.detail.value;
    this.setData({
      bindMobile: bindMobile
    });
  },
  bindMobileToUser: function(e) {
    var mobileInput = this.data.bindMobile;
    if (!mobileInput) {
      app.common.errorToShow("请输入正确的手机号");
      return false;
    }
    var userId = wx.getStorageSync("userId")
    console.log("userId get in login page is "+userId)
    if (!userId) {
      app.userWxSessionCheck();
      return false;
    }
    var data = {
      mobile: mobileInput,
      userId: userId
    };
    app.requestUrl('user/bindmobile', data, 'POST', function(res) {
      wx.setStorageSync('userMobile', res.data.data.phone);
      wx.switchTab({
        url: '../index/index'
      });
    }, function() {
      app.common.errorToShow("请求失败");
    }, true);
    
  }

})