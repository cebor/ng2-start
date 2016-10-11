let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let autoprefixer = require('autoprefixer');
let atl = require('awesome-typescript-loader');

let path = require('path');

module.exports = function (env) {
  function isProd() {
    return env === 'prod';
  }

  let config = {
    entry: {
      globals: [
        'core-js/es6',
        'core-js/es7/reflect',
        'zone.js/dist/zone',
        'tslib'
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
        {
          test: /\.ts$/,
          loaders: [
            {
              loader: 'awesome-typescript-loader',
              query: {
                useForkChecker: true
              }
            },
            'angular2-template-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        { test: /\.html$/, loader: 'raw-loader' },
        { test: /\.css$/, loaders: ['raw-loader', 'postcss-loader'] },
        { test: /\.less$/, loaders: ['raw-loader', 'postcss-loader', 'less-loader'] },
        { test: /\.scss$/, loaders: ['raw-loader', 'postcss-loader', 'sass-loader'] }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: !isProd(),
        minimize: isProd(),
        options: {
          postcss: function () {
            return [autoprefixer];
          }
        }
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env)
      }),
      new webpack.optimize.CommonsChunkPlugin({ name: 'globals' }),
      new HtmlWebpackPlugin({
        template: './src/index.tmpl.html',
        chunksSortMode: 'dependency'
      }),
      new atl.ForkCheckerPlugin(),

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
    node: {
      fs: 'empty',
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };

  if (isProd()) {
    //config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
  } else {
    config.devtool = 'source-map';
    config.entry.globals.push('zone.js/dist/long-stack-trace-zone');
  }

  return config;
};
