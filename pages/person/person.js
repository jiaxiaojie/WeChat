// pages/person/person.js
var request = require("../../utils/Request.js");
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    remainder:0,
    userAvatarUrl: '',
    userName:''
  },
//获取用户微信信息
  getUserAvatar:function(){
    var that = this;
    app._getUserInfo(function (userInfo) {
      that.setData({
        userAvatarUrl: app.globalData.g_userInfo.avatarUrl,
        nickName:app.globalData.g_userInfo.nickName,
        _userInfo: userInfo
      })
      console.log('用户', that.data._userInfo)
    })
  },
  //充值
  goReacharge:function(){
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
    request.httpsGetRequest('/order', '', function (res) {
      that.setData({
        remainder: "7:20-9:00"
      })
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