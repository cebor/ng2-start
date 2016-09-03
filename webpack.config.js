let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let autoprefixer = require('autoprefixer');

let path = require('path');

module.exports = function (env) {
  function isProd() {
    return env === 'prod';
  }

  let config = {
    entry: {
      polyfills: [
        'core-js/es6',
        'core-js/es7/reflect',
        'zone.js/dist/zone',
        'ts-helpers'
      ],
      vendor: [
        '@angular/common',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        'rxjs/Rx'
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
      loaders: [
        { test: /\.ts$/, loaders: ['ts-loader', 'angular2-template-loader'], exclude: [/\.(spec|e2e)\.ts$/] },
        { test: /\.html$/, loader: 'raw-loader' },
        { test: /\.css$/, loaders: ['raw-loader', 'postcss-loader'] },
        { test: /\.less$/, loaders: ['raw-loader', 'postcss-loader', 'less-loader'] },
        { test: /\.scss$/, loaders: ['raw-loader', 'postcss-loader', 'sass-loader'] }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: isProd() ? false : true,
        postcss: function () {
          return [ autoprefixer ];
        }
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env)
      }),
      new webpack.optimize.CommonsChunkPlugin({name: ['vendor', 'polyfills']}),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunksSortMode: 'dependency'
      }),

      // workarround
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        path.resolve(__dirname, 'src')
      )
    ],
    devServer: {
      host: 'localhost',
      port: 9000,
      contentBase: 'src/',
      historyApiFallback: true,
      outputPath: path.resolve(__dirname, 'dist')
    }
  };

  if (isProd()) {
    //config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }));
  } else {
    config.entry.polyfills.push('zone.js/dist/long-stack-trace-zone');
  }

  return config;
};
