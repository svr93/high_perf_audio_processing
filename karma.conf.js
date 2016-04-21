module.exports = function(config) {
    'use strict';

    const VENDOR_PATH = 'client/www/js/vendor';

    let configuration = {

        frameworks: ['requirejs', 'jasmine'],
        browsers: [

            'chromeFakeUI',
            'Firefox',
            'Safari',
            'operaFakeUI',
            'yandexFakeUI'
        ],
        concurrency: 2,
        browserNoActivityTimeout: 15000,
        reporters: ['progress', 'coverage'],
        coverageReporter: {

            type: 'lcov',
            dir: 'coverage/'
        },
        files: [

            'test/unit/test-main.js',
            { pattern: 'client/www/js/app.js', included: false },
            { pattern: 'test/unit/app.js', included: false },

            {
                pattern: 'client/www/js/lib/error-code-manager.js',
                included: false
            },
            {
                pattern: 'test/unit/lib/error-code-manager.js',
                included: false
            },
            {
                pattern: 'client/www/js/global/web-api.js',
                included: false
            },
            {
                pattern: 'client/www/js/lib/util.js',
                included: false
            },
            {
                pattern: 'client/www/js/adapter/storage.js',
                included: false
            },
            {
                pattern: 'test/unit/adapter/storage.js',
                included: false
            },
            {
                pattern: `${ VENDOR_PATH }/adapterjs/publish/adapter.min.js`,
                included: false
            },
            {
                pattern: 'client/www/js/lib/media-stream-manager.js',
                included: false
            },
            {
                pattern: 'test/unit/lib/media-stream-manager.js',
                included: false
            },
            {
                pattern: 'client/www/js/lib/native-support-manager.js',
                included: false,
            },
            {
                pattern: 'test/unit/lib/native-support-manager.js',
                included: false,
            }
        ],
        preprocessors: {

            'client/www/js/**/*.js': ['babel', 'coverage']
        },
        customLaunchers: {

            Chrome_travis_ci: {

                base: 'Chrome',
                flags: ['--no-sandbox']
            },
            chromeFakeUI: {

                base: 'Chrome',
                flags: ['--use-fake-ui-for-media-stream']
            },
            operaFakeUI: {

                base: 'Opera',
                flags: ['--use-fake-ui-for-media-stream']
            },
            yandexFakeUI: {

                base: 'Yandex',
                flags: ['--use-fake-ui-for-media-stream']
            }
        }
    };
    if (process.env.TRAVIS) {

        configuration.browsers = ['Firefox'];
    }
    config.set(configuration);
};
