Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  payOrder:function(){
    wx.navigateTo({
      url: '../member/order/orderList/orderList'
    })
  }

})