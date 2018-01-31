const app = getApp();
//远程请求
var __httpsRequest = {

  //http 请求
  https_request: function (obj) {
    wx.request(obj);
  }
};

module.exports = {
  //执行异步请求get
  httpsRequest: function (obj) {
    var jsonUrl = {};
    jsonUrl.url = obj.url;
    if (obj.header) jsonUrl.header = obj.header;
    if (obj.type)
      jsonUrl.method = obj.type;
    else
      jsonUrl.method = "GET";
    if (obj.data) jsonUrl.data = obj.data;
    obj.dataType ? (jsonUrl.dataType = obj.dataType) : (jsonUrl.dataType = "json");

    jsonUrl.success = obj.success;
    console.info(app)
    // jsonUrl.data.projectId = app.globalData.projectId;

    __httpsRequest.https_request(jsonUrl);
  },

  //get 请求
  httpsGetRequest: function (req_url, req_obj, res_func) {
    var jsonUrl = {
      url: app.globalData.host + req_url,
      header: { "Content-Type": "application/json" },
      dataType: "json",
      method: "get",
      success: function (res) {
        typeof res_func == "function" && res_func(res.data);
      }
    }

    if (req_obj) {
      jsonUrl.data = req_obj;
    }

    // jsonUrl.data.projectId = app.globalData.projectId;

    __httpsRequest.https_request(jsonUrl);
  },

  //post 请求
  httpsPostRequest: function (req_url, req_obj, res_func) {
    var jsonUrl = {
      url: app.globalData.host + req_url,
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      dataType: "json",
      method: "post",
      success: function (res) {
        typeof res_func == "function" && res_func(res.data);
      }
    }

    if (req_obj) {
      jsonUrl.data = req_obj;
    }

    // jsonUrl.data.projectId = app.globalData.projectId;

    __httpsRequest.https_request(jsonUrl);
  }
};