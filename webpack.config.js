var path = require('path');

module.exports = {
  context: path.join(__dirname, '/demo'),
  entry: './src/index.jsx',
  output: {
    publicPath: '/dist/',
    path: path.join( __dirname, '/dist'),
    filename: 'index.js'
  },
  resolve: {
    packageMains: ['main'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      matterkit: path.join(__dirname, '/src/index.js'),
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?stage=0'
      }, {
        test: /Styles\.js$/,
        exclude: /node_modules/,
        loader: 'transform?bulkify'
      }, {
        test: /\.html/,
        exclude: /node_modules/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  }
};
