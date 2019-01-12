//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inoutList: [{
        id: 1,
        title: "充值",
      content: "充值卡号:09012312931023(支付宝)",
        money: +300,
        creatTime:"2018-10-09"
      },
      {
        id: 2,
        title: "充值",
        content: "充值卡号:09012312931023(微信)",
        money: +500,
        creatTime: "2018-10-09"
      },
      {
        id: 3,
        title: "消费",
        content: "服务单号:201809301228(预约服务)",
        money:-240,
        creatTime: "2018-10-09"
      }

    ]
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var orderId = options.orderId || '';
    this.setData({
      orderId: orderId
    })
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
    var page = this;
    var userId = wx.getStorageSync('userId');
    //订单信息
    app.requestUrl('recharge/rechagerDetail', {
      userId: userId
    }, 'POST', function (res) {
      //debugger
      page.setData(res.data.inoutList);
    }, function (res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);

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

  }

})