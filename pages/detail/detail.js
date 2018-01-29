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

  /**
   * 页面的初始数据
   */
  data: {
    checkInDate:0,
    checkInDays:0,
    roomList:[
      {id:1,name:"标准单人间",price:13,vipprice:12,info:"单人床/无窗/无早",num:2},
      {id:2, name: "大床双人间", price: 15, vipprice: 14, info: "大床/有窗/双早", num: 3 },
      { id: 1, name: "标准单人间", price: 13, vipprice: 12, info: "单人床/无窗/无早", num: 2 },
    ],
    tabArr: {
      curHdIndex: 0,
      curBdIndex: 0
    },
    isFold:true,
    currentDetailIndex:0
  },
// tab 选项卡
  tabFun: function (e) {
    //获取触发事件组件的dataset属性  
    var _datasetId = e.target.dataset.id;
    var _obj = {};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr: _obj
    });
  },

  // 展开
  foldFn: function (e) {
    //var _foldIndex = e.target.dataset.index;
    //console.info(_foldIndex)
    //currentDetailIndex = e.target.dataset.index;
    this.setData({
      currentDetailIndex: e.target.dataset.typeindex
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;  

    var dateInfo = JSON.parse(options.dateInfo);
    console.log(dateInfo)
    var differ = daysDiffer(dateInfo.inDate, dateInfo.outDate);
    that.setData({
      checkInDate: Moment(new Date(dateInfo.inDate)).format('MM-dd'),
      checkInDays: differ,
      currentDetailIndex:0
    }) ;
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