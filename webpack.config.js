const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  target: 'web',
  entry: {
    application: ['whatwg-fetch', './frontend/application.js'], // whatwg-fetch : utilisation de fetch dans le code
    parcours: './frontend/parcours.js',
    statistiques: './frontend/statistiques.js',
    login: './frontend/login.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/javascripts')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [ path.resolve(__dirname, "frontend") ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [ 
                '@babel/preset-env', {
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  stats: {
    colors: true
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};
