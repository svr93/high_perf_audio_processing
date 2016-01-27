module.exports = function(config) {
    'use strict';

    config.set({

        frameworks: ['requirejs', 'jasmine'],
        browsers: ['Chrome'],
        files: [

            'test/unit/test-main.js',
            { pattern: 'client/www/js/app.js', included: false },
            { pattern: 'test/unit/app.js', included: false }
        ],
        preprocessors: {

            'client/www/js/app.js': ['babel']
        }
    });
};
