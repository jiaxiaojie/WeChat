// pages/order/order.js
var Moment = require("../../utils/Moment.js");
var DateUtils = require("../../utils/DateUtils.js");

Page({
  bookingInformation: null,
  avalibleRoomNumber: 1,
  totalFee: 0,
  userName: "",
  phoneNumber: "",
  data: {
    checkinDate: "",
    checkoutDate: "",
    checkInNights: 1,
    roomType: "",
    avalibleRoomNumber: 1,
    totalFee: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bookingInformation = JSON.parse(options.bookingInformation);
    var differ = DateUtils.daysDiffer(this.bookingInformation.checkInOutDate.checkInDate, this.bookingInformation.checkInOutDate.checkOutDate);
    this.checkInNights = differ;
    console.log("bookingInformation :", this.bookingInformation);
    this.setData({
      checkinDate: DateUtils.formatFuc(this.bookingInformation.checkInOutDate.checkInDate, 'MM-dd'),
      checkoutDate: DateUtils.formatFuc(this.bookingInformation.checkInOutDate.checkOutDate, 'MM-dd'),
      checkInNights: differ,
      roomType: this.bookingInformation.house_name
    });
    this.updateTotalFee();
  },

  updateTotalFee: function () {
    if (this.bookingInformation.charge_type == 0) {//分时房
      this.totalFee = this.avalibleRoomNumber * (this.bookingInformation.cleaning_fee +
        this.bookingInformation.member_timekeeping_price);
    } else if (this.bookingInformation.charge_type == 1) {//天时房
      this.totalFee = this.avalibleRoomNumber * this.bookingInformation.member_house_price;
    } else {
      this.totalFee = 0;
    }
    this.totalFee *= this.checkInNights;
    this.setData({
      totalFee: this.totalFee
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

  },
  submitOrder: function () {
    if (this.userName === "") {
      wx.showToast({
        title: '请输入您的姓名',
        icon: 'success',
        duration: 1500
      })
      return;
    }
    if (this.phoneNumber === "") {
      wx.showToast({
        title: '请输入您的手机号码',
        icon: 'success',
        duration: 1500
      })
      return;
    }

    console.log(DateUtils.formatFuc(this.bookingInformation.checkInOutDate.checkInDate, 'yyyy-MM-dd hh:mm:ss'));
    console.log(DateUtils.formatFuc(this.bookingInformation.checkInOutDate.checkOutDate, 'yyyy-MM-dd hh:mm:ss'));
    console.log(this.userName);
    console.log(this.phoneNumber);
    console.log(this.bookingInformation.id);
  },
  bindUserName: function (e) {
    this.userName = e.detail.value;
  },
  bindPhoneNumber: function (e) {
    this.phoneNumber = e.detail.value;
  },
  /* 点击减号 */
  bindMinus: function () {
    ///console.log("bindMinus", this.avalibleRoomNumber);
    if (this.avalibleRoomNumber > 1) {
      this.avalibleRoomNumber--;
      this.setData({
        avalibleRoomNumber: this.avalibleRoomNumber
      });
      this.updateTotalFee();
    }
  },
  /* 点击+号 */
  bindPlus: function () {
    //console.log("bindPlus", this.avalibleRoomNumber);
    if (this.avalibleRoomNumber < this.bookingInformation.residue_house_quantity) {
      this.avalibleRoomNumber++;
      this.setData({
        avalibleRoomNumber: this.avalibleRoomNumber
      });
      this.updateTotalFee();
    }
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    if (isNaN(num) || num < 1 || num > this.bookingInformation.residue_house_quantity) {
      num = 1;
    }
    if (this.avalibleRoomNumber != num) {
      this.avalibleRoomNumber = parseInt(num);
      this.setData({
        avalibleRoomNumber: this.avalibleRoomNumber
      });
    }
  },
})