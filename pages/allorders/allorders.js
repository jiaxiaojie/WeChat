// pages/allorders/allorders.js
var moment = require("../../utils/moment.min.js");
var request = require("../../utils/Request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    allOrders:[],
    cancelOrderList:[],
    unpayOrderList:[],
    checkedOrderList:[],
    uncheckedOrderList:[]
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
    }
  },
  //支付
  goPay: function (e) {
    var requestUrl = "/order/repay-order";
    if (e.target.dataset.hasOwnProperty("id")) {
      var orderId = e.target.dataset.id;
    }
    var jsonData = {
      id: orderId,
      session: getApp().globalData.session_key
    };
    request.httpsGetRequest(requestUrl, jsonData,function(res){
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
          icon:'none',
          duration:1500
        })
      }
    });
    
  },
  //取消支付
  cancelPay:function(e){
    let that = this;
    var requestUrl = "/order/cancel";
    if (e.target.dataset.hasOwnProperty("id")){
      var orderId = e.target.dataset.id;
    }
    var jsonData = {
      id: orderId,
      session: getApp().globalData.session_key
    };
    request.httpsPostRequest(requestUrl, jsonData, function (res) {
      if(res.errcode == 0){
        wx.showToast({
          title: '取消成功',
          icon: 'none',
          duration: 2000
        });
        //刷新页面
        that.getAllOrders();
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
    if (options){
      this.setData({
        currentTab: options.tab
     })
    }
    this.getAllOrders();
  },

getAllOrders:function(){
  let that = this;
  //获取用户的全部订单
  var requestUrl = "/order";
  var jsonData = {
    session: getApp().globalData.session_key
  };
  request.httpsGetRequest(requestUrl, jsonData, function (res) {
    if (res.errcode == 0) {
      var oldOrderList = res.data.orders;
      var newOrderList = [];
      var newOrderList = oldOrderList.map(function (value) {
        var date1 = moment(new Date(value.come_at)); //开始时间
        var date2 = moment(new Date(value.leave_at));//结束时间
        var differHours = date2.diff(date1, 'hours');
        var differMinutes = (date2.diff(date1, 'minutes')) % 60;
        value.come_at = moment(value.come_at).format('YYYY-MM-DD');
        value.leave_at = moment(value.leave_at).format('YYYY-MM-DD');
        value.differH = differHours;
        value.differM = differMinutes;
        return value;
      });

      var cancelOrderList = newOrderList.filter(function(value){
        return (value.order_state == 2 || value.order_state == 3);
      });
      var unpayOrderList = newOrderList.filter(function (value) {
        return (value.order_state == 6);
      });
      var checkedOrderList = newOrderList.filter(function (value) {
        return (value.order_state == 4 || value.order_state == 5);
      });
      var uncheckedOrderList = newOrderList.filter(function (value) {
        return (value.order_state == 0 || value.order_state == 1);
      });

      that.setData({
        allOrders: newOrderList,
        cancelOrderList: cancelOrderList,
        unpayOrderList: unpayOrderList,
        checkedOrderList: checkedOrderList,
        uncheckedOrderList: uncheckedOrderList
      })
    }
    else {
      wx.showToast({
        title: res.errmsg,
        icon: 'none',
        duration: 1500
      })
    }

  })
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