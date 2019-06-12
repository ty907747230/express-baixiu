var formidable = require("formidable");
var path = require("path");
module.exports = {
  uploadFile(req, res) {
    var form = new formidable.IncomingForm();
    console.log(__dirname);
    form.encoding = "utf-8";
    form.uploadDir = path.join(__dirname, "../", "uploads");
    form.keepExtensions = true;
    // err:错误信息对象
    // fields:传递的普通键值对
    // files:文件上传成功之后的存储信息
    form.parse(req, function(err, fields, files) {
      console.log(files);
      if (err)
        return res.json({
          code: 201,
          desc: "上传失败"
        });
      res.json({
        code: 200,
        desc: "上传成功",
        //返回文件名
        data: path.basename(files.upload.path)
      });
    });
  }
};
