// pages/order/order.js

var Moment = require("../../utils/Moment.js");

var daysDiffer = function (indate, outdate) {
  if (typeof indate === 'string' && typeof outdate === 'string') {
    indate = new Date(indate);
    outdate = new Date(outdate);
  } else {
    var curDate = new Date();
    indate = curDate;
    outdate = new Date(curDate.getTime() + 24 * 60 * 60 * 1000);//后一天
  }
  var time1 = indate.getTime();
  var time2 = outdate.getTime();
  var differ = Math.ceil((time2 - time1) / (1000 * 3600 * 24));//除不尽时,向上取整
  return differ;
}

Page({
  bookingInformation:null,
  /**
   * 页面的初始数据
   */
  data: {
    checkinDate:null,
    checkoutDate: null,
    stayNightNumber: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bookingInformation = JSON.parse(options.bookingInformation);
    
    var roomRegisterDateInfo = this.bookingInformation.roomBookingDateInfo;
    console.log(roomRegisterDateInfo);
     ///var differ = daysDiffer(roomRegisterDateInfo.inDate, roomRegisterDateInfo.outDate);
    // this.setData({
    //   checkinDate: roomRegisterDateInfo.inDate,
    //   checkoutDate: roomRegisterDateInfo.outDate,
    //   stayNightNumber: differ
    // });
    
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
   /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 将数值写回
    this.setData({
      num: num
    });

  },
  /* 点击+号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 将数值写回
    this.setData({
      num: num 
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    if (isNaN(num)) {
      num = 1;
    }
    // 将数值写回
    this.setData({
      num: parseInt(num)
    });
  },
})