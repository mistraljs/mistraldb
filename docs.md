# Documentation

# Installation
`npm install --save mistraldb`

# Getting Started
```
const Mistral = require('mistraldb');
```

# Database and Collection
```
var db = new Mistral.Database('db1');
var posts = new Mistral.Collection(db, 'post');
```
We can also add multiple database. For this example may be posts have country id which are owned by masterdb. So we can map it in the next.
```
var masterdb = new Mistral.Database('masterdb');
var servantdb = new Mistral.Database('servantdb');
var countries = new Mistral.Collection(masterdb, 'country');
var posts = new Mistral.Collection(servantdb, 'post');
```

## insert(data)
```
var postId = posts.insert({
    content: 'helo all',
    type: 1
});
console.log(postId); //bEYikyBwFO4BjvLqv5r626lhYHV
```

## update(where, data)
```
posts.update({
    id: 'bEYikyBwFO4BjvLqv5r626lhYHV'
}, {
    content: 'hello cool'
});
```

## find(where)
```
find = posts.find(); //return all posts data in array
find = posts.find({
    id: 'bEYikyBwFO4BjvLqv5r626lhYHV'
}); // return post with id bEYikyBwFO4BjvLqv5r626lhYHV
```

## findOne(where)
```
find = posts.findOne(); //return first post in collection
find = posts.findOne({
    id: 'bEYikyBwFO4BjvLqv5r626lhYHV'
}); // return first post with id bEYikyBwFO4BjvLqv5r626lhYHV
```

## remove(where)
```
posts.remove({
    id: 'bEYikyBwFO4BjvLqv5r626lhYHV'
});
```

## first()
return first record in collection.
```
posts.first();
```

## last()
return last record in collection.
```
posts.last();
```

## take(amount)
return 5 records.
```
posts.take(5);
```
## without()
return records without record with id: 'bEYikyBwFO4BjvLqv5r626lhYHV'.
```
posts.without({id: 'bEYikyBwFO4BjvLqv5r626lhYHV'});
```
## at(position)
return record at position.
```
var p = posts.at(5);
```
## map(param)
return all createdBy in array.
```
var creatorIds = posts.map(function(p) { return p.createdBy });
```
## count()
return size of collection.
```
var p = posts.count();
```
## shuffle()
```
var p = posts.shuffle();
```
## sortBy(param)
return records sorted by createdAt.
```
var p = posts.sortBy('createdAt');
```
## pluck(param)
return record's field `content` in array.
```
var p = posts.pluck('content');
```
## where(source)
return records where `isPublished : false`.
```
var p = posts.where({isPublished : false});
```
## watch(callback(added)) **beta**
Detect change on collection but for now only while server is running.
```
posts.watch(function(added){
    console.log(added);
});
```

# Random
Random function to generate unique
```
const Random = require('mistraldb').Random;
```
## Random.id(length)
```
console.log(Random.id(27)); //bEYikyBwFO4BjvLqv5r626lhYHV
```