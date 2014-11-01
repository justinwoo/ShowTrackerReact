var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var _ = require('lodash');
var jest = require('jest-cli');
var chalk = require('chalk');

var webpackConfig = require('./webpack.config.js');

var SRC = './src/**/*.js';
var DIST = './dist';
var DIST_JS = './dist/js';

var defaultTasks = ['build', 'test'];

function webpackHandler (name, callback) {
  return function (err, stats) {
    if (err) {
      throw new gutil.PluginError(name, err);
    }
    gutil.log(name, stats.toString({
      hash: false,
      timings: false,
      assets: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: false,
      colors: true
    }));
    callback();
  }
};

gulp.task('build:webpack', function (callback) {
  var config = _.assign({}, webpackConfig, {
    devtool: 'source-map'
  })

  webpack(config, webpackHandler('build:webpack', callback));
});

gulp.task('build', ['build:webpack']);

gulp.task('watch', defaultTasks, function () {
  gulp.watch(SRC, defaultTasks);
});

gulp.task('test:jest', function (callback) {
  var onComplete = function (result) {
    if (result) {
    } else {
      console.log(chalk.bgRed('!!! Jest tests failed! You should fix them soon. !!!'));
    }
    callback();
  }
  jest.runCLI({}, __dirname, onComplete);
});

gulp.task('test', ['test:jest']);

gulp.task('default', defaultTasks);
