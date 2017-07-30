var express = require('express');
var router = express.Router();

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
});

router.post('/delete-article', function(req, res) {
  let myDB = db.collection("article");  
  myDB.remove({inquire:req.body.inquire})
    .then(function(result) {
    	let myCate = db.collection("category");
    	myCate.update({cateID:req.body.cateID},{$inc:{articleNum:-1}}).then(()=>{
    		res.json({      //返回json数据
            status: 0,
            message: "提交成功"
        	})
    	})
    })
    .catch(function(err){
      throw err;
    });
});


module.exports = router;