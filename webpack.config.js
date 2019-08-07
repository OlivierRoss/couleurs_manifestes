const path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/application.js',
  output: {
    filename: 'application.js',
    path: path.resolve(__dirname, 'public/javascripts')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [ path.resolve(__dirname, "src") ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  mode: 'development'
};
