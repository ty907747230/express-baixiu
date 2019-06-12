var conn=require("./common")

module.exports={
    getAllCategories(callback){
        var sqlStr="select * from categories"
        conn.query(sqlStr,(err,results)=>{
            if(err) return callback(err);
            callback(null,results);
        })
    },
    addCategory(obj,callback){
        var sqlStr="insert into categories values (null,?,?)";
        conn.query(sqlStr,[obj.slug,obj.name],(err,results)=>{
            console.log(err);
            if(err) return callback(err);
            callback(null);
        })
    },
    editCategory(obj,callback){
        var sqlStr="update categories set ? where id=?";
        conn.query(sqlStr,[obj,obj.id],(err,results)=>{
            if(err) return callback(err);
            callback(null);
        })
    },
    delCateById(obj,callback){
        var sqlStr="delete from categories where id=?";
        conn.query(sqlStr,[obj.data],(err)=>{
            if(err)return callback(err);
            callback(null);
        })
    },
    delsCategories(obj,callback){
        var sqlStr=`delete from categories where id in (${obj.data})`;
        conn.query(sqlStr,(err)=>{
           console.log(err);
            if(err)return callback(err);
            callback(null);
        })
    }
}