const path = require('path');


const nodeConfig = {
  name: "Node",
  mode: process.env.NODE_ENV || 'development',
  target: 'node',
  entry: './src/node.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.cjs',
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
    ],
  },

  devtool: false,

  resolve: {
    extensions: ['.ts', '.js']
  },

  // yessss this works
  // externals: {
  //   fs: 'fs'
  // }
};

module.exports = nodeConfig
