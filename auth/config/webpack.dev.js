const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packagingJson = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8082,
    historyApiFallback: {
      historyApiFallback: true,
    },
  },
  output: {
    publicPath: 'http://localhost:8082/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/main',
      },
      shared: packagingJson.dependencies,
    })
  ],
};

module.exports = merge(commonConfig, devConfig);
