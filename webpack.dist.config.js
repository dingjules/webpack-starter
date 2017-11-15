const webpack       = require('webpack');
const path          = require('path');
const configuration = require('./webpack.optimize.config');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

configuration.devtool = 'hidden-source-map';

configuration.output = {
  filename: '[name].[chunkhash].js',
  publicPath: '',
  path: path.resolve(__dirname, 'target/dist')
};

configuration.plugins = configuration.plugins.concat([
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  // Reduces bundles total size
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    mangle: {

      // You can specify all variables that should not be mangled.
      // For example if your vendor dependency doesn't use modules
      // and relies on global variables. Most of angular modules relies on
      // angular global variable, so we should keep it unchanged
      except: ['$super', '$', 'exports', 'require', 'angular']
    }
  }),

  new OptimizeCssAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { discardComments: {removeAll: true } },
    canPrint: true
  }),
]);

module.exports = configuration;
