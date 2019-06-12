$(function() {
  $(".btn-primary").on("click", function() {
    //创建邮箱正则
    var regEmail = /\w+[@]+\w+[.]+\w/;
    //获取邮箱的值
    var emailVal = $("#email").val();
    //如果不符合格式要求需要提示
    if (!regEmail.test(emailVal)) {
      $(".alert-danger")
        .fadeIn(500)
        .delay(2000)
        .fadeOut(500);
      $(".alert-danger span").text("邮箱输入格式有误");
    } else {
      $.ajax({
        url: "/login",
        type: "post",
        datatype: "json",
        data: $(".login-wrap").serialize(),
        success: function(res) {
          console.log(1);
          // console.log(res);
          //location.href="/admin";
          //登录不成功，提示错误信息
          if (res.code == 200) {
            //转入主页面
            location.href = "/admin";
          } else {
            $(".alert-danger")
              .fadeIn(500)
              .delay(2000)
              .fadeOut(500);
            $(".alert-danger span").text(res.msg);
          }
        }
      });
    }
  });
});
