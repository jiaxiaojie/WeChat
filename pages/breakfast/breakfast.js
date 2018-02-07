// pages/breakfast/breakfast.js
var request = require("../../utils/Request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    couponsList:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let url = "/coupon/breakfast-ticket";
    let jsonData = {
      session: getApp().globalData.session_key
    };
    request.httpsGetRequest(url, jsonData, function (res) {
     if(res.errcode == 0){
       that.setData({
         couponsList: res.data.brekker_ticket
       })
     }else{
       wx.showToast({
         title: res.errmsg,
         icon:'none',
         duration:1500
       })
     }
    })
  },
  swichNav:function(e){
    var that = this;
    var current = e.target.dataset.current;
    if (this.data.currentTab === current) {
      return false;
    } else {
      that.setData({
        currentTab: current
      })
    }
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
  
  }
})