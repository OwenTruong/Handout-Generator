const webpack = require('webpack');
const path = require('path');

const config = {
  name: 'noname',
  mode: 'development',
  target: 'node',
  entry: './src/node.ts',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'main.js',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  devtool: 'source-map',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/Handout'),
      '@others': path.resolve(__dirname, 'src/Handout/others'),
      '@defaults': path.resolve(__dirname, 'src/Handout/defaults'),
    },
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
  ],

  // yessss this works
  // externals: {
  //   fs: 'fs'
  // }
};

module.exports = config;
