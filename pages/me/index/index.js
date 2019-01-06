//个人中心首页
var app = getApp(); //全局APP

Page({
  //页面初始数据
  data: {
    nickname: '',
    point: 0, //用户积分
    balance: '0.00', //用户余额
    isPoint: true, //开启积分
    avatar: '/static/image/default_avatar.png',
    bindMobile: false,
    statusData: [], //状态数据
    isClerk: false, //是不是店员
  },

  //加载执行
  onShow: function(options) {
    var page = this;
    app.db.userToken(function(token) {
      app.api.userInfo(function(res) {
        if (res.status) {
          //如果没有头像，设置本地默认头像
          var avatar = '/static/image/default_avatar.png';
          if (res.data.avatar) {
            avatar = res.data.avatar;
          }
          page.setData({
            nickname: res.data.nickname,
            avatar: avatar,
            point: res.data.point,
            balance: res.data.balance
          });
        }
      });
      //加载订单数量
      app.api.getOrderStatusNum('1,2,3,4', function(res) {
        page.setData({
          statusData: res.data
        });
      });

    });
  },

  //查看全部订单
  orderAll: function() {
    wx.navigateTo({
      url: '/pages/order/orderList?type=all',
    });
  },

  //待支付订单
  orderNoPay: function() {
    wx.navigateTo({
      url: '/pages/order/orderList?type=pendingpayment',
    });
  },

  //待发货订单
  orderNoShip: function() {
    wx.navigateTo({
      url: '/pages/order/orderList?type=pendingdelivery',
    });
  },

  //待收货订单
  orderNoReceiving: function() {
    wx.navigateTo({
      url: '/pages/order/orderList?type=goodstobereceived',
    });
  },

  //全部
  orderAftermarket: function() {
    wx.navigateTo({
      url: '/pages/order/orderList?type=all',
    });
  },


  //我的会员卡
  gotoCardPage: function() {
    console.log("gotoCardPage to card page")
    wx.switchTab({
      url: '../../card/card'
    });
  },

  //收货地址管理
  addressList: function() {
    wx.navigateTo({
      url: '/pages/me/userAddr/addressList'
    });
  },

  //设置
  setting: function() {
    wx.navigateTo({
      url: '/pages/me/userSetting/userSetting'
    });
  }

});