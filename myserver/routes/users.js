var express = require('express');
var router = express.Router();
var formidable = require('formidable'),
    fs = require('fs'),
    TITLE = 'formidable上传示例',
    AVATAR_UPLOAD_FOLDER = '/images/',
    domain = "http://localhost:3000";

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/img',function(req,res){
  res.header("Access-Control-Allow-Origin", "*");
  var form = new formidable.IncomingForm();
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'dist' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req,function(err,fields,files){
    if (err) {
      throw err;
      return;
    }
    console.log(files);

    var extName = '';  //后缀名
    switch (files.myImg.type) {
      case 'image/pjpeg':
        extName = 'jpg';
        break;
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
      case 'image/x-png':
        extName = 'png';
        break;
    }

     if(extName.length == 0){
      res.locals.error = '只支持png和jpg格式图片';
      res.render('index', { title: TITLE });
      return;
    }

    var avatarName = Math.random() + '.' + extName;
    //图片写入地址；
    var newPath = form.uploadDir + avatarName;
    //显示地址；
    var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
    console.log("newPath",newPath);
    fs.renameSync(files.myImg.path, newPath);  
    res.json({
      "newPath":showUrl
    });
  })
})

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
} 

function getInquire(){
  return Math.random().toString(16).substring(3, 15);
}

router.post("/sub-article",function(req,res){ 
    var message = req.body;
    var newTime = getNowFormatDate();
    var inquireID = getInquire();
    var messageColletion =  db.collection("article");
    messageColletion.insertOne({    //数据库插入数据
        title:message.title,
        time:newTime,
        cateID:message.cateID,
        description:message.description,
        content:message.content,
        inquire:inquireID,
    })
        .then(function(){
            res.json({      //返回json数据
                status: 0,
                message: "提交成功"
            })
        })
        .catch(function(err){
            throw err;
        })
})

router.post("/add-category",function(req,res){ 
    var that = this;
    var myDB =  db.collection("category");
    var message = req.body;
    var newTime = getNowFormatDate();
    var cateID = 1;
    myDB.insertOne({    //数据库插入数据
        cateName:message.cateName,
        time:newTime,
        cateID:cateID,
        articleNum:0,
    })
        .then(function(){
            res.json({      //返回json数据
                status: 0,
                message: "提交成功"
            })
        })
        .catch(function(err){
            throw err;
        })
})

/*
router.post("/addCategory",function(req,res){ 
    var myDB =  db.collection("category");
    var message = req.body;
    var cateID;  
    //需要从数据库获得最大的cateID字段值
    // 获取最大cateID操作
    //…………
    //获取到最大cateID后
    myDB.insertOne({  
        cateName:message.cateName,
        cateID:cateID,
        articleNum:0,
    })
        .then(function(){
            res.json({  
                status: 0,
                message: "提交成功"
            })
        })
        .catch(function(err){
            throw err;
        })
})
*/


router.get("/get-categoryMes",function(req,res){ 
    var myDB =  db.collection("category");
    myDB.find().sort({'cateID':1}).toArray()
    .then(function(result) {
      res.send(result); 
    })
    .catch(function(err){
      throw err;
    });
});

router.post('/delete-cate', function(req, res) {
  let myDB = db.collection("category");  
  myDB.remove(req.body)
    .then(function(result) {
      res.json({      //返回json数据
            status: 0,
            message: "提交成功"
        })
    })
    .catch(function(err){
      throw err;
    });
});


router.get('/get-article', function(req, res) {
  let myDB = db.collection("article");	
  myDB.find().sort({'_id':-1}).toArray()
    .then(function(result) {
      for(let item in result){
        delete result[item].content;
      }
      res.send(result);	
    })
    .catch(function(err){
      throw err;
    });
});


router.get('/get-content', function(req, res) {
  let myDB = db.collection("article");  
  console.log(req.query);
  myDB.find(req.query).toArray()
    .then(function(result) {
      res.send(result); 
    })
    .catch(function(err){
      throw err;
    });
});


module.exports = router;
