//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nikeName: '',
    bindMobile:''
  },
  //新版本获取用户信息
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.hasUserInfo = true
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    //后进行登录
    app.userWxSessionCheck();
  },

  //输入手机号
  mobileInputFun: function(e) {
    var bindMobile = e.detail.value;
    this.setData({
      bindMobile: bindMobile
    });
  },

  //输入昵称
  nikeNameInputFun: function (e) {
    var nikeName = e.detail.value;
    this.setData({
      nikeName: nikeName
    });
  },

  getUserInfo: function (e) {
    console.log(e)
    this.setData({
      nikeName: e.detail.userInfo.nickName
    })
  },

  bindMobileToUser: function(e) {
    var nikeName = this.data.nikeName;
    if (!nikeName) {
      app.common.errorToShow("请输入昵称");
      return false;
    }
    var mobileInput = this.data.bindMobile;
    if (!mobileInput) {
      app.common.errorToShow("请输入正确的手机号");
      return false;
    }
    wx.setStorageSync("userNickName", nikeName);
    wx.setStorageSync('userMobile', mobileInput);
    this.userWxSessionCheck();
    
  },

  //wx登录session check
  userWxSessionCheck: function () {
    wx.checkSession({
      success: res => {
        // session_key 未过期，并且在本生命周期一直有效
        console.log("current user is on login and res is ")
        //checkuserid
        var userId = wx.getStorageSync('userId');
        console.log("checkSession userId is " + userId)
        var userToken = wx.getStorageSync('userToken');
        console.log("checkSession userToken is " + userToken)
        //强制进行登录，防止用户信息更新导致的信息不同步
        this.newUserLogIn();
      },
      fail: res => {
        this.newUserLogIn();
      }
    })
  },

  //wxlogin
  newUserLogIn: function () {
    // session_key 已经失效，需要重新执行登录流程
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var url = app.config.api_url;
        var nickName = wx.getStorageSync("userNickName");
        console.log("wx.login code2session nickname is " + nickName);
        var data = {
          code: res.code,
          nickName: nickName
        };
        app.requestUrl('user/code2session', data, 'POST', function (res) {
          wx.setStorageSync('userId', res.data.data.id);
          wx.setStorageSync('userMobile', res.data.data.phone);
          wx.setStorageSync('userToken', res.data.data.token);
          wx.setStorageSync('userType', res.data.data.type);
          wx.navigateBack(1);
        }, function(res){
          app.common.errorToShow("用户登录失败");
        }, true, true, false);
      }
    })
  },

})