//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cardTotalBalance:0,
    cardTotalHour:0,
    cardNum:0,
    userCardList:[
      // {
      //   id: 0,
      //   fkUserId: 0,
      //   cardNo: 0,
      //   cardType: 0,
      //   cardFaceValue: 0,
      //   cardBalance: 0,
      //   cardOverHour:0,
      //   cardEnableFlag: 0,
      //   status: 0,
      //   versionKey: 0,
      //   partionKey: 0
      // }
    ]
  },

  onLoad: function () {
    //this.pullUserInfo();
    //this.pullAdvertisements();
  },
  
  onShow: function () {
    var page = this;
    var userId = wx.getStorageSync('userId');
    console.log("getorderInit userid is " + userId)
    app.requestUrl('card/userCardSurvey', {
      userId: userId
    }, 'POST', function (res) {
      let userCardList = res.data.data.userCardList; //获取到的数据
      userCardList.forEach((item) => {
        item.activeDate = item.activeDate.substring(0, 10); //要截取字段的字符串
      })
      page.setData(res.data.data);
    }, function () {
      app.common.errorToShow("请求失败");
    }, true);

  },

  //绑定卡
  scanCardNumber: function() {
    wx.navigateTo({
      url: 'cardbind',
    })
  },
  
  //交易流水
  inoutListDetail: function () {
    wx.navigateTo({
      url: 'inoutlist',
    })
  },

  moneyReCharge:function(){
    wx.navigateTo({
      url: 'recharge',
    })
  }

})