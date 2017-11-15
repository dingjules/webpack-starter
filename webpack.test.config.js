const config = require('./webpack.config');

config.module.rules = config.module.rules.concat([
  {
    enforce: 'post',
    test: /\.js$/,
    exclude: /\.spec.js$|node_modules|lib/,
    loader: 'istanbul-instrumenter-loader' +
    ''
  }
]);

config.devtool = 'inline-source-map';

module.exports = config;
