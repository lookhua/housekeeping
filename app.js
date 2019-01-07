//app.js
App({
  config: require('utils/config.js'), //本地存储
  common: require('utils/common.js'),
  globalData: {
    userInfo: null
  },
  onLaunch: function() {
    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              //wx登录session check
              this.userWxSessionCheck();
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    }) // 获取用户信息

  },

  //wx登录session check
  userWxSessionCheck: function() {

    wx.checkSession({
      success: res => {
        // session_key 未过期，并且在本生命周期一直有效
        console.log("current user is on login and res is ")
        //checkuserid
        var userId = wx.getStorageSync('userId');
        console.log("userId is " + userId)
        var userToken = wx.getStorageSync('userToken');
        console.log("userToken is " + userToken)
        if (!userId || !userToken) {
          this.newUserLogIn();
        }
        //checkmobile
        var mobile = wx.getStorageSync('userMobile')
        if (!mobile) {
          wx.navigateTo({
            url: '../login/login'
          })
        }
      },
      fail: res => {
        this.newUserLogIn();
      }
    })
  },

  //wxlogin
  newUserLogIn: function() {
    // session_key 已经失效，需要重新执行登录流程
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var url = this.config.api_url;
        var nickName = this.globalData.userInfo.nickName;
        console.log("nickname is " + nickName);
        var data = {
          code: res.code,
          nickName: nickName
        };
        this.requestUrl('user/code2session', data, 'POST', function(res) {
          wx.setStorageSync('userId', res.data.data.id);
          wx.setStorageSync('userMobile', res.data.data.phone);
          wx.setStorageSync('userToken', res.data.data.token);
        }, this.dealError,true,true,false);
      }
    })
  },
  //获取当前用户id
  getUserId: function() {
    return wx.getStorageSync('userId');
  },
  //post直接请求
  requestUrl: function(path, data, method, callback, dealError, show = true, form = true,needPrefix = true) {
    if (show) {
      wx.showLoading({
        title: '载入中...'
      });
    }
    var userToken = wx.getStorageSync('userToken');
    var head = {
      token: userToken,
      'content-type': 'application/x-www-form-urlencoded'
    };
    if(!form){
      head = {
        token: userToken,
        'content-type': 'application/json'
      };
    }
    let url = '';
    if (needPrefix){
      url = this.config.api_url + '/wxapi/' + path;
    }else{
      url = this.config.api_url + '/' + path;
    }
    wx.request({
      url: url,
      data: data,
      header: head,
      method: method,
      success: function(res) {
        if (show) {
          wx.hideLoading();
        }
        //这里做判断，如果不报错就返回，如果报错，就做错误处理
        if (res.data.code == 0 || res.data.code == 200 ) {
          callback(res);
        } else {
          dealError(res);
        }
      },
      fail: function(res) {
        if (show) {
          wx.hideLoading();
        }
        common.errorToBack('接口调用失败');
      },
      complete: function(res) {
        if (show) {
          wx.hideLoading();
        }
      }
    });
  }

})