var usersModel = require("../modules/usersModule");

module.exports = {
  login(req, res) {
    //获取post传过来的数据
    var obj = req.body;
    usersModel.getUserByEmail(obj.email, (err, data) => {
      if (err)
        return res.json({
          code: "201",
          msg: "服务器异常"
        });

      //查询成功且有数据
      if (data) {
        //因为数据库是不区分大小写的，所以密码的判断需要放到js中实现
        if (data.password == obj.password) {
          // res.writeHead(200,{
          //     "Set-Cookie":"isLogin=true,is=fal"
          // })
          //设置session
          req.session.isLogin = "true";
        req.session.currentUser = data;
          //密码正确，需要做的下一步操作
          res.json({
            code: "200",
            msg: "登陆成功"
          });
          // res.end();
        } else {
          res.json({
            code: "201",
            msg: "密码错误"
          });
        }
      } else {
        res.json({
          code: "201",
          msg: "邮箱错误"
        });
      }
    });
  }
};
