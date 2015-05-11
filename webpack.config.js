module.exports = {
  context: __dirname + "/demo",
  entry: "./src/index.jsx",
  output: {
    publicPath: '/dist/',
    path: __dirname + "/dist",
    filename: 'index.js'
  },
  resolve: {
    packageMains: ['main'],
    extensions: ['', '.js', '.jsx'],
    alias: {
      matterkit: __dirname + '/src/index.js',
    }
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /Styles\.js$/,
        exclude: /node_modules/,
        loader: "transform?bulkify"
      }, {
        test: /\.html/,
        exclude: /node_modules/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  }
};
