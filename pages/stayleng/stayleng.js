// pages/stayleng/stayleng.js
var request = require("../../utils/Request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:0,
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
  onLoad: function () {
    var that = this;
    var requestUrl = "/order/current"
    var jsonData = {
      session: getApp().globalData.session_key
    };
    request.httpsGetRequest(requestUrl, jsonData, function (res) {
      that.time_fun(res.data.check_in_time);
      that.setData({
        time: parseInt(res.data.remain_time)
      })
    });
  },
  two_char(n) {
    return n >= 10 ? n : "0" + n;
  },
  //计时器
  time_fun(checkTime) {
    var sec= 0;
    var that=this;
    var stime=setInterval(function () {
      sec++;
      // var checkInDate = new Date('2018-02-01 12:00:00');
      // var curDate = new Date();
      //时间差的毫秒数
      // var differTime = curDate.getTime() - checkInDate.getTime();
      var differTime = checkTime*1000 + sec*1000;

      //计算相差小时数
      var hours = Math.floor(differTime / (3600 * 1000));
      //计算相差分钟数  
      //计算小时数后剩余的毫秒数
      var leave1 = differTime % (3600 * 1000);  
      var minutes = Math.floor(leave1 / (60 * 1000))

      //计算相差秒数  
       //计算分钟数后剩余的毫秒数  
      var leave2 = leave1 % (60 * 1000)     
      var seconds = Math.round(leave2 / 1000)
      
      var h = that.two_char(hours);
      var m = that.two_char(minutes);
      var s = that.two_char(seconds);
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
  //退房
  leave: function () {
    wx.showModal({
      title: '退房',
      content: '您本次共计消费' + this.data.time + '小时',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  }
})