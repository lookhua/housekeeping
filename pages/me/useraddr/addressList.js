//收货地址管理
const app = getApp(); //获取全局app.js

Page({
  //页面的初始数据
  data: {
    address: [
      //   {
      //   id: 0,
      //   remark: '',
      //   contactUser: '',
      //   contactPhone: '',
      //   contactSsqx: '',
      //   contactAddress: '',
      //   isDefault: 0
      // }
    ],
    editMod: '1' //editMod=true
  },


  //新增收货地址跳转
  address: function () {
    wx.navigateTo({
      url: 'editAddress',
    });
  },


  //初次加载
  onLoad: function (e) {
    if (e.editMod == '0') { //select in order
      this.setData({
        editMod: 0
      });
    }
  },


  //页面加载
  onShow: function () {
    this.getDataList();
  },


  //获取收货地址列表
  getDataList: function () {
    var page = this;
    var userId = wx.getStorageSync('userId');
    app.requestUrl('address/addressList', {
      userId: userId
    }, 'GET', function (res) {

      page.setData({
        address: res.data.data
      });
    }, function () {
      app.common.errorToShow("请求失败");
    }, true);
  },


  //删除收货地址
  delAddress: function (e) {
    let page = this;
    let id = e.currentTarget.dataset.id;
    app.requestUrl('address/delete', {
      addressId: id
    }, 'POST', function (res) {
      setTimeout(function () {
        page.getDataList();
      }, 1000);
    }, function () {
      app.common.errorToShow("请求失败");
    }, true, true);
  },


  //设置默认地址
  setDefault: function (e) {
    let page = this;
    let id = e.currentTarget.dataset.id;
    var userId = wx.getStorageSync('userId');
    let data = {
      'userId': userId,
      'addressId': id
    }
    app.requestUrl('address/setDefault', data, 'POST', function (res) {
      setTimeout(function () {
        page.getDataList();
      }, 1500);
    }, function () {
      app.common.errorToShow("请求失败");
    }, true);
  },


  //修改收货地址
  editAddress: function (e) {
    let page = this;
    let id = e.currentTarget.dataset.id;
    //如果是编辑模式
    if (page.data.editMod == '1') {
      wx.navigateTo({
        url: 'editAddress?id=' + id,
      });
      return false;
    } else {
      var item = e.currentTarget.dataset.item;
      wx.setStorageSync('userPerfectAddr', item);
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      prevPage.setData({
        selectAddress: true,
      });
      wx.navigateBack(1);
      // let data = 
      //   'id': id
      // }
      // app.api.getshipdetail(data, function(res) {
      //   if (res.status) {
      //     let region = res.data.area_name.split(" ");
      //     prevPage.setData({
      //       isAddress: true,
      //       name: res.data.name,
      //       mobile: res.data.mobile,
      //       address: res.data.address,
      //       areaId: res.data.area_id,
      //       userShipId: id,
      //       area: region,
      //     });
      //     wx.navigateBack(1);
      //   } else {
      //     wx.showModal({
      //       title: '提示',
      //       content: '该地址存在问题，无法使用',
      //       showCancel: false
      //     });
      //   }
      // });
    }
  }


});