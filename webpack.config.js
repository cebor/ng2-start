var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  debug: true,
  entry: {
    polyfills: [
      //'es6-shim',
      'reflect-metadata',
      'zone.js',
      'zone.js/dist/long-stack-trace-zone'
    ],
    vendor: [
      'angular2/platform/browser',
      'angular2/core',
      'angular2/common',
      'angular2/router',
      'angular2/http',
      'rxjs/Rx'
    ],
    main: './src/main.ts'
  },
  output: {
    path: './dist',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: [/\.(spec|e2e)\.ts$/] },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.less$/, loader: 'raw-loader!postcss-loader!less-loader' }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({name: ['main', 'vendor', 'polyfills'], minChunks: Infinity}),
    new webpack.DefinePlugin({
      MODE: JSON.stringify('dev')
    })
  ],
  devServer: {
    host: 'localhost',
    port: 9000,
    contentBase: 'src/',
    historyApiFallback: true
  },
  // thirdparty loader-configs
  postcss: function () {
    return [ autoprefixer ];
  }
};
