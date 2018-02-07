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
    request.httpsGetRequest(requestUrl, jsonData, function (res) {
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
    wx.navigateTo({
      url: "../detail/detail?CheckInOutDate=" + CheckInOutDate,
    });
  },

  couponInformation: function () {
  },
  //CheckIn & Checkout date select
  dateSelect: function () {
    var CheckInOutDate = JSON.stringify({
      checkInDate: this.g_checkInDate,
      checkOutDate: this.g_checkOutDate
    })
    wx.navigateTo({
      url: "../dateSelect/dateSelect?CheckInOutDate=" + CheckInOutDate,
    });
  },

  updateCheckInOutDate: function () {
    this.checkInDate = DateUtils.formatFuc(this.g_checkInDate, 'MM-dd');
    this.checkOutDate = DateUtils.formatFuc(this.g_checkOutDate, 'MM-dd');
    this.weekDay = DateUtils.formatFuc(this.g_checkInDate, 'E');
    this.setData({
      checkInDate: this.checkInDate,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})