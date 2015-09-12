var gulp = require('gulp');
var babel = require('gulp-babel');
var del = require('del');
var rename = require('gulp-rename');
var jasmine = require('gulp-jasmine');
var concat = require('gulp-concat');

function getBabelOption(isForBrower) {
  var babelOption = {
    loose: 'all',
    modules: 'umd',
    comments: false
  };
  if (!isForBrower) {
    babelOption.optional = ['runtime'];
  }
  return babelOption;
}

gulp.task('build:node', ['clean'], function () {
  return gulp.src('src/linq.js')
    .pipe(babel(getBabelOption(false)))
    .pipe(gulp.dest('.'));
});

gulp.task('build:browser', ['clean'], function () {
  return gulp.src('src/linq.js')
    .pipe(babel(getBabelOption(true)))
    .pipe(rename('linq-browser.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('build', ['build:node', 'build:browser']);

gulp.task('clean', function () {
  return del(['linq*.js']);
});

gulp.task('test', function (done) {
  require("babel/register");

  return gulp.src('src/**/*.js')
    .pipe(jasmine());
});

gulp.task('test:auto', function (done) {
  var watcher = gulp.watch('src/**/*.js', ['test']);
  watcher.on('change', function (event) {
    process.stdout.write('\033c');
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.start('test');
});

gulp.task('clean:tmp', function () {
  return del('.tmp/**/*');
});

gulp.task('test:es5', ['clean:tmp'], function (done) {
  gulp.src('src/**/*.js')
    .pipe(babel(getBabelOption(false)))
    .pipe(gulp.dest('.tmp'))
    .pipe(jasmine());
})

gulp.task('default', ['build'], function () {});
