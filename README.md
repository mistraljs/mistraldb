# MistralDB
A simple database engine for prototyping.

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

# Random
Random function to generate unique
```
const Random = require('mistraldb').Random;
```
## Random.id(length)
```
console.log(Random.id(27)); //bEYikyBwFO4BjvLqv5r626lhYHV
```

# LICENSE
The MIT License (MIT)
Copyright (c) 2015 by Yoza Wiratama

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
