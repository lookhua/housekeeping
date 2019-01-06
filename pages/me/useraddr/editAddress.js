//修改收货地址
const app = getApp(); //获取全局app.js

Page({
  //页面的初始数据
  data: {
    id: 0,
    remark: '',
    contactUser: '',
    contactPhone: '',
    region: ['安徽省', '合肥市', '政务区'], //开户行地区
    contactSsqx: '',
    contactAddress: '',
    isDefault: 0,
    versionKey:0,
    partionKey:'1',
    status: 1
  },


  //生命周期函数--监听页面加载
  onLoad: function(options) {
    let id = options.id;
    if (id) {
      this.getAddressInfo(id);
    }
  },


  //获取地址详细信息
  getAddressInfo: function(id) {
    let page = this;
    let data = {
      'addressId': id
    }
    app.requestUrl('address/get', data, 'GET', function(res) {
      let region = res.data.data.contactSsqx.split(",")
      res.data.data.region = region;
      page.setData(res.data.data);
    }, function() {
      app.common.errorToShow("请求失败");
    }, true);

  },


  //获取姓名
  getName: function(e) {
    let name = e.detail.value;
    this.setData({
      contactUser: name
    });
  },


  //获取手机号
  getMobile: function(e) {
    let mobile = e.detail.value;
    this.setData({
      contactPhone: mobile
    });
  },


  //获取详细地址
  getAddress: function(e) {
    let address = e.detail.value;
    this.setData({
      contactAddress: address
    });
  },


  //地区选择
  regionChange: function(e) {
    let province_name = e.detail.value[0];
    let city_name = e.detail.value[1];
    let county_name = e.detail.value[2];
    let postal_code = 0;
    let page = this;
    let data = {
      province_name: province_name,
      city_name: city_name,
      county_name: county_name,
      postal_code: postal_code
    }
    let regionName = [province_name, city_name, county_name];
    page.setData({
      region: regionName
    });
  },


  //添加地址
  editAddress: function() {
    let page = this;
    if (!page.data.contactUser){
      app.common.errorToShow("联系人不能为空");
      return false;
    }
    if (!page.data.contactPhone) {
      app.common.errorToShow("手机号码不能为空");
      return false;
    }
    if (!page.data.contactAddress) {
      app.common.errorToShow("详细地址不能为空");
      return false;
    }
    let data = page.data;
    data.contactSsqx = page.data.region.join(",")
    app.requestUrl('address/saveOrUpdate', data, 'POST', function(res) {
      setTimeout(function() {
        wx.navigateBack(1);
      }, 1500);
    }, function() {
      app.common.errorToShow("请求失败");
    }, true, false);
  }
});