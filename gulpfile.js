var gulp = require('gulp');
var browserify = require('gulp-browserify');
var react = require('gulp-react');

gulp.task('jsx-transforms', function () {
  gulp.src('./src/js/**/*.js')
    .pipe(react())
    .pipe(gulp.dest('./.tmp/js'));
});

gulp.task('browserify-main', function () {
  gulp.src('./.tmp/js/main.js', {read: false})
    .pipe(browserify())
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', function () {
  gulp.start('jsx-transforms');
  gulp.start('browserify-main');
});

gulp.task('default', function () {
  gulp.start('build');
});

gulp.task('watch', function () {
  gulp.start('default');
  gulp.watch('src/js/**/*.*', ['build']);
});
