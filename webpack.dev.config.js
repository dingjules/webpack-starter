const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack           = require('webpack');
const path              = require('path');
const configuration     = require('./webpack.optimize.config');

Object.assign(configuration.plugins[0].options.templateVariables, {
  debug: true
});

configuration.entry = [
    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://0.0.0.0:3000'
  ].concat(configuration.entry);

configuration.output = {
  filename: '[name].bundle.js',
  publicPath: '/',
  path: path.resolve(__dirname, '.')
};

configuration.plugins = configuration.plugins.concat([
  new BrowserSyncPlugin(
    // BrowserSync options
    {
      // browse to http://localhost:3000/ during development
      host: 'localhost',
      port: 3000,
      // proxy the Webpack Dev Server endpoint
      // (which should be serving on http://localhost:3100/)
      // through BrowserSync
      proxy: {
        ws: true,
        target: 'http://localhost:3100/'
      }
    },
    // plugin options
    {
      // prevent BrowserSync from reloading the page
      // and let Webpack Dev Server take care of this
      reload: false
    }
  ),

  // Adds webpack HMR support. It act's like livereload,
  // reloading page after webpack rebuilt modules.
  // It also updates stylesheets and inline assets without page reloading.
  new webpack.HotModuleReplacementPlugin()
]);

module.exports = configuration;
