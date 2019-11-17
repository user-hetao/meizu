var express = require ("express" );
var app = express();
var bodyparser = require ("body-parser");
var myquery = require ('./mysql.js').myquery;
app.use(bodyparser.urlencoded({extended:true}));
app.all("*", function (req, res, next) {
    // 设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    // 跨域允许的请求方式 
    res.setHeader("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    next();
});
    app.post('/login1',function(req,res){
        var username=req.body.username;
        var password=req.body.password;
        var data1={
            message:'',
            code:1001
        }
        if(!username || !password){
            data1.message='账户名或密码不能为空',
            data1.code=1002;
            res.json(data1);
        }else{
        myquery('select * from student where Name = "'+username+'"',function(err,result,file){
            if(err){
                console.log(err);
            }else{
                console.log(result[0]);
            if(result.length>0){
                if(result[0].password===password){
                    data1.message="操作成功";
                    data1.code=1001;
                    data1.data=result;
                }else{
                    data1.message='密码错误';
                    data1.code=1002
                }
            }else{
                data1.message='账户名不存在';
                data1.code=1002
            }
            res.json(data1);
            }
        })
        }
    })
    app.post('/login',function(req,res){
        var username=req.body.username;
        var password=req.body.password;
        var repassword=req.body.repassword;
        var data1={
            message:'',
            code:1001,
            data:''
        }
        if(!username || !password){
            data1.message='账户名或密码不能为空';
            data1.code=1002;
            res.json(data1);
        }else if(password!==repassword){
            data1.message='两次输入的密码不一样请重新输入',
            data1.code=1002;
            res.json(data1);
        }else{
            myquery('select * from student where Name = "'+username+'"',function(err,result,file){
                if(result.length>0){
                    data1.message='账户名已存在';
                    data1,code=1002;
                    res.json(data1);
                }else{
                    myquery('insert into student (name,password) values ("'+username+'","'+password+'");',function(err,result,file){
                        if(err){
                            console.log(err);
                        }/* else if(username=){
                
                        } */
                        else{
                            data1.message='注册成功';
                            data1.code=1001;
                            res.json(data1);
                        }
                        })
                }
            })
        }
    })
    app.post("/user/page",function(req,res){
        var page=req.body.page;
        var rows=req.body.rows;
        var start =(page-1)*rows;
        var data={
            message:'数据查询成功',
            data:'',
            code:1001
        }
        var sql="select * from user limit ?,? "
        myquery(sql,[start,rows],function(err,result,file){
            var sql1='select count(*) count from user';
            myquery(sql1,function(e,result1,file1){
                data.message='数据查询成功';
                data.code=1001;
                data.data={
                    rows:result,
                    total:result1[0].count
                }
                res.json(data);
            })
        })
    })
    app.post('/user/add',function(res,req){
        var userName=req.body.userName;
        var sex=req.body.sex;
        var age=req.body.age;
        var mobile=req.body.mobile;
        var address=req.body.address;
        var account=req.body.account;
        var password=req.body.password;
        var remark=req.body.remark;
        var sql='insert into user (username,sex,age,mobile,address,account,password,remark ) value (?,?,?,?,?,?,?,?)';
        myquery(sql,[userName,sex,age,mobile,address,account,password,remark],function(err,result,file){
            data.message='新增成功';
            data.code=1001;
            data.data=result;
            res.json(data);
        })
    })
    app.post('/user/update',function(res,req){
        var userName=req.body.userName;
        var sex=req.body.sex;
        var age=req.body.age;
        var mobile=req.body.mobile;
        var address=req.body.address;
        var account=req.body.account;
        var password=req.body.password;
        var remark=req.body.remark;
        var id=req.body.id;
        var sql='update user set username=?,sex=?,age=?,mobile=?,address=?,account=?,password=?,remark=? where id=?';
        myquery(sql,[userName,sex,age,mobile,address,account,password,remark,id],function(err,result,file){
            data.message='修改成功';
            data.code=1001;
            data.data=result;
            res.json(data);
        })
    })
    app.post('/user/delete',function(res,req){
            var id=req.body.id;
            var sql='delete from user where id=?'
            myquery(sql,[id],function(err,result,file){
                data.message='';
                data.code=1001;
                data.data=result;
                res.json(data);
            })
    })
    app.post("/color/page",function(req,res){
        var page=req.body.page;
        var rows=req.body.rows;
        var start =(page-1)*rows;
        var data={
            message:'数据查询成功',
            data:'',
            code:1001
        }
        var sql="select * from user limit ?,? "
        myquery(sql,[start,rows],function(err,result,file){
            var sql1='select count(*) count from user';
            myquery(sql1,function(e,result1,file1){
                data.message='数据查询成功';
                data.code=1001;
                data.data={
                    rows:result,
                    total:result1[0].count
                }
                res.json(data);
            })
        })
    })
    app.post('/color/add',function(res,req){
        var colorName=req.body.userName;
        var colorValue=req.body.sex;
        var sql='insert into user (colorName,colorValue ) value (?,?)';
        myquery(sql,[colorName,colorValue],function(err,result,file){
            data.message='新增成功';
            data.code=1001;
            data.data=result;
            res.json(data);
        })
    })
    app.post('/color/update',function(res,req){
        var colorName=req.body.userName;
        var colorValue=req.body.sex;
        var id=req.body.id;
        var sql='update user set colorName=?,colorValue=? where id=?';
        myquery(sql,[colorName,colorValue,id],function(err,result,file){
            data.message='修改成功';
            data.code=1001;
            data.data=result;
            res.json(data);
        })
    })
    app.post('/color/delete',function(res,req){
            var id=req.body.id;
            var sql='delete from user where id=?'
            myquery(sql,[id],function(err,result,file){
                data.message='';
                data.code=1001;
                data.data=result;
                res.json(data);
            })
    })
    app.post("/goods/page",function(req,res){
        /* var userName=req.body.userName;
        var sex=req.body.sex;
        var age=req.body.age;
        var mobile=req.body.mobile;
        var address=req.body.address;
        var account=req.body.account;
        var password=req.body.password;
        var remark=req.body.remark; */
        var page=req.body.page;
        var rows=req.body.rows;
        var start =(page-1)*rows;
        var data={
            message:'数据查询成功',
            data:'',
            code:1001
        }
        var sql="select * from user limit ?,? "
        myquery(sql,[start,rows],function(err,result,file){
            var sql1='select count(*) count from user';
            myquery(sql1,function(e,result1,file1){
                data.message='数据查询成功';
                data.code=1001;
                data.data={
                    rows:result,
                    total:result1[0].count
                }
                res.json(data);
            })
        })
    })
    app.post('/goods/add',function(res,req){
        var name=req.body.name;
        var saleInfo=req.body.saleInfo;
        var price=req.body.price;
        var num=req.body.num;
        var isSale=req.body.isSale;
        var isNew=req.body.isNew;
        var type1=req.body.type;
        var sql='insert into user (name,saleInfo,price,num,isSale,isNew,type) value (?,?,?,?,?,?,?)';
        myquery(sql,[name,saleInfo,price,num,isSale,isNew,type1],function(err,result,file){
            data.message='新增成功';
            data.code=1001;
            data.data=result;
            res.json(data);
        })
    })
    app.post('/goods/update',function(res,req){
        var name=req.body.name;
        var saleInfo=req.body.saleInfo;
        var price=req.body.price;
        var num=req.body.num;
        var isSale=req.body.isSale;
        var isNew=req.body.isNew;
        var type=req.body.type;
        var id=req.body.id;
        var sql='update user set name=?,saleInfo=?,price=?,num=?,isSale=?,isNew=?,type=? where id=?';
        myquery(sql,[name,saleInfo,price,num,isSale,isNew,type,id],function(err,result,file){
            data.message='修改成功';
            data.code=1001;
            data.data=result;
            res.json(data);
        })
    })
    app.post('/goods/delete',function(res,req){
            var id=req.body.id;
            var sql='delete from user where id=?'
            myquery(sql,[id],function(err,result,file){
                data.message='';
                data.code=1001;
                data.data=result;
                res.json(data);
            })
    })
    app.post("/memory/page",function(req,res){
        var page=req.body.page;
        var rows=req.body.rows;
        var start =(page-1)*rows;
        var data={
            message:'数据查询成功',
            data:'',
            code:1001
        }
        var sql="select * from memory limit ?,? "
        myquery(sql,[start,rows],function(err,result,file){edftgrewtert
            console.log(err);
            var sql1='select count(*) count from user';  
            console.log(result);  
            myquery(sql1,function(e,result1,file1){
                data.message='数据查询成功';
                data.code=1001;
                data.data={
                    rows:result,
                    total:result1[0].count
                }
                res.json(data);
            })
        })
    })
    app.post('/memory/add',function(res,req){
        var name=req.body.name;
        var remark=req.body.remark;
        var sql='insert into user (name,remark ) value (?,?)';
        myquery(sql,[name,remark],function(err,result,file){
            data.message='新增成功';
            data.code=1001;
            data.data=result;
            res.json(data);
        })
    })
    app.post('/memory/update',function(res,req){
        var name=req.body.name;
        var remark=req.body.remark;
        var id=req.body.id;
        var sql='update user set name=?,remark=? where id=?';
        myquery(sql,[name,remark,id],function(err,result,file){
            data.message='修改成功';
            data.code=1001;
            data.data=result;
            res.json(data);
        })
    })
    app.post('/memory/delete',function(res,req){
            var id=req.body.id;
            var sql='delete from user where id=?'
            myquery(sql,[id],function(err,result,file){
                data.message='';
                data.code=1001;
                data.data=result;
                res.json(data);
            })
    })
    app.post("/image/page",function(req,res){
        /* var userName=req.body.userName;
        var sex=req.body.sex;
        var age=req.body.age;
        var mobile=req.body.mobile;
        var address=req.body.address;
        var account=req.body.account;
        var password=req.body.password;
        var remark=req.body.remark; */
        var page=req.body.page;
        var rows=req.body.rows;
        var start =(page-1)*rows;
        var data={
            message:'数据查询成功',
            data:'',
            code:1001
        }
        var sql="select * from user limit ?,? "
        myquery(sql,[start,rows],function(err,result,file){
            var sql1='select count(*) count from user';
            myquery(sql1,function(e,result1,file1){
                data.message='数据查询成功';
                data.code=1001;
                data.data={
                    rows:result,
                    total:result1[0].count
                }
                res.json(data);
            })
        })
    })
    app.post('/image/add',function(res,req){
        var name=req.body.name;
        var path=req.body.path;
        var imageType=req.body.imageType;
        var sql='insert into user (name,path,imageType) value (?,?,?)';
        myquery(sql,[name,path,imageType],function(err,result,file){
            data.message='新增成功';
            data.code=1001;
            data.data=result;
            res.json(data);
        })
    })
    app.post('/image/update',function(res,req){
        var name=req.body.name;
        var path=req.body.path;
        var imageType=req.body.imageType;
        var id=req.body.id;
        var sql='update user set name=?,path=?,imageType=? where id=?';
        myquery(sql,[name,path,imageType,id],function(err,result,file){
            data.message='修改成功';
            data.code=1001;
            data.data=result;
            res.json(data);
        })
    })
    app.post('/image/delete',function(res,req){
            var id=req.body.id;
            var sql='delete from user where id=?'
            myquery(sql,[id],function(err,result,file){
                data.message='';
                data.code=1001;
                data.data=result;
                res.json(data);
            })
    })
    app.post("/goodstype/page",function(req,res){
        /* var userName=req.body.userName;
        var sex=req.body.sex;
        var age=req.body.age;
        var mobile=req.body.mobile;
        var address=req.body.address;
        var account=req.body.account;
        var password=req.body.password;
        var remark=req.body.remark; */
        var page=req.body.page;
        var rows=req.body.rows;
        var start =(page-1)*rows;
        var data={
            message:'数据查询成功',
            data:'',
            code:1001
        }
        var sql="select * from user limit ?,? "
        myquery(sql,[start,rows],function(err,result,file){
            var sql1='select count(*) count from user';
            myquery(sql1,function(e,result1,file1){
                data.message='数据查询成功';
                data.code=1001;
                data.data={
                    rows:result,
                    total:result1[0].count
                }
                res.json(data);
            })
        })
    })
    app.post('/goodstype/add',function(res,req){
        var typeName=req.body.typeName;
        var remark=req.body.remark;
        var typeImg=req.body.typeImg;
        var sql='insert into user (typeName,remark,typeImg) value (?,?,?)';
        myquery(sql,[typeName,remark,typeImg],function(err,result,file){
            data.message='新增成功';
            data.code=1001;
            data.data=result;
            res.json(data);
        })
    })
    app.post('/goodstype/update',function(res,req){
        var typeName=req.body.typeName;
        var remark=req.body.remark;
        var typeImg=req.body.typeImg;
        var id=req.body.id;
        var sql='update user set typeName=?,remark=?,typeImg=? where id=?';
        myquery(sql,[typeName,remark,typeImg,id],function(err,result,file){
            data.message='修改成功';
            data.code=1001;
            data.data=result;
            res.json(data);
        })
    })
    app.post('/goodstype/delete',function(res,req){
            var id=req.body.id;
            var sql='delete from user where id=?'
            myquery(sql,[id],function(err,result,file){
                data.message='';
                data.code=1001;
                data.data=result;
                res.json(data);
            })
    })

var server = app.listen(8001, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
  })