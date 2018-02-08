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
    console.log(JSON.parse(options._orderInfo));
    var that = this;
    //预定房间信息确认
    if (options._orderInfo){
      let orderInfo = JSON.parse(options._orderInfo);
      let date1 = moment(new Date(orderInfo.stay_begintime)); //开始时间
      let date2 = moment(new Date(orderInfo.stay_endtime));//结束时间
      let differDays = date2.diff(date1, 'days');
      that.setData({
        orderPrice: orderInfo.order_price/100,
        totalnight: differDays,
        checkinDate: moment(orderInfo.stay_begintime).format('YYYY-MM-DD'),
        checkoutDate: moment(orderInfo.stay_endtime).format('YYYY-MM-DD'),
        userInfo: {
          name: orderInfo.people_detail[0].name,
          tel: orderInfo.people_detail[0].mobile
        },
        orderId: orderInfo.id
      })
    }
    //未支付订单信息  
    if (options.id){
      var jsonData = {
        id: options.id,
        session: getApp().globalData.session_key
      };
      var url = "/order";
      request.httpsGetRequest(url, jsonData, function (res) {
        if (res.errcode == 0) {
          let orderInfos = res.data.orders[0];
          let date1 = moment(new Date(orderInfos.stay_begintime)); //开始时间
          let date2 = moment(new Date(orderInfos.stay_endtime));//结束时间
          let differDays = date2.diff(date1, 'days');
          console.log("differDays", differDays)
          that.setData({
            orderPrice: orderInfos.order_price/100,
            totalnight: differDays,
            checkinDate: moment(orderInfos.stay_begintime).format('YYYY-MM-DD'),
            checkoutDate: moment(orderInfos.stay_endtime).format('YYYY-MM-DD'),
            userInfo: {
              name: orderInfos.people_detail[0].name,
              tel: orderInfos.people_detail[0].mobile
            },
            orderId: orderInfos.id
          })
        } else {
          wx.showToast({
            title: res.errmsg,
            icon: 'none',
            duration: 1500
          })
        }
      })
    }
  },
  cancel:function () {
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
            session: getApp().globalData.session_key
          };
          request.httpsPostRequest(url, jsonData, function (res) {
            // console.log(res)
            if (res.errcode == 0) {
              wx.showToast({
                title: '取消成功',
                icon: 'none',
                duration: 1500
              });
              wx.navigateTo({
                url: '../allorders/allorders?tab=2',
              });
            } else {
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
  
  }
})