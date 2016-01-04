var fs = require('fs');
var lodash = require('lodash');

exports.Collection = function (name) {

    if (!fs.existsSync('./' + name + '.json')) {
        var def = {
            datas: []
        };
        writeCollectionFileSync(name, JSON.stringify(def));
    }
    var self = this;
    var col = JSON.parse(fs.readFileSync('./' + name + '.json').toString());
    self.name = name;
    self.insert = function (param) {
        if (param['id'])
            param['id'] = randomId(27);
        col.datas.push(param);
        writeCollectionFileSync(self.name, JSON.stringify(col));
        return param.id;
    },
        self.update = function (query, set) {
            var domain = localStorage[self.name];
            if (domain) {
                domain = JSON.parse(domain);
                _.each(domain, function (item) {
                    if (_.isMatch(item, query)) {
                        for (var s in set) {
                            item[s] = set[s];
                        }
                    }

                });
                localStorage[self.name] = JSON.stringify(domain);
                Mistral.refresh();
                //console.log(match);
            }
            else console.log("Collection undefined");
        },
        self.remove = function (param) {
            var domain = localStorage[self.name];
            if (domain) {
                domain = JSON.parse(domain);
                domain = _.without(domain, _.findWhere(domain, param));
                localStorage[self.name] = JSON.stringify(domain);
                Mistral.refresh();
            }
            else console.log("Collection undefined");
        },
        self.find = function (param) {
            var domain = localStorage[self.name];
            if (domain) {
                domain = JSON.parse(domain);
                return _.where(domain, param);
            }
            else return [];
        },
        self.findOne = function (param) {
            var domain = localStorage[self.name];
            if (domain) {
                domain = JSON.parse(domain);
                return _.findWhere(domain, param);
            }
            else return [];
        }

    console.log('init collection : ' + name);
};

exports.Random = {
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

function  writeCollectionFileSync(name, content){
    fs.writeFileSync('./' + name + '.json', content, 'utf8', function (err) {
        if (err) {
            console.log('error on create database');
            return console.log(err);
        }
        console.log("Collection was created!");
    });
}