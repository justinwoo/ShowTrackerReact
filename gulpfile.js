var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var karma = require('karma').server;
var _ = require('lodash');

var SRC = './src/**/*.js';
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

gulp.task('copy:vendor', function () {
  gulp.src('./node_modules/es5-shim/es5-shim.min.js')
  .pipe(gulp.dest(DIST_JS));
});

gulp.task('build:webpack', function (callback) {
  var config = _.merge({}, webpackConfig, {
    devtool: 'source-map'
  })

  webpack(config, webpackHandler('build:webpack', callback));
});

gulp.task('build:tests', function (callback) {
  var testConfig = Object.create(webpackConfig);
  testConfig.entry = TEST_MAIN;
  testConfig.output = TEST_OUTPUT;
  webpack(testConfig, webpackHandler('build:tests', callback));
});

gulp.task('copy', ['copy:vendor']);

gulp.task('build', ['copy', 'build:webpack', 'build:tests']);

gulp.task('watch', defaultTasks, function () {
  karma.start({
    configFile: __dirname + '/karma.conf.js'
  });
  gulp.watch(SRC, defaultTasks);
});

gulp.task('default', defaultTasks);
