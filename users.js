const fs = require('fs');
const hash = require('random-hash');

module.exports = {
    init: function () {
        const _this = this;
        return this._users ? Promise.resolve(this._users) :
            new Promise(function(resolve, reject) {
                fs.readFile('./json/users.json', 'utf8', function(err, data) {
                    if (err) reject(err);

                    _this._users = JSON.parse(data.trim());

                    resolve(_this._users);
                });
            });
    },

    find: function (username) {
        return this.init().then(function(users) {
            return users.find(function (item) { return item.username === username });
        });
    },

    exists: function (username) {
        return this.find(username).then(Boolean);
    },

    create: function (username, password) {
        const _this = this;
        return this.exists(username).then(function(exists) {
            if (exists) throw new Error('Пользователь существует');

            const user = {
                username: username,
                password: password
            };

            return _this.write(user);
        });
    },

    write: function(user) {
        this._users.push(user);
        const users = this._users;

        return new Promise(function(resolve, reject) {
            fs.writeFile('./json/users.json', JSON.stringify(users, null, 4), 'utf8',
                function(err) {
                    if (err) reject(err);

                    resolve(user);
                });
        });
    }
};
