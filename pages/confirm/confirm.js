// pages/confirm/confirm.js
var moment = require("../../utils/moment.min.js");
var request = require("../../utils/Request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderPrice:0,
    totalnight:0,
    checkinDate:undefined,
    checkoutDate: undefined,
    userInfo:null,
    orderId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      let id = '';
      if (options){
        var jsonData = {
          id: options.id,
          session: getApp().globalData.session_key
        };
      }
      var url = "/order";
      request.httpsGetRequest(url,jsonData,function(res){
          // console.log("用户当前订单信息:",res)
         if(res.errcode == 0){
           let orderInfos = res.data.orders[0];
           let date1 = moment(new Date(orderInfos.come_at)); //开始时间
           let date2 = moment(new Date(orderInfos.leave_at));//结束时间
           let differDays = date2.diff(date1, 'days');
           // console.log("differDays", differDays)
           that.setData({
             orderPrice: orderInfos.order_price * 100,
             totalnight: differDays,
             checkinDate: moment(orderInfos.come_at).format('YYYY-MM-DD'),
             checkoutDate: moment(orderInfos.leave_at).format('YYYY-MM-DD'),
             userInfo: {
               name: orderInfos.people_detail[0].name,
               tel: orderInfos.people_detail[0].mobile
             },
             orderId: orderInfos.id
           })
          //  console.log(that.data.userInfo)
         }else{
           wx.showToast({
             title: res.errmsg,
             icon:'none',
             duration:1500
           })
         }
      })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // var self=this;
    // wx.getStorage({
    //   key: 'ROOM_SOURCE_DATE',
    //   success: function (res) {
    //     self.setData({
    //       totalnight: Moment(res.data.checkOutDate).differ(res.data.checkInDate)
    //     })
    //     var checkInDate = res.data.checkInDate.split("-")[1] + "月" + res.data.checkInDate.split("-")[2] + "日";
    //     var checkOutDate = res.data.checkOutDate.split("-")[1] + "月" + res.data.checkOutDate.split("-")[2] + "日";
    //     self.setData({
    //       checkInData: checkInDate,
    //       checkOutData: checkOutDate
    //     })
    //   },
    // })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  cancel:function(){
    var that = this;
    wx.showModal({
      title: '取消订单',
      content: '取消订单后,如需入住需再次预定,请确认您的操作',
      success: function (res) {
        if (res.confirm) {
          console.log('确认取消')
          let url = "/order/cancel";
          let jsonData = {
            id: that.data.orderId,
            session:getApp().globalData.session_key
          };
          request.httpsPostRequest(url,jsonData,function(res){
            // console.log(res)
            if(res.errcode == 0){
              wx.showToast({
                title: '取消成功',
                icon:'none',
                duration:1500
              });
              wx.navigateTo({
                url: '../allorders/allorders?tab=2',
              });
            }else{
              wx.showToast({
                title: res.errmsg,
                icon: 'none',
                duration: 1500
              });
            }
          });
        } else if (res.cancel) {
          console.log('再等等')
        }
      }
    })
  }
})