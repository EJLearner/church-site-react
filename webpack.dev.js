const {merge} = require('webpack-merge');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // webpack 5 comes with devServer which loads in development mode
  devServer: {
    port: 3000,
    // redirects all 404s to the main page
    historyApiFallback: true
  }
});
