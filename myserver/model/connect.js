var mongodb = require("mongodb");
var Db = mongodb.Db;
var Server = require('mongodb').Server;
const url = 'mongodb://localhost:27017/';
var db = new Db('blog', new Server('localhost', 27017));

function connect(){
    return new Promise(function(resolve,reject){
        db.open().then(function( db) {
            resolve(db)
            // Get an additional db
            console.log("open MongoDB");
        }).catch(function(err){
            reject(err);
        });
    })
}

exports.connect = connect;