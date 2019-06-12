//引入模块
var express = require("express");
var pagesController = require("./controllers/pagesController");
var userController = require("./controllers/usersController");
var cateController = require("./controllers/cateController");
var postsController = require("./controllers/postsController");
var uploadController=require("./controllers/uploadController")

//创建路由模块
var router = express.Router();

//挂载路由配置
router
  .get("/", pagesController.getIndexPage)
  .get("/detail", pagesController.getDetailPage)
  .get("/list", pagesController.getListPage)

  //响应后台管理页面
  .get("/admin", pagesController.getAdminIndexPage)
  .get("/admin/categories", pagesController.getCategoriesPage)
  .get("/admin/comments", pagesController.getCommentsPage)
  .get("/admin/login", pagesController.getLoginPage)
  .get("/admin/nav-menus", pagesController.getNavMenusPage)
  .get("/admin/password-reset", pagesController.getPasswordResetPage)
  .get("/admin/post-add", pagesController.getPostAddPage)
  .get("/admin/posts", pagesController.getPostsPage)
  .get("/admin/profile", pagesController.getProfilePage)
  .get("/admin/settings", pagesController.getSettingPage)
  .get("/admin/slides", pagesController.getSlidesPage)
  .get("/admin/users", pagesController.getUserPage)

  //登录处理模块
  .post("/login", userController.login)

  //分类模块
  .post("/addCategory", cateController.addCategory)
  .post("/editCategory", cateController.editCategory)
  .get("/getAllCategories", cateController.getAllCategories)
  .get("/delCateById", cateController.delCateById)
  .get("/delsCategories", cateController.delsCategories)

  //所有文章模块
  .get("/getPostsList", postsController.getPostsList)
  .get("/getAllCategories",postsController.getAllCategories)
  .get("/getPostById",postsController.getPostById)
  .post("/editPost",postsController.editPost)

  //上传文件
  .post("/uploadFile",uploadController.uploadFile)

  //写文章模块
  .post("/addPost",postsController.addPost)

//暴露模块
// exports.router = router;
// module.exports=exports;
module.exports = router;
