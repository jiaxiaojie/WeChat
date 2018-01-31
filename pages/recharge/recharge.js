// pages/recharge/recharge.js
var request = require("../../utils/Request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amountMoney:'',
    minTime:0,
    maxTime:0
  },
  bindAmountMoney:function(e){
      this.setData({
        amountMoney:e.detail.value,
        minTime: e.detail.value*2,
        maxTime:e.detail.value*3
      })
  },
  formSubmit: function (e) {
    if (e.detail.value.amount.length == 0) {
      wx.showToast({
        title: '金额不得为空!',
        icon:'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } 
    else{
      var data = {
        sum:990
      };
      request.httpsPostRequest('/pay/custom-pay', data, function (res) {
        wx.showToast({
          title: 'res.errMsg',
          icon: 'loading',
          duration: 1500
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      })
    }
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