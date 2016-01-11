const Mistral = require('../index.js');
var db = new Mistral.Database('db1', 'c:/mistral/');
var posts = new Mistral.Collection(db, 'post');
posts.insert({content : 'yoza'});
posts.insert({content : 'yora'});
posts.insert({content : 'yoga'});
posts.insert({content : 'hello33'});
