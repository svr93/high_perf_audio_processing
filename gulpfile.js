'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

const gulpif = require('gulp-if');

const connect = require('gulp-connect');
const Server = require('karma').Server;

const WATCH = (process.argv.indexOf('watch') !== -1);
const PORT = 8001;

/* ----- js processing ----- */

const jshint = require('gulp-jshint');
const jshintStylish = require('jshint-stylish');

gulp.task('watch', () => {

    gulp.watch('client/www/js/**/*.js').on('change', evt => {

        console.log(evt.type, evt.path.match(/\w+\.js/)[0]);
        processJS(evt.path);
    });

    connect.server({

        root: 'server/www',
        fallback: 'server/www/index.html',
        livereload: true,
        port: PORT
    });
});

gulp.task('js', function() {

    return processJS('client/www/js/**/*.js');
});

/**
 * Processes JS files.
 * @param {(Array<string>|string)} src
 * @return {Stream}
 */
function processJS(src) {

    let dest = 'server/www/js';

    if (WATCH) {

        dest = `${ dest }${ getRelativeJSPath(src) }`;
    }
    return gulp.src(src)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish))
        .pipe(babel())
        .pipe(gulp.dest(dest))
        .pipe(gulpif(WATCH, connect.reload()));
}

/**
 * Regular expression for relative path search.
 */
const RELATIVE_PATH_REG_EXP = /^.+www\/js([\w/]+)\/[\w]+.js/;

/**
 * Gets relative path for JS files.
 * @param {string} fullPath
 * @return {string}
 */
function getRelativeJSPath(fullPath) {

    let res = RELATIVE_PATH_REG_EXP.exec(fullPath);
    return res ? res[1] : '';
}

gulp.task('default', ['js'], function() {

    return gulp.src([
            'client/www/**/*.*',
            '!client/www/**/*.js'
        ])
        .pipe(gulp.dest('server/www'));
});

gulp.task('test', () => {

    new Server({

        configFile: `${ __dirname }/karma.conf.js`,
        singleRun: true
    }).start();
});
