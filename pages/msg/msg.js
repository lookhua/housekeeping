//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    pageIndex: 0,
    pageSize: 10,
    content: [
      // {
      // id: 0,
      // type: 0,
      // message: 0,
      // publishTime: 0,
      // invalidTime: 0,
      // createDate: 0,
      // status: 0,
      // }
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
    var page = this;
    var userId = wx.getStorageSync('userId');
    page.getContentList(userId);
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
   * 初始化页面参数
   */
  reversParams: function () {
    this.setData({
      pageIndex: 0,
      pageSize: 10,
      last: false,
      first: false,
      empty: false
    });
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    console.log("you are in onPullDownRefresh")
    // 下拉刷新
    // 显示顶部刷新图标
    //wx.showNavigationBarLoading();
    var that = this;
    var userId = wx.getStorageSync('userId');
    this.reversParams();
    this.getContentList(userId,true);

    // 隐藏导航栏加载框
    //wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("you are in onReachBottom")
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    var that = this;
    var userId = wx.getStorageSync('userId');
    this.getContentList(userId, false);
    // 关闭加载图标
    wx.hideLoading();
  },

  getContentList: function (userId, up = false) {
    var page = this;
    var url = 'message/getMessageByUserId';
    var pageIndex = page.data.pageIndex;
    var pageSize = page.data.pageSize;
    var currentCount = page.data.numberOfElements;
    var first = page.data.first;
    var last = page.data.last;
    if (up) { //下拉刷新
      pageIndex = 1;
    } else { //上拉刷新
      if (last) {
        app.common.errorToShow("没有更多了");
        return;
      }
      if (pageSize > currentCount) {
        //pageIndex = pageIndex;
        if (pageIndex <= 0) {
          pageIndex = 1;
        }
      } else {
        pageIndex = pageIndex + 1;
      }
    }
    console.log("get message List with userId is " + userId + " and pageIndex is " + pageIndex + " and pageSize is " + pageSize)
    //订单列表
    app.requestUrl(url, {
      userId: userId,
      pageIndex: pageIndex,
      pageSize: pageSize
    }, 'GET', function (res) {
      console.log("get message list success!");
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
    }, function (res) {
      app.common.errorToShow("请求失败:" + res.data.msg);
    }, true);
  }

})