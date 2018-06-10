const assert = require('chai').assert;

describe('Сценарий боя', function () {
    beforeEach(function() {
        return this.browser
            .url('http://localhost:3333/FightFormInterface.html');
    });

    it('Выводит результат если выбрана верная последовательность',function () {
        const expectedText = 'Hit: 2\nBlock: 3, 4';

        return this.browser
            .click('.fight-form label[for=Torso]')
            .click('.fight-form label[for=Legs-Head]')
            .click('input[type=submit]')
            .alertText()
            .then(function (text) {
                assert.equal(text, expectedText);
            });
    });
});
