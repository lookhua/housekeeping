//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    content: [
      // {
      //   id: 1,
      //   cardNo: "201946864131737105",
      //   createDate: "2019-01-12T09:11:23.000+0000",
      //   fkCardId: null,
      //   fkOrderId: 1,
      //   generateTime: null,
      //   outTradeNo: null,
      //   partionKey: null,
      //   payHour: 4,
      //   payPrice: 200,
      //   payTime: "2019-01-12T09:13:28.000+0000",
      //   payType: "消费",
      //   payerId: 15,
      //   payerName: null,
      //   status: null,
      //   updateDate: "2019-01-12T09:11:32.000+0000",
      //   versionKey: null
      // }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    //订单信息
    this.getContentList(userId);
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log("you are in onPullDownRefresh")
    // 下拉刷新
    // 显示顶部刷新图标
    //wx.showNavigationBarLoading();
    var that = this;
    var userId = wx.getStorageSync('userId');
    this.getContentList(userId);

    // 隐藏导航栏加载框
    //wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },


  getContentList: function(userId) {
    var page = this;
    var url = 'recharge/rechagerDetail';
    //订单列表
    app.requestUrl(url, {
      userId: userId
    }, 'POST', function(res) {
      console.log("get message list success!");
      let list = res.data.data;
      list.forEach((item) => {
        item.payTime = item.payTime.substring(0, 16).replace("T"," "); //要截取字段的字符串
      })
      page.setData({
        content:res.data.data
      });
    }, function(res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);
  }


})