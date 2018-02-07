// pages/order/order.js
var Moment = require("../../utils/Moment.js");
var DateUtils = require("../../utils/DateUtils.js");
var request = require("../../utils/Request.js");

Page({
  bookingInformation: null,
  avalibleRoomNumber: 1,
  totalFee: 0,
  userName: "",
  phoneNumber: "",
  currentCustomerNumber:1,
  customerNamesArray:null,
  data: {
    checkinDate: "",
    checkoutDate: "",
    checkInNights: 1,
    roomType: "",
    chargeType:"",
    avalibleRoomNumber: 1,
    totalFee: 0,
    name: '',
    tel: '',
    currentCustomerNumber: 1 ,
    leaveTime:'',
    payAmount:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bookingInformation = JSON.parse(options.bookingInformation);
    // console.log("bookingInformation :", this.bookingInformation);
    var differ = DateUtils.daysDiffer(this.bookingInformation.checkInOutDate.checkInDate, this.bookingInformation.checkInOutDate.checkOutDate);
    this.checkInNights = differ;
    this.customerNamesArray = ["","","","",""];
    
    this.setData({
      checkinDate: DateUtils.formatFuc(this.bookingInformation.checkInOutDate.checkInDate, 'MM-dd'),
      checkoutDate: DateUtils.formatFuc(this.bookingInformation.checkInOutDate.checkOutDate, 'MM-dd'),
      checkInNights: differ,
      roomType: this.bookingInformation.house_name,
      chargeType: this.bookingInformation.charge_type
    });
    this.getMemberInfo();
    this.updateTotalFee();
  },
  getMemberInfo:function(){
    let that = this;
    let url = "/member/info";
    let jsonData = {
      session:getApp().globalData.session_key
    }
    // console.log(that.bookingInformation);
    request.httpsGetRequest(url,jsonData,function(res){
      let data = res.data.info;
      if(res.errcode == 0){
        that.setData({
          leaveTime: parseInt(data.balance / that.bookingInformation.member_timekeeping_price),
          payAmount: that.bookingInformation.member_house_price * 100 * that.data.checkInNights
        })
      }else{
        console.log(res.errmsg)
      }
    })

  },
  updateTotalFee: function () {
    if (this.bookingInformation.charge_type == 0) {//分时房
      // this.totalFee = this.avalibleRoomNumber * (this.bookingInformation.cleaning_fee +
      //   this.bookingInformation.member_timekeeping_price) * 100;
    } else if (this.bookingInformation.charge_type == 1) {//天时房
      this.totalFee = this.avalibleRoomNumber * this.bookingInformation.member_house_price *100;
    } else {
      this.totalFee = 0;
    }
    this.totalFee *= this.checkInNights;
    this.setData({
      totalFee: this.totalFee
    });
  },
  addCustomerNumber: function () {
    if(this.currentCustomerNumber<5){
      this.currentCustomerNumber++;
      this.setData({
        currentCustomerNumber: this.currentCustomerNumber
      });
    }
  },
  delCustomerNumber: function () {
    if (this.currentCustomerNumber >1) {
      this.currentCustomerNumber--
      this.setData({
        currentCustomerNumber: this.currentCustomerNumber
      });
    }
  },
  bindUserName: function (e) {
    var customeindex = e.target.dataset.customerindex;
    this.customerNamesArray[customeindex] = e.detail.value;
  },
  bindPhoneNumber: function (e) {
    this.phoneNumber = e.detail.value;
  },
  /* 点击减号 */
  bindMinus: function () {
    ///console.log("bindMinus", this.avalibleRoomNumber);
    if (this.avalibleRoomNumber > 1) {
      this.avalibleRoomNumber--;
      this.setData({
        avalibleRoomNumber: this.avalibleRoomNumber
      });
      this.updateTotalFee();
    }
  },
  /* 点击+号 */
  bindPlus: function () {
    //console.log("bindPlus", this.avalibleRoomNumber);
    if (this.avalibleRoomNumber < this.bookingInformation.residue_house_quantity) {
      this.avalibleRoomNumber++;
      this.setData({
        avalibleRoomNumber: this.avalibleRoomNumber
      });
      this.updateTotalFee();
    }
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    if (isNaN(num) || num < 1 || num > this.bookingInformation.residue_house_quantity) {
      num = 1;
    }
    if (this.avalibleRoomNumber != num) {
      this.avalibleRoomNumber = parseInt(num);
      this.setData({
        avalibleRoomNumber: this.avalibleRoomNumber
      });
    }
  },

  submitOrder: function (e) {
    var warn = "";//弹框时提示的内容  
    var flag = true;//判断信息输入是否完整 
    var that = this;
    //判断的顺序依次是：姓名-手机号
    //console.info(e)
    if (e.detail.value.name == "") {
      warn = "请填写您的姓名！";
    } else if (e.detail.value.tel == "") {
      warn = "请填写您的手机号！";
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.tel))) {
      warn = "手机号格式不正确";
    } else {
      flag = false;//若必要信息都填写，则不用弹框，且页面可以进行跳转  
      var people_details = [];
      for (var i = 0; i < that.currentCustomerNumber; i++) {
        var pName = that.customerNamesArray[i];
        var people_detail = {
          name: that.customerNamesArray[i],
          cardid: "",
          mobile: that.phoneNumber
        }
        people_details.push(people_detail);
      }
      var room = [{
        house_id: that.bookingInformation.id
      }]
      var orderInfo = {
        stay_begintime: DateUtils.formatFuc(that.bookingInformation.checkInOutDate.checkInDate, 'yyyy-MM-dd'),
        stay_endtime: DateUtils.formatFuc(that.bookingInformation.checkInOutDate.checkOutDate, 'yyyy-MM-dd'),
        pay_type: that.bookingInformation.charge_type,
        people_detail: people_details,
        room_detail: room,
        session: getApp().globalData.session_key
      }
      wx.request({
        url: getApp().globalData.host + '/order/add',
        data: orderInfo,
        method: 'POST',
        success: function (res) {
          console.log(res);  
          if (res.data.errcode == 0) {
            wx.requestPayment({
              'timeStamp': res.data.data.pay_config.timeStamp,
              'nonceStr': res.data.data.pay_config.nonceStr,
              'package': res.data.data.pay_config.package,
              'signType': res.data.data.pay_config.signType,
              'paySign': res.data.data.pay_config.paySign,
              'success': function (res) {
                console.log(res.errMsg)
                wx.navigateTo({
                  url: '../confirm/confirm',
                })
              },
              'fail': function (res) {
                console.log(res.errMsg)
              }
            })
          } 
          else {
            wx.showToast({
              title: res.data.errmsg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      });

      //？后面跟的是需要传递到下一个页面的参数  
      // wx.navigateTo({
      //   url: '../confirm/confirm?name=' + e.detail.value.area + '&tel=' + e.detail.value.tel
      // })
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
    }
    //如果信息填写不完整，弹出输入框  
    if (flag == true) {
      wx.showToast({
        title: warn,
        icon: 'none',
        duration: 1500
      })
    }



  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})