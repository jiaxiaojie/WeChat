// pages/allorders/allorders.js
var Moment = require("../../utils/Moment.js");
var request = require("../../utils/Request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    allOrders:null
  },
  swichNav: function (e) {
    var that = this;
    var current = e.target.dataset.current;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options){
      this.setData({
        currentTab: options.tab
      })
    };

    //获取用户的全部订单
    var requestUrl = "/order";
    var jsonData = {
      session:getApp().globalData.session_key
    };
    request.httpsGetRequest(requestUrl, jsonData, function (res) {
      console.log(res)
      if(res.errcode == 0){
        that.setData({
          allOrders: res.data.orders
        })
        
      }else{
        wx.showToast({
          title: res.errmsg,
          icon:'none',
          duration:2000
        })
      }
      
    })
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