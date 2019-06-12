//页面控制器
var queryString = require("querystring");
//获取index页面
exports.getIndexPage = (req, res) => {
  res.render("index");
};
//获取detail页面
exports.getDetailPage = (req, res) => {
  res.render("detail");
};
//获取list页面
exports.getListPage = (req, res) => {
  res.render("list");
};

//获取后台index页面
exports.getAdminIndexPage = (req, res) => {
  //   var cook = queryString.parse(req.headers.cookie, ",", "=");
  //   console.log(cook);
  //通过cook验证是否是第一次登录
  //   if (cook.isLogin && cook.isLogin == "true") {
  //     res.render("admin/index");
  //   }
  //   else {
  //     // redirect:重定向：从一个路由跳转到另外一个路由
  //     res.redirect("/admin/login");
  //   }

  
  // console.log(req.session);
  // if(req.session&&req.session.isLogin=="true"){
  //   console.log(1);
  //     res.render("admin/index")
  // }
  // else{
  //   console.log(2);
  //     res.redirect("/admin/login")
  // }
  res.render("admin/index")
};

exports.getCategoriesPage = (req, res) => {
  res.render("admin/categories");
};

exports.getCommentsPage = (req, res) => {
  res.render("admin/comments");
};

exports.getLoginPage = (req, res) => {
  res.render("admin/login");
};

exports.getNavMenusPage = (req, res) => {
  res.render("admin/nav-menus");
};

exports.getPasswordResetPage = (req, res) => {
  res.render("admin/password-reset");
};

exports.getPostAddPage = (req, res) => {
  res.render("admin/post-add");
};

exports.getPostsPage = (req, res) => {
  res.render("admin/posts");
};

exports.getProfilePage = (req, res) => {
  res.render("admin/profile");
};

exports.getSettingPage = (req, res) => {
  res.render("admin/settings");
};

exports.getSlidesPage = (req, res) => {
  res.render("admin/slides");
};

exports.getUserPage = (req, res) => {
  res.render("admin/users");
};
