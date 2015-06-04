var path = require('path');
var glob = require('glob');
var config = require('./webpack.config');

var sources = {};
glob.sync('./src/**/*.*').forEach(function (path) {
  sources[path] = path;
});

module.exports = {
  devtool: 'eval-source-map',
  // entry: './src/index.js',
  entry: sources,
  output: {
    path: path.join( __dirname, '/lib'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  resolve: config.resolve,
  module: config.module,
  externals: [
    // Every non-relative module is external
    // react -> require("react")
    // /^[a-z\-0-9]+$/,
    // /^[^\.]/,
    {react: true}
  ]
};
