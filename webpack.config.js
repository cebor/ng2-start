const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { PurifyPlugin } = require('@angular-devkit/build-optimizer')
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const path = require('path');

const root = (...dir) => path.resolve(__dirname, ...dir);

const dist = root('dist');
const nodeModules = root('node_modules');
const styles = root('src', 'styles.css');

const buildOptimizer = {
  loader: "@angular-devkit/build-optimizer/webpack-loader",
  options: {
    sourceMap: false
  }
};

module.exports = function (env = {}) {
  const isProd = !!env.prod;
  const aot = !!env.aot;

  let config = {
    entry: {
      styles: [
        './src/styles.css'
      ],
      vendor: [
        'core-js/es6',
        'core-js/es7/reflect',
        'zone.js/dist/zone'
      ],
      main: [
        './src/main.ts'
      ]
    },
    output: {
      path: dist,
      filename: isProd ? '[name].[chunkhash:7].bundle.js' : '[name].bundle.js',
      sourceMapFilename: isProd ? undefined : '[name].map',
      chunkFilename: isProd ? '[id].[chunkhash:7].chunk.js' : '[id].chunk.js'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        // don't touch, must be on first position in array
        {
          test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
          use: ['@ngtools/webpack'],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        { test: /\.html$/, use: ['raw-loader'] },
        { test: /\.css$/, use: ['raw-loader', 'postcss-loader'], exclude: [styles] },
        { test: /\.less$/, use: ['raw-loader', 'postcss-loader', 'less-loader'] },
        { test: /\.scss$/, use: ['raw-loader', 'postcss-loader', 'sass-loader'] }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: !isProd,
        minimize: isProd,
        options: {
          context: __dirname,
        }
      }),
      new webpack.DefinePlugin({
        IS_PROD: JSON.stringify(isProd)
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
      new AngularCompilerPlugin({
        tsConfigPath: './src/tsconfig.app.json',
        mainPath: './main.ts',
        skipCodeGeneration: !aot
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunks: [
          'inline',
          'styles',
          'vendor',
          'main'
        ],
        chunksSortMode: 'manual'
      })
    ],
    devtool: !isProd ? 'source-map' : undefined,
    stats: {
      children: false,
      modules: false
    },
    devServer: {
      port: 9000,
      contentBase: './src',
      historyApiFallback: true
    }
  };

  if (isProd) {
    config.module.rules.push({
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?importLoaders=1', 'postcss-loader']
      }),
      include: [styles]
    });
    config.module.rules[0].use.splice(0, 0, buildOptimizer);
    config.module.rules.push(buildOptimizer);
    config.plugins.push(new PurifyPlugin());
    config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    config.plugins.push(new ExtractTextPlugin('[name].[chunkhash:7].css'));
    config.plugins.push(new UglifyJSPlugin());
  } else {
    config.entry.vendor.push('zone.js/dist/long-stack-trace-zone');
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader'],
      include: [styles]
    });
  }

  return config;
};
