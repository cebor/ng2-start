var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: './src/app.ts',
    vendor: './src/vendor.ts'
  },
  output: {
    path: './dist',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: Infinity})
  ],
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
      }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ]
  },
  devServer: {
    port: 9000,
    historyApiFallback: true
  }
};
