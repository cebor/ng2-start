const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const { CheckerPlugin } = require('awesome-typescript-loader');

const path = require('path');

const nodeModules = path.resolve('node_modules');

module.exports = function (env) {
  function isProd() {
    return env === 'prod';
  }

  let config = {
    entry: {
      vendor: [
        'core-js/es6',
        'core-js/es7/reflect',
        'zone.js/dist/zone'
      ],
      main: './src/main.ts'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd() ? '[name].[chunkhash:7].bundle.js' : '[name].bundle.js',
      sourceMapFilename: isProd() ? undefined : '[name].map',
      chunkFilename: isProd() ? '[id].[chunkhash:7].chunk.js' : '[id].chunk.js'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'], exclude: [/\.(spec|e2e)\.ts$/] },
        { test: /\.html$/, loader: 'raw-loader' },
        { test: /\.css$/, loaders: ['raw-loader', 'postcss-loader'] },
        { test: /\.less$/, loaders: ['raw-loader', 'postcss-loader', 'less-loader'] },
        { test: /\.scss$/, loaders: ['raw-loader', 'postcss-loader', 'sass-loader'] }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: !isProd(),
        minimize: isProd()
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env)
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: (module) => module.userRequest && module.userRequest.startsWith(nodeModules)
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunksSortMode: 'dependency'
      }),
      new CheckerPlugin(),

      // workarround
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        path.resolve(__dirname, 'src')
      )
    ],
    devServer: {
      port: 9000,
      contentBase: './src',
      historyApiFallback: true
    },
    performance: {
      hints: false
    }
  };

  if (isProd()) {
    config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
  } else {
    config.devtool = 'source-map';
    config.entry.vendor.push('zone.js/dist/long-stack-trace-zone');
  }

  return config;
};
