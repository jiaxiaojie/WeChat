// pages/person/person.js
var request = require("../../utils/Request.js");
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remain_max_minutes: '',
    remain_min_minutes: '',
    userAvatarUrl: '',
    userName: ''
  },
  //获取用户微信信息
  getUserAvatar: function () {
    var that = this;
    that.setData({
      userAvatarUrl: app.globalData.g_userInfo.avatarUrl,
      nickName: app.globalData.g_userInfo.nickName
    })
  },
  //充值
  goReacharge: function () {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getUserAvatar();
    console.log(app.globalData)
    that.setData({
      remain_min_minutes: app.globalData.g_remain_min_minutes,
      remain_max_minutes: app.globalData.g_remain_max_minutes
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