var Moment = require("../../utils/Moment.js");
var request = require("../../utils/Request.js");
var DateUtils = require("../../utils/DateUtils.js");

Page({
  g_checkInDate: null,
  g_checkOutDate: null,
  /**
   * 页面的初始数据
   */
  data: {
    //默认日期&时间
    checkInDate: "",
    checkOutDate: "",
    weekDay: ""
  },

  //获得分时信息
  checkInTime: function () {
    var requestUrl = "/order/current";
    var jsonData = {
      session: getApp().globalData.session_key
    };
    console.log(getApp().globalData.session_key)
    request.httpsGetRequest(requestUrl, jsonData, function (res) {
      ///console.log(res)
      if (res.errcode == 0) {
        wx.navigateTo({
          url: '../stayleng/stayleng',
        })

      } else {
        wx.navigateTo({
          url: '../unstay/unstay',
        })
      }
    })
  },
  //查看卡券信息
  viewCoupons: function () {
    wx.navigateTo({
      url: '../breakfast/breakfast',
    })
  },

  //查看会员信息
  viewMember: function () {
    wx.navigateTo({
      url: '../person/person',
    })
  },

  //Booking Room
  bookRoom: function () {
    var CheckInOutDate = JSON.stringify({
      checkInDate: this.g_checkInDate,
      checkOutDate: this.g_checkOutDate
    })
    //console.info(CheckInOutDate)
    wx.navigateTo({
      url: "../detail/detail?CheckInOutDate=" + CheckInOutDate,
    });
  },

  couponInformation: function () {
  },
  //CheckIn & Checkout date select
  dateSelect: function () {
    //url='../dateSelect/dateSelect'
    var CheckInOutDate = JSON.stringify({
      checkInDate: this.g_checkInDate,
      checkOutDate: this.g_checkOutDate
    })
    //console.info(CheckInOutDate)
    wx.navigateTo({
      url: "../dateSelect/dateSelect?CheckInOutDate=" + CheckInOutDate,
    });
  },

  updateCheckInOutDate: function () {
    //console.log(this.g_checkInDate, this.g_checkOutDate); 
    this.checkInDate = DateUtils.formatFuc(this.g_checkInDate, 'MM-dd');
    this.checkOutDate = DateUtils.formatFuc(this.g_checkOutDate, 'MM-dd');
    this.weekDay = DateUtils.formatFuc(this.g_checkInDate, 'E');
    //console.log(this.checkInDate, this.checkOutDate, this.weekDay);
    this.setData({
      checkInDate: this.checkInDate,
      ///checkOutDate: res.data.checkOutDate,
      weekDay: this.weekDay
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.g_checkInDate = new Date();
    this.g_checkOutDate = DateUtils.addFuc(new Date(), 1, 'day');
    this.updateCheckInOutDate();
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
    var that = this;
    wx.getStorage({
      key: 'ROOM_SOURCE_DATE',
      success: function (res) {
        that.g_checkInDate = DateUtils.formatFuc(res.data.checkInDate, 'yyyy-MM-dd');
        that.g_checkOutDate = DateUtils.formatFuc(res.data.checkOutDate, 'yyyy-MM-dd');
        that.updateCheckInOutDate();
        console.log(that.g_checkInDate, that.g_checkOutDate);
        wx.clearStorage({
          success: function (res) {
            console.log("onShow", "wx.clearStorage");
          }
        })
      },
    })
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