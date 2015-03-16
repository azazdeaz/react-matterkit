var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require("babelify");
var reactify = require("reactify");
var urify = require("urify");
var source = require('vinyl-source-stream');

gulp.task('js', function () {

  watchify.args.debug = true;
  var bundler = watchify(browserify('./src/index.js', watchify.args))
    .transform(["reactify", {"es6": true}])
    .transform(urify)
    .transform(babelify);

  bundler.on('update', rebundle);

  function rebundle () {
    console.log('rebundle...');
    return bundler.bundle()
      // log errors if they happen
      .on('error', function(e) {
        gutil.log('Browserify Error', e);
      })
      .pipe(source('index.js'))
      .pipe(gulp.dest('./build'))
      .pipe(connect.reload());
  }

  return rebundle();
});

gulp.task('connect', function() {
  return connect.server({
    // root: 'build',
    livereload: true,
    // port: 9634
  });
});

gulp.task('default', ['connect', 'js']);
