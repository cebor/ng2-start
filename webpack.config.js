var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');

var metadata = {
  baseUrl: '/',
  host: 'localhost',
  port: 9000
};

module.exports = {
  metadata: metadata,
  devtool: 'source-map',
  entry: {
    app: './src/app.ts',
    vendor: './src/vendor.ts'
  },
  output: {
    path: './dist',
    filename: '[name].bundle.js'
  },
  plugins: [
    new CommonsChunkPlugin({name: 'vendor'})
  ],
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ]
  },
  devServer: {
    port: metadata.port,
    host: metadata.host,
    historyApiFallback: true
  }
};
