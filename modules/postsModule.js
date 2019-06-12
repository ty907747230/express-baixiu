var conn = require("./common");

module.exports = {
    //获取文章列表
  getPostsList(query, callback) {
    //console.log(query);

      //为了让后面的条件语句都统一，加入where 1=1,这样后面的语句就可以都使用and了,而且sql语句记得加空格，防止报错
    var sqlStr = `SELECT p.id,p.created,p.title,u.nickname,c.name,CASE p.status WHEN 'published' THEN '已发布' when 'drafted' THEN '未发布'  ELSE '' END AS status from posts p join users u on p.user_id=u.id LEFT JOIN categories c on p.category_id=c.id where 1=1`;
    //拼接筛选条件
    if(query.category_id){
        sqlStr+=` and p.category_id=${query.category_id}`
    } 
    if(query.status){
        sqlStr+=` and p.status='${query.status}'`
    }
    sqlStr+=` order by p.id limit ${(query.pagenum -
      1 )* query.pagesize},${query.pagesize}`;
    //  console.log(sqlStr);
    conn.query(sqlStr, function(err, results) {
      //console.log(err);
      if (err) return callback(err);

      //因为我们需要根据总 条数进行分页，所以我们还需要拿到表中的所有数据,并将总数据条数和查到的数据信息返回
      // else{
        //此逻辑存在bug，应该查找的是满足条件的总数而不是posts页面的总数
        var sqlStr1 = "select count(*) total from posts where 1=1 ";
        // console.log(query)
        if(query.category_id){
          sqlStr1+=` and posts.category_id=${query.category_id}`
        } 

        if(query.status){
          sqlStr1+=` and posts.status='${query.status}'`
        }
       //console.log(sqlStr1)
        conn.query(sqlStr1, function(err1, results1) {
          if(err1) return callback(err1);
          //console.log(results);
          return callback(null, {data:results,total:results1[0].total});
        });
      // }
    });
  },

  //获取分类列表
  getAllCategories(callback){
    var sqlStr="select * from categories";
    conn.query(sqlStr,(err,data)=>{
        if(err) return callback(err);
        return callback(null,data)
    })
  },

  //添加文章
  addPost(obj,callback){
    //console.log(obj);
    var sqlStr="insert into posts set ?"
    conn.query(sqlStr,[obj],(err,results)=>{
      //console.log(err);
      if(err)return callback(err);
      return callback(null,results);
    })
  },

  //查询文章根据id
  getPostById(id,callback){
    var sql="select * from posts where id = ?"
    conn.query(sql,[id],(err,results)=>{
      console.log(results[0]);
      if(err) return callback(err);
      callback(null,results[0])
    })
  },

  //修改文章
  editPost(obj,callback){
    var sql="update posts set ? where id=?"
    conn.query(sql,[obj,obj.id],(err,results)=>{
      if(err) return callback(err);
      return callback(null,results);
    })
  }
};
