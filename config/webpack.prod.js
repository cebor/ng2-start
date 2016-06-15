const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = webpackMerge(commonConfig, {
  output: {
    filename: '[name].[chunkhash:7].bundle.js',
    chunkFilename: '[id].[chunkhash:7].chunk.js'
  },
  plugins: [
    new DefinePlugin({
      ENV: JSON.stringify('prod')
    }),
    new DedupePlugin(),
    new UglifyJsPlugin({ compress: { warnings: false } }),
  ]
});
