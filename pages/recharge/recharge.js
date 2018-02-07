// pages/recharge/recharge.js
var request = require("../../utils/Request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minTime:0,
    maxTime:0,
    memberTimePrice:0,
    timePrice:0
  },
  bindAmountMoney:function(e){
      this.setData({
        minTime: parseInt(e.detail.value / this.data.timePrice),
        maxTime: parseInt(e.detail.value / this.data.memberTimePrice)
      })
  },
  formSubmit: function (e) {
    if (e.detail.value.amount.length == 0) {
      wx.showToast({
        title: '金额不得为空!',
        icon:'none',
        duration: 1500
      })
    } else if (e.detail.value.amount <=1){
      wx.showToast({
        title: '金额不得小于1分钱!',
        icon: 'none',
        duration: 1500
      })
    }
    else{
      var data = {
        session:getApp().globalData.session_key,
        sum: e.detail.value.amount
      };
      request.httpsPostRequest('/pay/custom-pay', data, function (res) {
        if(res.errcode == 0){
          wx.requestPayment({
            'timeStamp': res.data.pay_config.timeStamp,
            'nonceStr': res.data.pay_config.nonceStr,
            'package': res.data.pay_config.package,
            'signType': res.data.pay_config.signType,
            'paySign': res.data.pay_config.paySign,
            'success': function (res) {
              console.log(res.errMsg)
              wx.navigateTo({
                url: '../person/person',
              })
            },
            'fail': function (res) {
              console.log(res.errMsg)
            }
          })
        }else{
          wx.showToast({
            title: res.errmsg,
            icon: 'none',
            duration: 1500
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var session = {
      session: getApp().globalData.session_key
    };
     //获取房间价格
    request.httpsGetRequest('/room', session,function(res){
      let data = res.data;
      if(res.errcode == 0){
        let houseListFrist = data.day_rooms[1];
        that.setData({
          memberTimePrice: houseListFrist.member_timekeeping_price,
          timePrice: houseListFrist.timekeeping_price
        });
      }
      else{
        console.log(res.errmsg)
      }
    });
  }
})