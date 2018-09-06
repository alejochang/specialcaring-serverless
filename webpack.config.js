const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
  new CopyWebpackPlugin([
    {
      from: 'src/schema/**/*.graphql',
    },
    {
      from: '.webpack/schema/**'
    },
  ])
];


module.exports = {
  entry: slsw.lib.entries,
  devtool: 'source-map',
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  resolve: {
    extensions: [
      '.mjs',
      '.js',
      '.jsx',
      '.json',
      '.ts',
      '.tsx'
    ]
  },
  plugins,
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  externals: [ nodeExternals() ],
  target: 'node',
  module: {
    rules: [
      { test: /\.ts(x?)$/, loaders: ['ts-loader'] },
      { test: /\.graphql?$/, loader: 'webpack-graphql-loader' }
    ],
  },
};
