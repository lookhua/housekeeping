const app = getApp(); //获取全局app.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userType: 2,
    tabselected: 0,
    orderStatus: 0,
    content: [],
    pageable: {
      sort: {
        sorted: true,
        unsorted: false,
        empty: false
      },
      offset: 0,
      pageSize: 10,
      pageNumber: 0,
      unpaged: false,
      paged: true
    },
    totalPages: 0,
    totalElements: 0,
    number: 0,
    size: 10,
    numberOfElements: 0,
    sort: {
      sorted: true,
      unsorted: false,
      empty: false
    },
    last: false,
    first: false,
    empty: false
  },


  /**
   * 初始化页面参数
   */
  reversParams: function(tagId) {
    this.setData({
      tabselected: tagId,
      pageIndex: 0,
      pageSize: 10,
      last: false,
      first: false,
      empty: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var tagId = options.tabselected || 0
    var orderStatus = this.tagId2OrderStatus(tagId);
    let type = options.userType || 2; //2-用户，3-保洁人员
    console.log("type is " + type);
    this.setData({
      userType: type,
      tabselected: tagId,
      orderStatus: orderStatus
    });

  },

  tagId2OrderStatus: function(tagId) {
    var orderStatus = 0;
    if (tagId == 1) {
      orderStatus = 1;
    } else if (tagId == 2) {
      orderStatus = 2;
    } else if (tagId == 3) {
      orderStatus = 3;
    } else if (tagId == 4) {
      orderStatus = 4;
    } else {
      orderStatus = 0;
    }
    return orderStatus;
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var page = this;
    var userId = wx.getStorageSync('userId');
    var orderStatus = page.data.orderStatus;
    this.getOrderList(userId, orderStatus, page.data);
  },

  getOrderList: function(userId, orderStatus, up = false) {
    var page = this;
    var url = '';
    if (page.data.userType == 3) { //3-保洁人员
      url = 'order/getOrdersByServicer';
    } else {
      url = 'order/getOrdersByConsumer';
    }
    var pageIndex = page.data.number;
    var pageSize = page.data.size;
    var first = page.data.first;
    var last = page.data.last;
    if (up) { //下拉刷新
      pageIndex = 1;
    } else { //上拉刷新
      if (last) {
        app.common.errorToShow("没有更多了");
        return;
      } else {
        pageIndex = pageIndex + 2;
      }
    }
    console.log("get Order List with status is " + orderStatus + " and pageIndex is " + pageIndex + " and pageSize is " + pageSize)
    //订单列表
    app.requestUrl(url, {
      userId: userId,
      orderStatus: orderStatus,
      page: pageIndex,
      size: pageSize
    }, 'POST', function(res) {
      console.log("get order list success!");
      if (up) {
        page.setData(res.data.data);
      } else {
        var list = page.data.content;
        for (var i = 0; i < res.data.data.content.length; i++) {
          list.push(res.data.data.content[i]);
        }
        res.data.data.content = list;
        page.setData(res.data.data);
      }
    }, function(res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
   * 顶部的页面

   */
  topMenuTap: function(e) {
    //get the selected tagid 
    var page = this;
    var userId = wx.getStorageSync('userId');
    var tagId = e.target.dataset.tagid;
    var orderStatus = this.tagId2OrderStatus(tagId);
    console.log("you chioce tagid is " + tagId)
    this.reversParams(tagId);
    //get the order list 
    this.getOrderList(userId, orderStatus, page.data);
  },

  optOder: function(e) {
    // let orderIndex = e.target.dataset.index;
    // let tagId = e.target.dataset.tagid;
    // console.log("you chioce tagId is " + tagId)
    // console.log("you chioce orderIndex is " + orderIndex)
    // wx.navigateTo({
    //   url: 'orderPay'
    // });
  },

  cancelOrder: function(e) {
    let page = this;
    let orderIndex = e.target.dataset.index;
    let orderId = page.data.content[orderIndex].id;
    app.requestUrl('order/cancelOrder', {
      orderId: orderId
    }, 'POST', function(res) {
      console.log("cancelOrder success!");
      page.onPullDownRefresh();
    }, function(res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);
  },

  endService: function(e) {
    let page = this;
    let orderIndex = e.target.dataset.index;
    let orderId = page.data.content[orderIndex].id;
    app.requestUrl('order/endService', {
      orderId: orderId
    }, 'GET', function(res) {
      console.log("cancelOrder success!");
      page.onPullDownRefresh();
    }, function(res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);
  },

  startService: function(e) {
    let page = this;
    let orderIndex = e.target.dataset.index;
    let orderId = page.data.content[orderIndex].id;
    app.requestUrl('order/startService', {
      orderId: orderId
    }, 'GET', function(res) {
      console.log("cancelOrder success!");
      page.onPullDownRefresh();
    }, function(res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);
  },

  orderDetail: function(e) {
    let page = this;
    let orderIndex = e.currentTarget.dataset.index;
    let orderId = this.data.content[orderIndex].id || '';
    wx.navigateTo({
      url: 'orderPay?orderId=' + orderId + '&userType=' + page.data.userType
    });
  },

  orderPay: function(e) {
    let page = this;
    let orderIndex = e.target.dataset.index;
    let orderId = this.data.content[orderIndex].id || '';

    wx.navigateTo({
      url: 'orderPay?orderId=' + orderId + '&userType=' + page.data.userType
    });
  },

  orderCommect: function(e) {
    let page = this;
    let orderIndex = e.target.dataset.index;
    let orderId = this.data.content[orderIndex].id || '';
    wx.navigateTo({
      url: 'comment?orderId=' + orderId + '&userType=' + page.data.userType
    });
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
    var tagId = that.data.tabselected;
    var orderStatus = this.tagId2OrderStatus(tagId);
    this.reversParams(tagId);
    this.getOrderList(userId, orderStatus, true);

    // 隐藏导航栏加载框
    //wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("you are in onReachBottom")
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    var that = this;
    var userId = wx.getStorageSync('userId');
    var tagId = that.data.tabselected;
    var orderStatus = this.tagId2OrderStatus(tagId);
    this.getOrderList(userId, orderStatus, false);

    // 关闭加载图标
    wx.hideLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})