var formatFuc = function (date, format) {
  //console.log("formatFuc",date,format);
  if (typeof date === 'string')
    date = new Date(date);
  var dataStruct = {
    "M+": date.getMonth() + 1, //月份 
    "(d+|D+)": date.getDate(), //日 
    "(h+|H+)": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  var week = {
    "0": "周日",
    "1": "周一",
    "2": "周二",
    "3": "周三",
    "4": "周四",
    "5": "周五",
    "6": "周六"
  };

  if (/(y+|Y+)/.test(format))
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  if (/(E+)/.test(format))
    format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
  for (var k in dataStruct) {
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (dataStruct[k]) : (("00" + dataStruct[k]).substr(("" + dataStruct[k]).length)));
  }
  return format;
}

var daysDiffer = function (beforeDate, afterDate) {
  if (typeof beforeDate === 'string') {
    beforeDate = new Date(beforeDate);
  }
  if (typeof afterDate === 'string') {
    afterDate = new Date(afterDate);
  }
  var time1 = beforeDate.getTime();
  var time2 = afterDate.getTime();
  var differ = Math.ceil((time2 - time1) / (1000 * 3600 * 24));
  return differ;
}

var parseFuc = function (date) {
  if (typeof date === 'string')
    date = new Date(date);
  return date;
}

var differFuc = function (date1,data2) {  
  if (typeof date1 === 'string')
    date1 = new Date(date1);
  if (typeof data2 === 'string')
    data2 = new Date(data2);
  var time1 = date1.getTime();
  var time2 = date2.getTime();
  var differ = Math.ceil((time1 - time2) / (1000 * 3600 * 24));
  return differ;
}

var addFuc = function (date,num, optionType) {
  if (typeof date === 'string')
    date = new Date(date);
  if ('day' === optionType) {
    date.setDate(date.getDate() + num);
  }
  if ('month' === optionType) {
    date.setMonth(date.getMonth() + num);
  }
  if ('year' === optionType) {
    date.setFullYear(date.getFullYear() + num);
  }
  return date;
}

var isBefore = function (date1,data2) {
  return date1.getTime() < data2.getTime()
}

var isAfter = function (date1, data2) {
  return date1.getTime() > data2.getTime()
}
var isBeforeNow = function (date) {
  return date.getTime() < new Date(date).getTime()
}

var isAfterNow = function (date) {
  return date.getTime() > new Date(date).getTime()
}

module.exports = {
  formatFuc: formatFuc,
  differFuc: differFuc,
  addFuc: addFuc,
  isBefore: isBefore,
  isAfter: isAfter,
  isBeforeNow: isBeforeNow,
  isAfterNow: isAfterNow,
  daysDiffer: daysDiffer
}