const users = require('./users');

module.exports = function (app) {
    app.get('/ping', (req, res) => {
        res.send('pong');
    });

    app.post('/register', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        users.create(username, password)
            .then(function(user) {
                res.send(user);
            })
            .catch(function(e) {
                res.status(401).send(e.message);
            });
    });
};
