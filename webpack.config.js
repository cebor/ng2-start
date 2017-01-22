const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AotPlugin } = require('@ngtools/webpack');

const path = require('path');

const nodeModules = path.resolve('node_modules');

module.exports = function (env) {
  const isProd = env === 'prod';

  let config = {
    entry: {
      vendor: [
        'core-js/es6',
        'core-js/es7/reflect',
        'zone.js/dist/zone'
      ],
      styles: [
        './src/styles.css'
      ],
      main: [
        './src/main.ts'
      ]
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? '[name].[chunkhash:7].bundle.js' : '[name].bundle.js',
      sourceMapFilename: isProd ? undefined : '[name].map',
      chunkFilename: isProd ? '[id].[chunkhash:7].chunk.js' : '[id].chunk.js'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        { test: /\.ts$/, use: '@ngtools/webpack', exclude: [/\.(spec|e2e)\.ts$/] },
        { test: /\.html$/, use: ['raw-loader'] },
        { test: /\.css$/, use: ['raw-loader', 'postcss-loader'], exclude: [path.resolve(__dirname, 'src', 'styles.css')] },
        { test: /\.less$/, use: ['raw-loader', 'postcss-loader', 'less-loader'] },
        { test: /\.scss$/, use: ['raw-loader', 'postcss-loader', 'sass-loader'] }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: !isProd,
        minimize: isProd,
        context: __dirname,
        options: {
          postcss: [
            autoprefixer
          ]
        }
      }),
      new webpack.DefinePlugin({
        ENV: JSON.stringify(env)
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'inline',
        minChunks: Infinity
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: (module) => module.userRequest && module.userRequest.startsWith(nodeModules)
      }),
      new AotPlugin({
        tsConfigPath: './tsconfig.json',
        mainPath: './src/main.ts',
        skipCodeGeneration: !isProd
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    devServer: {
      port: 9000,
      contentBase: './src',
      historyApiFallback: true
    }
  };

  if (isProd) {
    config.module.rules.push({
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader?importLoaders=1!postcss-loader'
      }),
      include: [path.resolve(__dirname, 'src', 'styles.css')]
    });
    config.plugins.push(new ExtractTextPlugin('[name].[chunkhash:7].css'));
    config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
  } else {
    config.devtool = 'source-map';
    config.entry.vendor.push('zone.js/dist/long-stack-trace-zone');
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader'],
      include: [path.resolve(__dirname, 'src', 'styles.css')]
    });
  }

  return config;
};
