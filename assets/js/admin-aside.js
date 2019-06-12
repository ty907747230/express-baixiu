//给jquery注册一个入口函数，当页面请求回浏览器的时候就调用函数
$(function(){
    var menuPosts=$("#menu-posts");
    var menuSettings=$("#menu-settings");
    //定义路由名称
    var routername
    //获取请求的路径
    var index=location.href.indexOf("?")
    //如果没有参数
    if(index=="-1"){
        routername=location.href.substring(location.href.lastIndexOf("/")+1)
    }
    //如果有参数
    else{
        routername=location.href.substring(location.href.lastIndexOf("/")+1,index)
    }
    //console.log(routername);
    //根据路由名称判断点击的模块
    if(routername=="posts"||routername=="post-add"||routername=="categories"){
        menuPosts.addClass("in");
        menuPosts.attr("aria-expanded","true")
    }

    else if(routername=="nav-menus"||routername=="slides"||routername=="settings"){
        menuSettings.addClass("in");
        menuSettings.attr("aria-expanded","true")
    }
})