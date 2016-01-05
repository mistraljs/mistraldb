var fs = require('fs');
var _ = require('lodash');


var Database = function (name) {
    var self = this;
    self.name = name;
    if (!fs.existsSync('./databases'))
        fs.mkdir('./databases');

    if (!fs.existsSync('./databases/' + name))
        fs.mkdir('./databases/' + name);

    if (!fs.existsSync('./databases/' + name + '/init.db')) {
        var initdb = {
            createdAt: new Date().getTime(),
            collections: []
        };
        fs.writeFileSync('./databases/' + name + '/init.db', JSON.stringify(initdb), 'utf8', function (err) {
            if (err) {
                console.log('error on create database');
                return console.log(err);
            }
            console.log("Collection was created!");
        });
    }

};

var Collection = function (db, name) {
    var dbpath = './databases/' + db.name + '/';
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
