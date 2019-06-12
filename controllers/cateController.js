var cateModule=require("../modules/cateModule")

module.exports={
    //获取所有分类目录
    getAllCategories(req,res){
        cateModule.getAllCategories((err,results)=>{
            if(err) return res.json({
                code:"201",
                desc:"服务器异常"
            })
            res.json({
                code:"200",
                data:results,
                desc:"获取成功"
            })
        })
    },

    //添加目录
    addCategory(req,res){
        cateModule.addCategory(req.body,(err,results)=>{
            if(err) return res.json({
                code:"201",
                desc:"服务器异常"
            })
            res.json({
                code:"200",              
                desc:"添加成功"
            })
        })
    },

    //修改目录
    editCategory(req,res){
        cateModule.editCategory(req.body,(err,results)=>{
            if(err) return res.json({
                code:"201",
                desc:"服务器异常"
            })
            res.json({
                code:"200",              
                desc:"修改成功"
            })
        })
    },

    //删除目录
    delCateById(req,res){
     //console.log(req.query);
        cateModule.delCateById(req.query,(err)=>{
            if(err) return res.json({
                code:"201",
                desc:"服务器异常"
            })
            res.json({
                code:"200",              
                desc:"删除成功"
            })
        })
    },

    //批量删除目录
    delsCategories(req,res){
        cateModule.delsCategories(req.query,(err)=>{
            if(err) return res.json({
                code:"201",
                desc:"服务器异常"
            })
            res.json({
                code:"200",              
                desc:"批量删除成功"
            })
        })
    }
}