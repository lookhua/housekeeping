const app = getApp(); //获取全局app.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    payMoney: 120,
    order: {
      remark: '速度点,多带点洗碟精',
      serviceAddr: "安徽省合肥市长江西路红枫路与尔西二环交口航线家园12栋1208室",
      serverTime: '2019-09-18 12:00-13:00'
    },
    wallet: {
      cardCount: 4,
      balance: 250
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
          cardCount: res.data.cardNum,
          balance: res.data.cardTotalBalance
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  payOrder: function() {
    wx.navigateTo({
      url: '../member/order/orderList/orderList'
    })
  }

})