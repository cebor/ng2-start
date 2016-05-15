const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const util = require('./util');

module.exports = {
  entry: {
    polyfills: [
      //'es6-shim',
      'reflect-metadata',
      'zone.js',
    ],
    vendor: [
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/http',
      '@angular/platform-browser-dynamic',
      '@angular/router-deprecated',
      'rxjs'
    ],
    main: './src/main.ts'
  },
  output: {
    path: util.root('dist')
  },
  resolve: {
    root: util.root('src'),
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: [/\.(spec|e2e)\.ts$/] },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.less$/, loaders: ['raw-loader', 'postcss-loader', 'less-loader'] }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({name: ['vendor', 'polyfills']}),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunksSortMode: 'dependency'
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
