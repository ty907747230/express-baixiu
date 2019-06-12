//因为创建连接是每个模块都需要的，所以进行封装

var mysql=require("mysql");

//创建连接
var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"baixiu"
});

module.exports=conn;