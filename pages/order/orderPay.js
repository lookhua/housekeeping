const app = getApp(); //获取全局app.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    payMoney: 120,
    id: 5,
    subscribe: {},
    service: {},
    payment: null,
    hours: null,
    serviceHours: null,
    orderStatus: 2,
    dispatchTime: null,
    subscribeTime: null,
    confirmTime: null,
    serviceTime: null,
    endTime: null,
    paymentTime: null,
    evaluateTime: null,
    closeTime: null,
    servicer: {},
    consumer: {},
    consumerName: '',
    consumerAddr: '',
    consumerPhone: '',
    servicerName: '',
    servicerPhone: '',
    isEffective: null,
    isDispatch: 1,
    title: null,
    remark: '',
    createDate: null,
    updateDate: null,
    versionKey: null,
    partionKey: null,
    status: 1,
      selectType: 1,
    wallet: {
      cardCount: 4,
      balance: 250,
      hours: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var orderId = options.orderId || 0;
    this.setData({
      orderId: orderId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var page = this;
    var userId = wx.getStorageSync('userId');
    var orderId = page.data.orderId;
    //订单信息
    app.requestUrl('order/getOrderById', {
      userId: userId,
      orderId: orderId
    }, 'GET', function(res) {
      page.setData(res.data.data);
    }, function(res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);

    //获取卡信息
    app.requestUrl('card/userCardSurvey', {
      userId: userId
    }, 'POST', function(res) {
      page.setData({
        wallet: {
          selectType:1,
          cardCount: res.data.data.cardNum,
          balance: res.data.data.cardTotalBalance,
          hours: res.data.data.cardTotalHour
        }

      });
    }, function(res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  radioChange: function(e) {
    var page = this;
    let type = e.detail.value;
    console.log('radio发生change事件，携带value值为：' + type)
    page.setData({
      selectType: type
    });
    var userId = wx.getStorageSync('userId');
    var orderId = page.data.id;
    //订单信息
    app.requestUrl('recharge/isEnoughMoney', {
      userId: userId,
      type: type,
      orderId: orderId
    }, 'POST', function(res) {
      page.setData(res.data.data);
    }, function(res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  payOrder: function() {
    var page = this;
    var type = page.data.selectType;
    var userId = wx.getStorageSync('userId');
    var orderId = page.data.id;
    //订单信息
    app.requestUrl('recharge/rechagerOrder', {
      userId: userId,
      type: type,
      orderId: orderId
    }, 'POST', function(res) {
      app.common.errorToShow("支付成功");
      setTimeout(function () {
        wx.navigateBack(1);
      }, 1500);
    }, function(res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);
  }

})