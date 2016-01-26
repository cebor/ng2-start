var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  debug: true,
  entry: {
    vendor: './src/vendor.ts',
    main: './src/main.ts'
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
    extensions: ['', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [/\.(spec|e2e)\.tsx?$/]
      }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ]
  },
  devServer: {
    port: 9000,
    contentBase: 'src/',
    historyApiFallback: true
  }
};
