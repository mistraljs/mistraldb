const Mistral = require('../index.js');
//var db = new Mistral.Database('db1', 'c:/mistral/');
var db = new Mistral.Database('db1');
var posts = new Mistral.Collection(db, 'post');
posts.insert({content : 'hello'});
//posts.insert({content : 'hello1'});
////posts.watch(function(added){
////    console.log(added);
////});
//console.log(posts.count());
//posts.insert({content : 'hello2'});
//posts.insert({content : 'hello33'});
//console.log(posts.count());