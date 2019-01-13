//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    orderId:'',
    comment: '1'
  },

  //输入评价
  bindTextAreaBlur: function(e) {
    var comment = e.detail.value;
    this.setData({
      comment: comment
    });
  },

  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var orderId = options.orderId || 0;
    this.setData({
      orderId: orderId
    })
  },

  orderComment: function(e) {
    var comment = this.data.comment;
    var orderId = this.data.orderId;
    if (!comment) {
      app.common.errorToShow("请输入评价内容");
      return false;
    }
    var userId = wx.getStorageSync("userId")
    console.log("userId get in login page is "+userId)
    var data = {
      id:0,
      order:{id:orderId},
      evaluateContent: comment,
      orderId: userId
    };
    app.requestUrl('order/evaluate', data, 'POST', function(res) {
      wx.navigateBack(1);
    }, function() {
      app.common.errorToShow("评价失败");
    }, true,false);
    
  }

})