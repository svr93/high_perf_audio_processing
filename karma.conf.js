module.exports = function(config) {
    'use strict';

    config.set({

        frameworks: ['requirejs', 'jasmine'],
        browsers: ['Chrome', 'Firefox', 'Safari', 'Opera', 'Yandex'],
        concurrency: 2,
        browserNoActivityTimeout: 15000,
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
            }
        ],
        preprocessors: {

            'client/www/js/**/*.js': ['babel']
        }
    });
};
