var assert = require('chai').assert;

describe('Регистрация', function () {
    beforeEach(function() {
        return this.browser
            .url('http://localhost:3333/register.html');
    });

    it('Выводит ошибку если логин пустой', function () {
        const usernameFeedback = '.username + .invalid-feedback';
        return this.browser
            .click('.register-button')
            .isVisible(usernameFeedback)
            .then(function(visible) {
                assert(visible);
            })
            .getText(usernameFeedback)
            .then(function (message) {
                assert(message, 'Поле должно быть непустым');
            });
    });

    it('Выводит ошибку если логин занят', function () {
        const usernameFeedback = '.username + .invalid-feedback';
        return this.browser
            .setValue('.username', 'admin')
            .setValue('.password', 'password')
            .setValue('.password-repeat', 'password')
            .click('.register-button')
            .waitForVisible(usernameFeedback)
            .getText(usernameFeedback)
            .then(function (message) {
                assert(message, 'Пользователь существует');
            });
    });
});
