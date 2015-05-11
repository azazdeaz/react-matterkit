module.exports = {
  context: __dirname + "/demo",
  entry: "./src/index.jsx",
  output: {
    publicPath:"/demo/dist/",
    path: __dirname + "/demo/dist",
    filename: 'index.js'
  },
  resolve: {
    packageMains: ['main'],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      // the optional 'runtime' transformer tells babel to require the runtime instead of inlining it.
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
