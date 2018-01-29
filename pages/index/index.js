var Moment = require("../../utils/Moment.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
      //默认日期&时间
    checkInDate: Moment(new Date()).format('yyyy-MM-dd'),
    day: Moment(new Date()).format('E')
  },

  checkInTime: function () {
    wx.navigateTo({
      url:'../stayleng/stayleng',
    });
  },

  checkInDetail:function(){
  
    var dateInfo = JSON.stringify({
      inDate: this.data.checkInDate,
      outDate: this.data.checkOutDate
    })
    console.info(dateInfo)
    wx.navigateTo({
      url: "../detail/detail?dateInfo=" + dateInfo,
    });
  },

  couponInformation: function () {    
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
    var self=this;
    wx.getStorage({
      key: 'ROOM_SOURCE_DATE',
      success: function(res) {
        self.setData({
          checkInDate: res.data.checkInDate,
          checkOutDate: res.data.checkOutDate,
          day: Moment(new Date(res.data.checkInDate)).format('E')
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