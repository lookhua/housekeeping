const app = getApp(); //获取全局app.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userType: 2,
    tabselected: 0,
    orderStatus: 0,
    pageIndex: 0,
    pageSize: 10,
    content: [{
        serviceBeginTime: "2018-09-03 03:00-06:00",
        serverAddr: "安徽省合肥市长江西路红枫路与尔西二环交口航线家园12栋1208室",
        remark: "多带洗衣服，多带两个人来",
        payMoney: 120
      },
      {
        serviceBeginTime: "2018-09-03 03:00-06:00",
        serverAddr: "安徽省合肥市长江西路红枫路与尔西二环交口航线家园12栋1208室",
        remark: "多带洗衣服，多带两个人来",
        payMoney: 120
      },
      {
        serviceBeginTime: "2018-09-03 03:00-06:00",
        serverAddr: "安徽省合肥市长江西路红枫路与尔西二环交口航线家园12栋1208室",
        remark: "多带洗衣服，多带两个人来",
        payMoney: 120
      }
    ],
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

  getOrderList: function(userId, serverId, orderStatus, data, up = false) {
    var url = '';
    if (type == 3) { //3-保洁人员
      url = 'order/getOrdersByServicer';
    } else {
      url = 'order/getOrdersByConsumer';
    }
    var pageIndex = data.pageIndex;
    var pageSize = data.pageSize;
    var currentCount = data.numberOfElements;
    var first = data.first;
    var last = data.last;
    if (up) { //下拉刷新
      pageIndex = 1;
    } else { //上拉刷新
      if (pageSize > currentCount){
        pageIndex = pageIndex;
      }else{
        pageIndex = pageIndex + 1;
      }

    }

    //订单列表
    app.requestUrl(url, {
      userId: userId,
      orderStatus: orderStatus,
      pageIndex: 1,
      pageSize: 10
    }, 'POST', function(res) {
      this.setData(res.data.data);
    }, function(res) {
      app.common.errorToShow("请求失败:" + res.msg);
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
   * 生命周期函数--监听页面卸载
   */
  topMenuTap: function(e) {

    //get the selected tagid 
    let tagId = e.target.dataset.tagid;
    let orderStatus = this.tagId2OrderStatus(tagId);
    console.log("you chioce tagid is " + tagId)

    //get the order list 

    //set data
    this.setData({
      tabselected: tagId
    });
  },

  optOder: function(e) {
    let orderIndex = e.target.dataset.index;
    let tagId = e.target.dataset.tagid;
    console.log("you chioce tagId is " + tagId)
    console.log("you chioce orderIndex is " + orderIndex)
    wx.navigateTo({
      url: 'orderPay'
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

    var moment_list = that.data.orderList;
    console.log("you are in onPullDownRefresh moment_list1 " + moment_list.length)
    moment_list.unshift({
      serviceBeginTime: "2018-09-03 03:00-06:00",
      serverAddr: "安徽省合肥市长江西路红枫路与尔西二环交口航线家园12栋1208室",
      remark: "多带洗衣服，多带两个人来",
      payMoney: 120
    });

    console.log("you are in onPullDownRefresh moment_list2 " + moment_list.length)


    // 设置数组元素
    that.setData({
      orderList: moment_list
    });

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
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    var moment_list = that.data.orderList;
    moment_list.push({
      serviceBeginTime: "2018-09-03 03:00-06:00",
      serverAddr: "安徽省合肥市长江西路红枫路与尔西二环交口航线家园12栋1208室",
      remark: "多带洗衣服，多带两个人来",
      payMoney: 120
    });

    // 设置数据
    this.setData({
      orderList: moment_list
    })
    wx.hideLoading();

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})