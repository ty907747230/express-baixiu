//获取url地址栏的参数

var itcast = {
  //str location.search内容
  getParament(str) {
    var obj = {};
    //去除?
    var str = str.substring(1);
    var arr = str.split("&");
    for (var i = 0; i < arr.length; i++) {
      var temp = arr[i].split("=");
      obj[temp[0]] = temp[1];
    }
    return obj;
  }
};
