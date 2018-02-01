// pages/recharge/recharge.js
var request = require("../../utils/Request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amountMoney:'',
    minTime:0,
    maxTime:0,
    memberTimePrice:0,
    timePrice:0
  },
  bindAmountMoney:function(e){
      this.setData({
        amountMoney:e.detail.value,
        minTime: e.detail.value / timePrice,
        maxTime: e.detail.value / memberTimePrice
      })
  },
  formSubmit: function (e) {
    if (e.detail.value.amount.length == 0) {
      wx.showToast({
        title: '金额不得为空!',
        icon:'none',
        duration: 2000
      })
    } 
    else{
      var data = {
        session:getApp().globalData.session_key,
        sum: e.detail.value.amount
      };
      request.httpsPostRequest('/pay/custom-pay', data, function (res) {
        console.log(res)
        if(res.errcode !== 0){
          console.log('go recharge')
          wx.requestPayment({
            'timeStamp': '222',
            'nonceStr': '',
            'package': '',
            'signType': 'MD5',
            'paySign': '',
            'success': function (res) {
              console.log(res.errMsg)
            },
            'fail': function (res) {
              console.log(res.errMsg)
            }
          })
        }else{
          wx.showToast({
            title: res.errmsg,
            icon: 'none',
            duration: 2000
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
    console.log(getApp().globalData.session_key)
    var session = {
      session: getApp().globalData.session_key
    };
     //获取房间价格
    request.httpsGetRequest('/room', session,function(res){
      let data = res.data;
      console.log(data)
      let houseListFrist = data.rooms[0];
      console.log(houseListFrist)
      that.setData({
       memberTimePrice : houseListFrist.member_timekeeping_price,
       timePrice : houseListFrist.timekeeping_price
      });
      
    });
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})