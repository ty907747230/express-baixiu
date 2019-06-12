var postsModule = require("../modules/postsModule");
var moment = require("moment");
module.exports = {
  //获取所有文章模块列表
  getPostsList(req, res) {
    postsModule.getPostsList(req.query, function(err, results) {
      if (err)
        return res.json({
          code: "201",
          desc: "服务器异常"
        });
      //console.log(results);
      for (var i = 0; i < results.data.length; i++) {
        results.data[i].created = moment(results.data[i].created).format(
          "YYYY-MM-DD HH:mm:ss"
        );
      }
      return res.json({
        code: "200",
        desc: "获取成功",
        data: results
      });
    });
  },

  //获取分类下拉列表
  getAllCategories(req, res) {
    postsModule.getAllCategories((err, data) => {
      if (err)
        return res.json({
          code: "201",
          desc: "服务器异常"
        });
      return res.json({
        code: "200",
        desc: "获取成功",
        data: data
      });
    });
  },

  //添加文章
  addPost(req, res) {
    var obj = req.body;
    //移除ID
    obj.id=null;

    //将页面中没有值添加到对象中
    obj.views = 0;
    obj.likes = 0;
    //用户ID
    obj.user_id = req.session.currentUser.id;
    postsModule.addPost(obj, err => {
      //console.log(err);
      if (err)
        return res.json({
          code: "201",
          desc: "服务器异常"
        });
      res.json({
        code: "200",
        desc: "添加成功"
      });
    });
  },

  //通过id获取文章内容
  getPostById(req, res) {
    postsModule.getPostById(req.query.id, (err, results) => {
      if (err)
        return res.json({
          code: "201",
          desc: "服务器异常"
        });
      results.created = moment(results.created).format("YYYY-MM-DDTHH:mm");
      res.json({
        code: "200",
        desc: "获取成功",
        data: results
      });
    });
  },

  //修改文章
  editPost(req, res) {
    console.log(req.body);
    postsModule.editPost(req.body, err => {
      if (err)
        return res.json({
          code: "201",
          desc: "服务器异常"
        });

      res.json({
        code: "200",
        desc: "获取成功"
      });
    });
  }
};
