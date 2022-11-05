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

  devtool: false,

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/modules'),
      '@classes': path.resolve(__dirname, 'src/modules/classes'),
      '@constants': path.resolve(__dirname, 'src/modules/constants'),
      '@defaults': path.resolve(__dirname, 'src/modules/defaults'),
      '@functions': path.resolve(__dirname, 'src/modules/functions'),
    },
    extensions: ['.ts', '.js'],
  },

  // yessss this works
  // externals: {
  //   fs: 'fs'
  // }
};

module.exports = nodeConfig;
