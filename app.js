App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var that = this;
    // 调用登录接口，获取 code
    wx.login({
      success: function (loginCode) {
        //判断用户是否授权读取用户信息 start
        wx.getSetting({
          success(setRes) {
            if (!setRes.authSetting['scope.userInfo']) {
              // 授权访问 start
              wx.authorize({
                scope: 'scope.userInfo',
                success() {
                  //获取用户信息  
                  that._getUserInfo(loginCode.code)
                }
              })
              // 授权访问 end
            }
            else {
              //获取用户信息  
              that._getUserInfo(loginCode.code)
            }
          }
        })
        // 判断用户是否授权读取用户信息 end
      },
      fail: function () {
        console.log('登录时网络错误')
      }
    })

  },
  _getUserInfo: function (loginCode) {
    console.log("loginCode:", loginCode)
    var that = this;
    wx.getUserInfo({
      lang: "zh_CN",
      success: function (userRes) {
        that.globalData.g_userInfo = userRes.userInfo;
        //发起网络请求
        wx.request({
          url: that.globalData.host + '/member/miniapp-login',
          data: { code: loginCode },
          method: 'GET',
          success: function (loginResult) {
            var data = loginResult.data.data;
            if(loginResult.data.errcode == 0){
              that.globalData.session_key = data.session;
              that.globalData.g_remain_min_minutes = data.remain_min_minutes;
              that.globalData.g_remain_max_minutes = data.remain_max_minutes;
              that.globalData.g_sum_money = data.sum_money;
            }
            else{
              console.log(loginResult.data.errMsg);
            }
          }
        });
      }
    })
  },
  //获取用户信息
  // _getUserInfo: function (cb) {
  //   var that = this
  //   if (this.globalData.g_userInfo) {
  //     typeof cb == "function" && cb(this.globalData.g_userInfo)
  //   } else {
  //     wx.getUserInfo({
  //       success: function (res) {
  //         console.log('用户信息', res.userInfo)
  //         that.globalData.g_userInfo = res.userInfo
  //         typeof cb == "function" && cb(that.globalData.g_userInfo)
  //       }
  //     })
  //   }
  // },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },
  globalData: {
    g_userInfo: null,
    session_key: "",
    g_remain_time: '',
    g_remain_min_minutes: '',
    g_remain_max_minutes: '',
    g_sum_money: '',
    host: "https://hotel.chengxu-tec.com/api"
  }
})
