'use strict';
var babel = require('gulp-babel');
var size = require('gulp-filesize');
var watchify = require('watchify');
var browserify = require('browserify');
var bulkify = require('bulkify');
var babelify = require('babelify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var rimraf = require('gulp-rimraf');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash/object/assign');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

var SOURCES = './src/**/*.{js,jsx}';

gulp.task('clean', function () {
  return gulp.src('demo/build/*')
    .pipe(rimraf({force: true}));
});

gulp.task('copy-demo-statics', ['clean'], function() {
  return gulp.src(['./demo/src/index.html', './demo/src/componentPages/utils/react-live-edit/static/**.*'])
    .pipe(gulp.dest('./demo/build'));
});

gulp.task('lib', function () {
  return gulp.src(SOURCES)
    .pipe(size())
    .pipe(plumber())
    .pipe(babel())
    .pipe(plumber.stop())
    .pipe(gulp.dest('lib'));
});

gulp.task('lib-watch', ['lib'], function () {
  return watch(SOURCES, {base: 'src'})
    .pipe(size())
    .pipe(plumber())
    .pipe(babel())
    .pipe(plumber.stop())
    .pipe(gulp.dest('lib'));
});

(function () {
  // add custom browserify options here
  var customOpts = {
    entries: ['./demo/src/index.jsx'],
    debug: true,
  };
  var opts = assign({}, watchify.args, customOpts);
  var b = watchify(browserify(opts)
    .transform(babelify)
    .transform(bulkify)
    );

  gulp.task('js', ['copy-demo-statics', 'build'], bundle); // so you can run `gulp js` to build the file
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
      .pipe(size())
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
//
// gulp.task('default',s ['watch-build', 'js', 'browser-sync']);







// The development server (the recommended option for development)
gulp.task('default', ['webpack-dev-server']);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task('build-dev', ['webpack:build-dev'], function() {
	gulp.watch(['app/**/*'], ['webpack:build-dev']);
});

// Production build
gulp.task('build', ['webpack:build']);

gulp.task('webpack:build', function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': {
				// This has effect on the react lib size
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError('webpack:build', err);
		gutil.log('[webpack:build]', stats.toString({
			colors: true
		}));
		callback();
	});
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'sourcemap';
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError('webpack:build-dev', err);
		gutil.log('[webpack:build-dev]', stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('webpack-dev-server', function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = 'eval-source-map';
	myConfig.debug = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
		publicPath: '/' + myConfig.output.publicPath,
		stats: {
			colors: true
		}
	}).listen(8080, 'localhost', function(err) {
		if(err) throw new gutil.PluginError('webpack-dev-server', err);
		gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
	});
});
