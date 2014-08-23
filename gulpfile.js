var gulp = require('gulp');
var gutil = require('gulp-util');
var rimraf = require('gulp-rimraf');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var SRC = './src';
var DIST = './dist';
var DIST_JS = './dist/js';

var defaultTasks = ['build'];

gulp.task('copy:vendor', function () {
  gulp.src('./node_modules/es5-shim/es5-shim.min.js')
  .pipe(gulp.dest(DIST_JS));
});

gulp.task('build:webpack', function (callback) {
  webpack(webpackConfig, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('build:webpack', err);
    }
    gutil.log('build:webpack', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('copy', ['copy:vendor']);

gulp.task('build', ['copy', 'build:webpack']);

gulp.task('clean', function (callback) {
  rimraf(DIST, callback);
});

gulp.task('watch', defaultTasks, function () {
  gulp.watch(SRC, defaultTasks);
});

gulp.task('default', defaultTasks);
