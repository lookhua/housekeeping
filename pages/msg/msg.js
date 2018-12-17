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
  }

})