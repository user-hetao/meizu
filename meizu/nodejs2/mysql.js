var mysql = require('mysql');
var pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'test'
});
exports.myquery = function (sql,a,callback) {
    pool.getConnection(function (err,conn) {
        if(callback){
            conn.query(sql,a,function (err,result,file) {
                conn.release();
                callback(err,result,file);
              })
        }else{
            conn.query(sql,a,function (err,result,file) {
                conn.release();
                a(err,result,file);
              })
        }
      })
  }
