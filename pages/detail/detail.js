// pages/detail/detail.js
var Moment = require("../../utils/Moment.js");

var daysDiffer = function (indate,outdate) {
  if (typeof indate === 'string' && typeof outdate === 'string' ){
    indate = new Date(indate);
    outdate = new Date(outdate);
  }else{
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
  roomInformation:[],
  roomRegisterDateInfo: null,
  currentTabIndex:0,
  currentDetailIndex: 0,
  /**
   * 页面的初始数据
   */
  data: {
    checkInDate:0,
    checkInDays:0,
    roomInformation: null,
    isFold:true,
    //currentDetailIndex:0,    
  },
// tab 选项卡
  tabFun: function (e) {
    //获取触发事件组件的dataset属性  
    this.currentTabIndex = e.target.dataset.id;
    this.listCurrentRoom();
    this.setData({
      currentTabIndex: e.target.dataset.id
    });
  },

  // 展开
  foldFn: function (e) {
    this.currentDetailIndex = e.target.dataset.typeindex;
    this.setData({
      currentDetailIndex: this.currentDetailIndex,
    });
  },
  //预定指定房型的房间
  bookingRoom: function (e) {
    if (e.target.dataset.hasOwnProperty("typeindex")){
      var roomTypeIndex = e.target.dataset.typeindex;
      ///console.log(roomTypeIndex);
      var bookingInformation = this.roomInformation[roomTypeIndex];
      bookingInformation.roomBookingDateInfo = this.roomRegisterDateInfo;
      wx.navigateTo({
        url: '../order/order?bookingInformation=' + JSON.stringify(bookingInformation),
  });
      //console.log(bookingInformation);
    }
    //console.log("bookingRoom");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.roomRegisterDateInfo = JSON.parse(options.dateInfo);
    var differ = daysDiffer(this.roomRegisterDateInfo.inDate,                this.roomRegisterDateInfo.outDate);
    that.setData({
      checkInDate: Moment(new Date(this.roomRegisterDateInfo.inDate)).format('MM-dd'),
      checkInDays: differ,
      currentDetailIndex: that.currentDetailIndex,
      currentTabIndex: that.currentTabIndex
    }) ;
    this.listCurrentRoom();    
  },

  listCurrentRoom: function(){
    var that = this;
    wx.request({
      url: getApp().globalData.host + '/room',
      data: { session: getApp().globalData.session_key },
      method: 'GET',
      success: function (result) {
        console.log(result);
        that.roomInformation = [];
        var rooms = result.data.data.rooms;
        var house_type = result.data.data.house_type;
        for (var index in rooms) {
          var charge_type = rooms[index].charge_type;
          if (charge_type == that.currentTabIndex) {
            that.roomInformation.push(rooms[index]);
          } else {
            console.log(charge_type, that.currentTabIndex);
          }
        }
        //console.log(that.roomInformation);
        for (var index in that.roomInformation) {
          var roomType = that.roomInformation[index].house_type_id;
          ///console.log(roomType);
          that.roomInformation[index].roomType = house_type[roomType];
        }

        that.setData({
          roomInformation: that.roomInformation
        });
        console.log(that.roomInformation);
      }
    });
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