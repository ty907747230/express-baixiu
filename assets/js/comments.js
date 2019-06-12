$(function(){
    //获取所有数据
    function init(){
        $.ajax({
            type:"get",
            url:"/getAllComments",
            datatype:"json",
            success:function(res){
                
            }
        })
    }
})