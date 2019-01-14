//个人中心首页
var app = getApp(); //全局APP

Page({
  //页面初始数据
  data: {
    userType: 2,
    nickname: '',
    point: 0, //用户积分
    cardTotalBalance: '0.00', //用户余额
    cardTotalHour: '0.00', //用户余额
    isPoint: true, //开启积分
    avatar: '/static/image/default_avatar.png',
    bindMobile: false,
    statusData: [0, 0, 0, 0, 0], //状态数据
    isClerk: false, //是不是店员
  },

  onLoad: function(e) {
    let type = wx.getStorageSync("userType") || 2; //2-用户，3-保洁人员
    this.setData({
      userType: type
    });
  },

  //加载执行
  onShow: function(options) {
    var page = this;
    var userId = wx.getStorageSync('userId');
    //加载订单数量
    app.requestUrl('order/getOrdersAmount', {
      userId: userId
    }, 'POST', function(res) {
      var array = [0];
      var preOrder = res.data.data.confirmamount || 0;
      array.push(preOrder);
      var preService = res.data.data.serviceamount || 0;
      array.push(preService);
      var prePay = res.data.data.payamount || 0;
      array.push(prePay);
      var preEval = res.data.data.evaluateamount || 0;
      array.push(preEval);
      page.setData({
        statusData: array
      });
    }, function(res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);

    //余额积分
    app.requestUrl('card/userCardSurvey', {
      userId: userId
    }, 'POST', function(res) {
      page.setData(res.data.data);
    }, function() {
      app.common.errorToShow("请求失败");
    }, true);
  },

  //查看全部订单
  orderAll: function() {
    wx.navigateTo({
      url: '/pages/order/orderList?tabselected=0&userType=2',
    });
  },

  //预约中
  orderNoPay: function() {
    wx.navigateTo({
      url: '/pages/order/orderList?tabselected=1&userType=2',
    });
  },

  //待服务
  orderNoShip: function() {
    wx.navigateTo({
      url: '/pages/order/orderList?tabselected=2&userType=2',
    });
  },

  //待付款
  orderNoReceiving: function() {
    wx.navigateTo({
      url: '/pages/order/orderList?tabselected=3&userType=2',
    });
  },

  //待评价
  orderAftermarket: function() {
    wx.navigateTo({
      url: '/pages/order/orderList?tabselected=4&userType=2',
    });
  },

  //分配给我的订单
  orderTome: function() {
    wx.navigateTo({
      url: '/pages/order/orderList?tabselected=2&userType=3',
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