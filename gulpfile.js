var gulp = require('gulp');
var gutil = require('gulp-util');
var rimraf = require('gulp-rimraf');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var SRC = './src';
var DIST = './dist';
var DIST_JS = './dist/js';
var TEST_MAIN = './src/__tests__/main.js';
var TEST_OUTPUT = {
  path: './test',
  filename: 'main.js'
};

var defaultTasks = ['build'];

var webpackHandler = function (name, callback) {
  return function (err, stats) {
    if (err) {
      throw new gutil.PluginError(name, err);
    }
    gutil.log(name, stats.toString({
      colors: true
    }));
    callback();
  }
};

gulp.task('copy:vendor', function () {
  gulp.src('./node_modules/es5-shim/es5-shim.min.js')
  .pipe(gulp.dest(DIST_JS));
});

gulp.task('build:webpack', function (callback) {
  webpack(webpackConfig, webpackHandler('build:webpack', callback));
});

gulp.task('build:tests', function (callback) {
  var testConfig = Object.create(webpackConfig);
  testConfig.entry = TEST_MAIN;
  testConfig.output = TEST_OUTPUT;
  webpack(testConfig, webpackHandler('build:tests', callback));
});

gulp.task('copy', ['copy:vendor']);

gulp.task('build', ['copy', 'build:webpack', 'build:tests']);

gulp.task('clean', function (callback) {
  rimraf(DIST, callback);
});

gulp.task('watch', defaultTasks, function () {
  gulp.watch(SRC, defaultTasks);
});

gulp.task('default', defaultTasks);
