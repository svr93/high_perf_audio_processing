'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

const Server = require('karma').Server;

gulp.task('js', function() {

    return gulp.src([
            'client/www/js/**/*.js',
            '!client/www/js/vendor/*.js'
        ])
        .pipe(babel())
        .pipe(gulp.dest('server/www/js'));
});

gulp.task('default', ['js'], function() {

    return gulp.src([
            'client/www/**/*.*',
            '!client/www/**/*.js'
        ])
        .pipe(gulp.dest('server/www'));
});

gulp.task('test', done => {

    new Server({

        configFile: `${ __dirname }/karma.conf.js`,
        singleRun: true
    }, () => done()).start();
});
