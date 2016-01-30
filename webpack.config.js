var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

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
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: [/\.(spec|e2e)\.tsx?$/] },
      { test: /\.less$/, loader: 'raw-loader!postcss-loader!less-loader' }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: Infinity}),
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
    return [autoprefixer];
  }
};
