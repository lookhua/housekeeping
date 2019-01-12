//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    msgList: [{
        id: 1,
        title: "优惠券消息",
        content: "fwefwefwef",
        creatTime:"2018-10-09"
      },
      {
        id: 2,
        title: "优惠券消息",
        content: " 在做小程序的时候遇到在text标签里面的文本过长,需要限制显示长度,并且在限制了长度的后面加上省略号代表后面还有内容。 这时候设置样式",
        creatTime: "2018-10-09"
      },
      {
        id: 3,
        title: "优惠券消息",
        content: "fwefwefwef",
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
    app.requestUrl('order/userCardSurvey', {
      userId: userId,
      orderId: page.orderId
    }, 'POST', function (res) {
      page.setData({
        wallet: {
          cardCount: res.data.cardNum,
          balance: res.data.cardTotalBalance
        }
      });
    }, function (res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);

    //获取卡信息
    app.requestUrl('card/userCardSurvey', {
      userId: userId
    }, 'POST', function (res) {
      page.setData({
        wallet: {
          cardCount: res.data.cardNum,
          balance: res.data.cardTotalBalance
        }
      });
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

})