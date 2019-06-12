//引入模块
var express = require("express");
var router = require("./router.js");
var bodyParser = require("body-parser");
var session = require("express-session");

//创建服务器
var app = express();

//注册静态资源
app.use("/assets", express.static("assets"));
app.use("/uploads", express.static("uploads"));


//注册开启session
app.use(
  session({
    secret: "加一个只有你自己知道的加密字符串", // 建议使用 128 个字符的随机字符串
    resave: false, //强制未更改的session
    saveUninitialized: false //是否存储未初始化的session数据
  })
);

//要给每个页面都加一个需要在登录状态下才能访问的限制，如果每个页面都验证的话过于繁琐，我们考虑通过注册中间件的方式来让每个请求都通过此中间件来验证是否是处于登录状态
app.use((req,res,next)=>{
   //console.log(req.session);
  //验证session是否是登录状态,只能在登录状态访问后台管理页面
  if(req.session&&req.session.isLogin=="true"||req.url=="/admin/login"||req.url.indexOf("/admin")==-1){
    next();
  }else{
    res.redirect("/admin/login");
  }
})
//引入模板引擎
app.set("view engine", "ejs");

//指定渲染文件路径
app.set("views", __dirname + "/views");

//注册bodyparser中间件
app.use(bodyParser.urlencoded({ extended: false }));

//监听端口
app.listen(3000, "127.0.0.1", () => {
  console.log("serve http://127.0.0.1:3000 is running");
});



//注册路由
//console.log(router)
app.use(router);
