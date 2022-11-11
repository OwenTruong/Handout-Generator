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
      '@': path.resolve(__dirname, 'src/CreatePDFModule'),
      '@classes': path.resolve(__dirname, 'src/CreatePDFModule/classes'),
      '@constants': path.resolve(__dirname, 'src/CreatePDFModule/constants'),
      '@defaults': path.resolve(__dirname, 'src/CreatePDFModule/defaults'),
      '@functions': path.resolve(__dirname, 'src/CreatePDFModule/functions'),
    },
    extensions: ['.ts', '.js'],
  },

  // yessss this works
  // externals: {
  //   fs: 'fs'
  // }
};

module.exports = nodeConfig;
