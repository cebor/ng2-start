const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = webpackMerge(commonConfig, {
  debug: true,
  devtool: 'source-map',
  entry: {
    polyfills: [
      'zone.js/dist/long-stack-trace-zone'
    ]
  },
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new DefinePlugin({
      ENV: JSON.stringify('dev')
    })
  ]
});
