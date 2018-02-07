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
    that.setData({
      remain_min_minutes: app.globalData.g_remain_min_minutes,
      remain_max_minutes: app.globalData.g_remain_max_minutes
    })
  }
})