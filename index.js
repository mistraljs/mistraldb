var fs = require('fs');
var _ = require('lodash');

function unExistAndMkdir(path, cb) {
    //if (path !== './')
        fs.existsSync(path, function (exist) {
            if (!exist)
                fs.mkdir(path, function () {
                    cb();
                });
            else cb();
        })
}

var Database = function (name, path) {
    if (!path) path = './';
    var self = this;
    self.name = name;
    self.path = path + 'databases/' + name;
    self.rootPath = path;

    if(!fs.existsSync(path))
        fs.mkdirSync(path);
    if (!fs.existsSync(path +'databases'))
        fs.mkdirSync(path+'databases');

    if (!fs.existsSync(path+'databases/' + name))
        fs.mkdirSync(path+'databases/' + name);

    if (!fs.existsSync(path+'databases/' + name + '/init.db')) {
        var initdb = {
            createdAt: new Date().getTime(),
            collections: []
        };
        fs.writeFileSync(path+'databases/' + name + '/init.db', JSON.stringify(initdb), 'utf8', function (err) {
            if (err) {
                console.log('error on create database');
                return console.log(err);
            }
            console.log("Collection was created!");
        });
    }

};

var Collection = function (db, name) {
    var dbpath = db.path + '/';
    var colpath = dbpath + name + '.mc';

    if (!fs.existsSync(colpath)) {
        var def = {
            datas: []
        };
        writeCollectionFileSync(colpath, JSON.stringify(def));
    }
    var self = this;
    var col = JSON.parse(fs.readFileSync(colpath).toString());
    self.name = name;
    self.insert = function (param) {
        if (!param['id'])
            param['id'] = randomId(27);
        col.datas.push(param);
        writeCollectionFileSync(colpath, JSON.stringify(col));
        return param.id;
    };
    self.update = function (query, set) {
        _.forEach(col.datas, function (n, key) {
            if (_.isMatch(n, query)) {
                for (var s in set) {
                    n[s] = set[s];
                }
            }

        });

        writeCollectionFileSync(colpath, JSON.stringify(col));
    };
    self.remove = function (param) {
        col.datas = _.without(col.datas, _.findWhere(col.datas, param));
        writeCollectionFileSync(colpath, JSON.stringify(col));
    };
    self.find = function (param) {
        return _.where(col.datas, param);
    };
    self.findOne = function (param) {
        return _.findWhere(col.datas, param);
    };
    self.first = function () {
        return _.first(col.datas);
    };
    self.last = function () {
        return _.last(col.datas);
    };
    self.take = function (amount) {
        return _.take(col.datas, amount);
    };
    self.without = function (param) {
        return _.without(col.datas, param);
    };
    //collection
    self.at = function (positions) {
        return _.at(col.datas, positions);
    };
    self.map = function (param) {
        return _.map(col.datas, param);
    };
    self.count = function () {
        return _.size(col.datas);
    };
    self.shuffle = function () {
        return _.shuffle(col.datas);
    };
    self.sortBy = function (param) {
        return _.sortBy(col.datas, param);
    };
    self.pluck = function (path) {
        return _.pluck(col.datas, path);
    };
    self.where = function (source) {
        return _.pluck(col.datas, source);
    };
    self.watch = function (cb) {
        fs.watchFile(colpath, function (curr, prev) {
            newcol = JSON.parse(fs.readFileSync(colpath).toString());
            var added = [];
            for (var ii = col.datas.length; ii < newcol.datas.length; ii++) {
                added.push(newcol.datas[ii]);
            }
            col.datas = newcol.datas;
            cb(added);
        });

    }
};


var Random = {
    id: function (length) {
        return randomId(length);
    }
};

function randomId(length) {
    var text = "";
    var d = new Date();
    var n = d.getTime();
    var possible = "LhE4vAuGr5xMScHCWlUtZejPRbY21fXns8yJimKkQVd6TwO9qF7D3gp0IaBNzo" + n;
    possible = _.shuffle(possible.split('')).join('');
    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function writeCollectionFileSync(name, content) {
    fs.writeFileSync(name, content, 'utf8', function (err) {
        if (err) {
            console.log('error on create database');
            return console.log(err);
        }
        console.log("Collection was created!");
    });
}

module.exports = {
    Database: Database,
    Collection: Collection,
    Random: Random
};
