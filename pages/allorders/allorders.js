// pages/allorders/allorders.js
var moment = require("../../utils/moment.min.js");
var request = require("../../utils/Request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    allOrders:[]
  },
  swichNav: function (e) {
    var that = this;
    var current = e.target.dataset.current;
    if (this.data.currentTab === current) {
      return false;
    } else {
      that.setData({
        currentTab: current
      });
      that.data.allOrders = 1;
    }
  },
  //取消支付
  cancelPay:function(e){
    var requestUrl = "/order/cancel";
    if (e.target.dataset.hasOwnProperty("id")){
      var orderId = e.target.dataset.id;
    }
    var jsonData = {
      id: orderId,
      session: getApp().globalData.session_key
    };
    request.httpsPostRequest(requestUrl, jsonData, function (res) {
      console.log(res.errcode)
      if(res.errcode == 0){
        wx.showToast({
          title: '取消成功',
          icon: 'none',
          duration: 2000
        })
      }
      else{
        wx.showToast({
          title: res.errmsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
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
      if (res.errcode == 0) {
        var oldOrderList = res.data.orders;
        var newOrderList = [];
        var newOrderList = oldOrderList.map(function (value) {
          console.log(value)
          var date1 = moment(new Date(value.come_at)); //开始时间
          var date2 = moment(new Date(value.created_at));//结束时间
          var differHours = date2.diff(date1, 'hours');
          var differMinutes = (date2.diff(date1, 'minutes')) % 60;
          value.come_at = moment(value.come_at).format('YYYY-MM-DD'); 
          value.differH = differHours;
          value.differM = differMinutes;
          console.log(value)
          return value;
        })
        console.log(newOrderList);
        that.setData({
          allOrders: newOrderList
        })
      }
      else {
        wx.showToast({
          title: res.errmsg,
          icon: 'none',
          duration: 2000
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