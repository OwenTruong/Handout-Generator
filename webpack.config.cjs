const path = require('path');

// TODO: I believe I need a tsconfig to use typescript
//      After that, I need to add ts compiler to webpack.
const nodeConfig = {
  name: "Node",
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
          loader: 'ts-loader'
        }
      }
    ]
  },

  devtool: false,

  resolve: {
    extensions: ['.ts', '.js']
  }
};

module.exports = nodeConfig