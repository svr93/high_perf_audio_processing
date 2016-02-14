'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

const gulpif = require('gulp-if');

const connect = require('gulp-connect');
const Server = require('karma').Server;

const WATCH = (process.argv.indexOf('watch') !== -1);
const PORT = 8001;

gulp.task('watch', () => {

    gulp.watch('client/www/js/**/*.js', ['js']);

    connect.server({

        root: 'server/www',
        fallback: 'server/www/index.html',
        livereload: true,
        port: PORT
    });
});

gulp.task('js', function() {

    return gulp.src([
            'client/www/js/**/*.js',
            '!client/www/js/vendor/*.js'
        ])
        .pipe(babel())
        .pipe(gulp.dest('server/www/js'))
        .pipe(gulpif(WATCH, connect.reload()));
});

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
