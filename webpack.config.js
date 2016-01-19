var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');

var metadata = {
  baseUrl: '/',
  host: 'localhost',
  port: 3000
};

module.exports = {
  metadata: metadata,
  entry: {
    app: './src/app.ts',
    vendor: './src/vendor.ts'
  },
  output: {
    filename: '[name].bundle.js',
    path: './dist'
  },
  plugins: [
    new CommonsChunkPlugin('vendor', 'vendor.bundle.js')
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
