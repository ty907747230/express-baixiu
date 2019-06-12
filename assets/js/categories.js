$(function() {
  //封装分录目录渲染表格功能
  function init() {
    $.ajax({
      type: "get",
      datatype: "json",
      url: "/getAllCategories",
      success: res => {
        var html = template("cateListTemp", res);
        $("tbody").html(html);
      }
    });
  }

  //封装添加与修改
  function opt(url) {
    $.ajax({
      type: "post",
      url: url,
      data: $("form").serialize(),
      datatype: "json",
      success: res => {
        if (res.code == 200) {
          $(".alert-danger > span").text(res.desc);
          $(".alert-danger")
            .fadeIn(500)
            .delay(2000)
            .fadeOut(500);
          //重新请求分类表格的数据
          init();
        } else {
          $(".alert-danger > span").text(res.desc);
          $(".alert-danger")
            .fadeIn(500)
            .delay(2000)
            .fadeOut(500);
        }
      }
    });
  }

  //封装删除

  //渲染分类内容
  init();
  //添加按钮点击事件
  $(".btnAdd").on("click", function() {
    if ($(this).val() == "添加") {
      opt("/addCategory");
    } else {
      opt("/editCategory");
    }
  });

  //给tbody中的每个编辑按钮注册点击事件，通过委托实现
  $("tbody").on("click", ".btnedit", function() {
    //console.log($(this).data("name"));
    //把标签中属性的数据赋值给添加表单
    $("#name").val($(this).data("name"));
    $("#slug").val($(this).data("slug"));
    $("#id").val($(this).data("id"));
    $(".btnAdd").val("编辑");
  });

  //给tbody中的每个删除按钮注册点击事件，通过委托实现
  $("tbody").on("click", ".btndel", function() {
    //console.log($(this).data("name"));
    $.ajax({
      type: "get",
      url: "/delCateById",
      data: { data: $(this).data("id") },
      datatype: "json",
      success: function(result) {
        if (result.code == 200) {
          $(".alert-danger > span").text(result.msg);
          $(".alert-danger")
            .fadeIn(500)
            .delay(2000)
            .fadeOut(500);
          // 刷新
          init();
        } else {
          $(".alert-danger > span").text(result.msg);
          $(".alert-danger")
            .fadeIn(500)
            .delay(2000)
            .fadeOut(500);
        }
      }
    });
  });

  //全选按钮
  $(".chkAll").on("click", function() {
    //根据全选按钮的选定状态去更改每个子复选框的状态
    $("tbody .chkOne").prop("checked", $(this).prop("checked"));
    if ($(".chkOne:checked").length > 1) {
      $(".btndels").fadeIn(500);
    } else {
      $(".btndels").fadeOut(500);
    }
  });

  //单个复选框按钮
  $("tbody").on("click", ".chkOne", function() {
    //所有复选框
    var chks = $("tbody .chkOne");
    if ($(".chkOne:checked").length > 1) {
      $(".btndels").fadeIn(500);
    } else {
      $(".btndels").fadeOut(500);
    }
    if ($(".chkOne:checked").length == chks.length) {
      $(".chkAll").prop("checked", true);
    } else {
      $(".chkAll").prop("checked", false);
    }
  });

  //批量删除按钮
  $(".btndels").on("click", function() {
    //获取每个被选定按钮的id号
    var cek = $(".chkOne:checked");
    var arr = [];
    for (var i = 0; i < cek.length; i++) {
      // console.log(cek[i]);
      //将所有的id拼接成数组
      arr.push($(cek[i]).data("id"));
      $.ajax({
        type: "get",
        url: "/delsCategories",
        data: { data: arr },
        datatype: "json",
        success: function(result) {
          if (result.code == 200) {
            $(".alert-danger > span").text(result.desc);
            $(".alert-danger")
              .fadeIn(500)
              .delay(2000)
              .fadeOut(500);
            // 刷新
            init();
          } else {
            $(".alert-danger > span").text(result.desc);
            $(".alert-danger")
              .fadeIn(500)
              .delay(2000)
              .fadeOut(500);
          }
        }
      });
    }
  });
});
