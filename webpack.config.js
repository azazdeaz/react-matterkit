module.exports = {
  context: __dirname + "/demo",
  entry: "./src/index.jsx",
  packageMains: ['main'],
  output: {
    publicPath:"/dist/",
    path: __dirname + "/dist",
    filename: 'index.js'
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
