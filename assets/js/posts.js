$(function() {
  //设置每页的条数，和显示的页码
  var pagesize = 3;
  var pagenum = 1;
  //渲染模板,并使用展开运算符拼接属性，给默认值是为了防止报错
  function init(query={}) {
    $.ajax({
      type: "get",
      url: "/getPostsList",
      datatype: "json",
      data: {
        pagenum: pagenum,
        pagesize: pagesize,
        ...query
      },
      success: function(res) {
        //console.log(res);
        if (res && res.code == "200") {
          //setPage(Math.ceil(res.data.length/pagesize));
          var htmlStr = template("postsListTemp", res.data);
          $("tbody").html(htmlStr);
          //调用分页函数
          setPage(Math.ceil(res.data.total / pagesize));
        }
      }
    });
  }
  init();
  //创建动态分页结构
  function setPage(total) {
      //console.log(total);
    $(".pagination").bootstrapPaginator({
      //设置版本号
      bootstrapMajorVersion: 3,
      // 显示第几页
      currentPage: pagenum,
      // 总页数
      totalPages: total,
      //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
      onPageClicked: function(event, originalEvent, type, page) {
          pagenum=page,
        //点击传入当前页码渲染页面
        init();
      }
    });
  };

  //获取所有的分类列表
  (function(){
      $.ajax({
          datatype:"json",
          url:"/getAllCategories",
          type:"get",
          success:function(res){
              //所有分类不属于表中数据，单独做处理，option是提交id数据的
            var str=`<option value="all">所有分类</option>`;
            //由于需要渲染的数量很少，所以我们采用拼接字符串的方式渲染
            for(var i=0;i<res.data.length;i++){
                str+=`<option value="${res.data[i].id}">${res.data[i].name}</option>`
            }
            //渲染
            $(".cateSelector").html(str);
          }
      })
  })();

  //实现筛选功能
  $(".btnFilter").on("click",function(){
    var query={}
      var category_id = $(".cateSelector").val();
      var status=$(".statusSelector").val();
      //全部则不需要传值
      if(category_id!="all"){
        query['category_id']=category_id
      }
      if(status!="all"){
        query['status']=status
      }
      console.log(query)
      init(query);
  })
});
