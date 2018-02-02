// pages/detail/detail.js
var Moment = require("../../utils/Moment.js");
var DateUtils = require("../../utils/DateUtils.js");
Page({
  roomInformation: [],
  checkInOutDate: null,
  currentTabIndex: 0,
  currentDetailIndex: 0,
  g_checkInDate: null,
  g_checkOutDate: null,

  data: {
    checkInDate: 0,
    checkInDays: 0,
    roomInformation: null,
    isFold: true,
    currentDetailIndex: 0,
    // checkInDate: "",
    // checkOutDate: "",
    // weekDay: ""
  },

//选择入住日期
  //CheckIn & Checkout date select
  dateSelect: function () {
    //url='../dateSelect/dateSelect'
    var CheckInOutDate = JSON.stringify({
      _checkInDate: this.g_checkInDate,
      _checkOutDate: this.g_checkOutDate
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
  tabFun: function (e) {
    //获取触发事件组件的dataset属性  
    this.currentTabIndex = e.target.dataset.id;
    this.listCurrentRoom();
    this.setData({
      currentTabIndex: e.target.dataset.id
    });
  },

  // 展开
  foldFn: function (e) {
    this.currentDetailIndex = e.target.dataset.typeindex;
    this.setData({
      currentDetailIndex: this.currentDetailIndex,
    });
  },

  //预定指定房型的房间
  bookingRoom: function (e) {
    if (e.target.dataset.hasOwnProperty("typeindex")) {
      var roomTypeIndex = e.target.dataset.typeindex;
      var bookingInformation = this.roomInformation[roomTypeIndex];
      bookingInformation.checkInOutDate = this.checkInOutDate;
      wx.navigateTo({
        url: '../order/order?bookingInformation=' + JSON.stringify(bookingInformation),
      });
      ///console.log(bookigInformation);
    }
    //console.log("bookingRoom");
  },

  onLoad: function (options) {
    var that = this;
// --
    that.g_checkInDate = new Date();
    that.g_checkOutDate = DateUtils.addFuc(new Date(), 1, 'day');
    that.updateCheckInOutDate();
// --
    this.checkInOutDate = JSON.parse(options.CheckInOutDate);
    var differ = DateUtils.daysDiffer(this.checkInOutDate.checkInDate, this.checkInOutDate.checkOutDate);
    that.setData({
      checkInDate: DateUtils.formatFuc(this.checkInOutDate.checkInDate, 'MM-dd'),
      checkInDays: differ,
      currentDetailIndex: that.currentDetailIndex,
      currentTabIndex: that.currentTabIndex
    });
    this.listCurrentRoom();
  },

  listCurrentRoom: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.host + '/room',
      data: { session: getApp().globalData.session_key },
      method: 'GET',
      success: function (result) {
        console.log(result);
        that.roomInformation = [];
        var rooms = result.data.data.rooms;
        var house_type = result.data.data.house_type;
        for (var index in rooms) {
          var charge_type = rooms[index].charge_type;
          if (charge_type == that.currentTabIndex) {
            that.roomInformation.push(rooms[index]);
          } else {
            ///console.log(charge_type, that.currentTabIndex);
          }
        }
        //console.log(that.roomInformation);
        for (var index in that.roomInformation) {
          var roomType = that.roomInformation[index].house_type_id;
          ///console.log(roomType);
          that.roomInformation[index].roomType = house_type[roomType];
        }
        that.setData({
          roomInformation: that.roomInformation
        });
        ///console.log(that.roomInformation);
      }
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