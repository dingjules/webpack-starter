const webpack = require('webpack');
const path    = require('path');
const config  = require('./webpack.config');

config.plugins = config.plugins.concat([

  // Automatically move all modules defined outside of application directory to vendor bundle.
  // If you are using more complicated project structure, consider to specify common chunks manually.
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      if(module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
        return false;
      }
      return module.context && module.context.indexOf("node_modules") !== -1;
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'runtime'
  }),
  new webpack.NamedChunksPlugin((chunk) => {
    if (chunk.name) {
      return chunk.name;
    }
    return chunk.modules.map(m => path.relative(m.context, m.request)).join("_");
  }),
  new webpack.NamedModulesPlugin(),
]);

module.exports = config;