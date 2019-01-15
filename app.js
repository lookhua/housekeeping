//app.js
App({
  config: require('utils/config.js'), //本地存储
  common: require('utils/common.js'),
  globalData: {
    hasUserInfo: false,
    userInfo: null
  },

  //onLaunch
  onLaunch: function() {
  
  },

  //post直接请求
  requestUrl: function(path, data, method, callback, dealError, show = false, form = true, needPrefix = true) {
    // if (show) {
    //   wx.showLoading({
    //     title: '载入中...'
    //   });
    // }
    var userToken = wx.getStorageSync('userToken');
    var head = {
      token: userToken,
      'content-type': 'application/x-www-form-urlencoded'
    };
    if (!form) {
      head = {
        token: userToken,
        'content-type': 'application/json'
      };
    }
    let url = '';
    if (needPrefix) {
      url = this.config.api_url + '/wxapi/' + path;
    } else {
      url = this.config.api_url + '/' + path;
    }
    wx.request({
      url: url,
      data: data,
      header: head,
      method: method,
      success: function(res) {
        // if (show) {
        //   wx.hideLoading();
        // }
        //这里做判断，如果不报错就返回，如果报错，就做错误处理
        if (res.data.code == 0 || res.data.code == 200) {
          callback(res);
        } else {
          dealError(res);
        }
      },
      fail: function(res) {
        // if (show) {
        //   wx.hideLoading();
        // }
        common.errorToBack('接口调用失败');
      },
      complete: function(res) {
        // if (show) {
        //   wx.hideLoading();
        // }
      }
    });
  }

})