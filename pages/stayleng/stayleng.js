// pages/stayleng/stayleng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:10,
    h1:0,
    h2:0,
    m1:0,
    m2:0,
    s1:0,
    s2:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.time_fun();
  },
  two_char(n) {
    return n >= 10 ? n : "0" + n;
  },
  //计时器
  time_fun() {
    var sec= 0;
    var that=this;
    var stime=setInterval(function () {
      sec++;
      var date = new Date(0, 0)
      date.setSeconds(sec);
      var h = that.two_char(date.getHours());
      var m = that.two_char(date.getMinutes());
      var s = that.two_char(date.getSeconds());
      that.setData({
        h1: h.toString().split('')[0]
      })
      that.setData({
        h2: h.toString().split('')[1]
      })
      that.setData({
        m1: m.toString().split('')[0]
      })
      that.setData({
        m2: m.toString().split('')[1]
      })
      that.setData({
        s1: s.toString().split('')[0]
      })
      that.setData({
        s2: s.toString().split('')[1]
      })
    }, 1000);
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
  leave:function(){
    wx.showModal({
      title: '退房',
      content: '您本次共计消费'+this.data.time+'小时',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})