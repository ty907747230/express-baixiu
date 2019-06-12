$(function() {
  //获取分类列表
  (function() {
    $.ajax({
      datatype: "json",
      url: "/getAllCategories",
      type: "get",
      success: function(res) {
        //所有分类不属于表中数据，单独做处理，option是提交id数据的
        var str = "";
        //由于需要渲染的数量很少，所以我们采用拼接字符串的方式渲染
        for (var i = 0; i < res.data.length; i++) {
          str += `<option value="${res.data[i].id}">${
            res.data[i].name
          }</option>`;
        }
        //渲染
        $(".cateSelector").html(str);
      }
    });
  })();

  //上传传文件
  $("#feature").on("change", function() {
    var formdata = new FormData();
    //console.log(this.files[0]);
    //收集图片
    formdata.append("upload", this.files[0]);
    $.ajax({
      url: "/uploadFile",
      type: "post",
      data: formdata,
      datatype: "json",
      processData: false,
      contentType: false,
      success: function(res) {
        if (res.code == 200) {
          $(".thumbnail")
            .attr("src", "/uploads/" + res.data)
            .fadeIn(200);
          //将图片的路径传回，方便与表单的数据收集
          $(".feature").val("/uploads/" + res.data);
        }
      }
    });
  });

  //因为编辑和保存按钮都是一样的数据请求，所以进行封装
  function opt(url) {
    //数据同步,这样就不用再获取替换之后文本框的值了,不是实时的，所以在点击时添加
    CKEDITOR.instances.content.updateElement();
    $.ajax({
      type: "post",
      url: url,
      data: $(".row").serialize(),
      datatype: "json",
      success: function(res) {
        if (res.code == 200) {
          //提示
          $(".alert-danger")
            .fadeIn(200)
            .delay(2000)
            .fadeOut(200);
          $(".alert-danger span").text(res.desc);
          //设置定时器当提示完之后成功跳转
          setTimeout(() => {
            location.href = "/admin/posts";
          }, 2500);
        } else {
          //提示
          $(".alert-danger")
            .fadeIn(200)
            .delay(2000)
            .fadeOut(200);
          $(".alert-danger span").text(res.desc);
        }
      }
    });
  }

  //保存按钮与修改
  $(".btnOpt").on("click", function() {
    if(id){
        //修改
        opt("/editPost")
    }
    else{
        //保存
        opt("/addPost");
    }
  });

  //使用富文本框
  CKEDITOR.replace("content");

  //修改请求渲染参数
  var id = itcast.getParament(location.search).id;
  if(id){
      //根据id查询出对应的文章详细数据
      $.ajax({
        type:'get',
        url:'/getPostById',
        data:{id},
        dataType:'json',
        success:function(result){
            console.log(result);
            var data = result.data
            $("#id").val(data.id)
            $("#title").val(data.title)
            $("#content").val(data.content)
            $("#slug").val(data.slug)
            $('.thumbnail').attr('src',data.feature).show()
            // 存储图片的隐藏域
            $('.featureimg').val(data.feature)
            $('#category').val(data.category_id)
            $('#status').val(data.status)
            // 发布时间,注意前台页面中所需要的日期格式为：yyyy-MM-ddThh:mm
            $('#created').val(data.created)
            // 修改页面展示
            $('.page-title > h1').text('编辑文章')
            $('.btnOpt').val('编辑')
        }
    })
  }
});
