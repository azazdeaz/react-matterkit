'use strict';
var babel = require('gulp-babel');
var size = require('gulp-filesize');
var watchify = require('watchify');
var browserify = require('browserify');
var babelify = require('babelify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var rimraf = require('gulp-rimraf');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash/object/assign');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var SOURCES = './src/**/*.{js,jsx}';

gulp.task('build', function () {
    return gulp.src(SOURCES)
        .pipe(size())
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});

gulp.task('watch-build', function () {
  gulp.watch(SOURCES, ['build']);
});

gulp.task('clean', function () {
    return gulp.src('demo/build/*')
        .pipe(rimraf({force: true}));
});

gulp.task('copy-demo-statics', ['clean'], function() {
    gulp.src(['./demo/src/index.html', './demo/src/componentPages/utils/react-live-edit/static/**.*'])
    .pipe(gulp.dest('./demo/build'));
});

(function () {
  // add custom browserify options here
  var customOpts = {
    entries: ['./demo/src/index.jsx'],
    debug: true,
  };
  var opts = assign({}, watchify.args, customOpts);
  var b = watchify(browserify(opts).transform(babelify));

  gulp.task('js', ['clean'], bundle); // so you can run `gulp js` to build the file
  b.on('update', bundle); // on any dep update, runs the bundler
  b.on('log', gutil.log); // output build logs to terminal

  function bundle() {
    return b.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('index.js'))
      // optional, remove if you don't need to buffer file contents
      .pipe(buffer())
      // optional, remove if you dont want sourcemaps
      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
         // Add transformation tasks to the pipeline here.
      .pipe(sourcemaps.write('./')) // writes .map file
      .pipe(gulp.dest('./demo/build'))
      .pipe(reload({stream: true}));
  }
})();

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './demo/build'
        }
    });
});

gulp.task('default', ['build', 'watch-build', 'copy-demo-statics', 'js', 'browser-sync']);
