// pages/recharge/recharge.js
var request = require("../../utils/Request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rAmount:''
  },
  // bindAmount:function(e){
  //   this.setData({
  //     rAmount: e.detail.value
  //   })
  // },
  // formSubmit:function(e){
  //   console.log('form发生了submit事件，携带数据为：', e.detail.value)
  // },



  name: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      name: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    var name2 = e.detail.value.name2;         //获取input初始值
    var name = that.data.name ? that.data.name : name2    //三元运算，如果用户没修改信息，直接提交原来的信息，如果用户修改了信息，就将修改了的信息和未修改过的信息一起提交
    request.httpsPostRequest('/pay/custom-pay', name, function (res) {
      console.log(res)
      
    })
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