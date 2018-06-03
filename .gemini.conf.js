var ENV = process.env;

module.exports = {
    rootUrl: 'http://yandex.ru',
    gridUrl: 'http://' + ENV.SAUCE_USERNAME + ':' + ENV.SAUCE_ACCESS_KEY  +
        '@ondemand.saucelabs.com:80/wd/hub',

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
};
