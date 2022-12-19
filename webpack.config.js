const path = require('path');

const nodeConfig = {
  name: 'Node',
  mode: process.env.NODE_ENV || 'development',
  target: 'node',
  entry: './src/node.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
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

  // yessss this works
  // externals: {
  //   fs: 'fs'
  // }
};

module.exports = nodeConfig;
