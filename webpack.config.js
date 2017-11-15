const path    = require('path');
const webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('babel-polyfill');

const ENV = process.env.npm_lifecycle_event;
const isTest = (ENV === 'test' || ENV === 'test-watch');

const entries = ['babel-polyfill'];

if (!isTest) {
  entries.push(path.resolve(__dirname, 'app', './index.js'));
}

const templateVariables = {
  serverUrl: '',
  baseHref: '',
  debug: false
};

module.exports = {
  devtool: 'source-map',
  // Our application
  entry: entries,
  devServer: {
    historyApiFallback: true,
    port: 3100,
    inline: true,
    hot: true,
    stats: {
      colors: true,
    },
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: [/node_modules/], use: ['ng-annotate-loader','babel-loader']},
      {
        test: /\.html$/,
        use: [
          {loader: 'ngtemplate-loader', options: {relativeTo: '/app/'}},
          {loader: 'html-loader'}
        ]
      },
      {test: /\.less$/,
        use: ExtractTextPlugin.extract({
          // activate source maps via loader query
          use: [
            {loader:'css-loader', options:{sourceMap: ''}},
            {loader: 'postcss-loader', options:{
              plugins: function () {
                return [
                  require('autoprefixer')({browsers: ['last 4 versions']})
                ];
              }}},
            {loader: 'less-loader', options:{sourceMap: ''}}
          ]})
      },
      {test: /\.(jpe?g|png|gif)$/i, use: ['file-loader']},
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{loader:'url-loader', options: {limit:10000, mimetype:'application/font-woff'}}]
      },
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: ['file-loader']},
      {test: /\.css$/, use: ExtractTextPlugin.extract({
        // activate source maps via loader query
        use: [
          {loader:'css-loader', options:{sourceMap: ''}},
          {loader: 'postcss-loader', options:{
            plugins: function () {
              return [
                require('autoprefixer')({browsers: ['last 4 versions']})
              ];
            }}}
        ]})}
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'app/index.ejs',
      inject: 'body',
      templateVariables: templateVariables
    }),

    // extract inline css into separate 'styles.css'
    new ExtractTextPlugin({filename: 'styles.css', allChunks:true}),
  ]
};
