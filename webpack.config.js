/*
 * TODO
 * ajouter support pour sass
 */

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
      },
      {
        test: /\.scss$/,
        include: [ path.resolve(__dirname, "sass") ],
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  stats: {
    colors: true
  },
  mode: 'development'
};
