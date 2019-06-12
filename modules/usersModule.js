var conn=require("./common")

module.exports={
    getUserByEmail(email,callback){
        var sqlStr="select * from users where email=?";
        conn.query(sqlStr,[email],(err,results)=>{
            //console.log(err);
            if(err) return callback(err);
            callback(null,results[0]);
        })
    }
}