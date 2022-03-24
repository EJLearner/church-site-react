const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Where files should be sent once they are bundled
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.bundle.js',
    // specifies that "/" is the base path for all assets
    publicPath: '/'
  },
  // webpack 5 comes with devServer which loads in development mode
  devServer: {
    port: 3000,
    // redirects all 404s to the main page
    historyApiFallback: true
  },
  // Rules of how webpack will take our files, complie & bundle them for the browser
  module: {
    rules: [
      // run babel translator on all js and jsx source files, this can convert modern code in source
      // to more compatible code
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader'
        }
      },
      // allows the importing of pictures
      {
        test: /\.(jpg|png|ppsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'url-loader'
        }
      },
      // css loader allows the import of css and style loader injects the css into the style tag
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    // if import extension is not supplied, webpack will try files with these extensions
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
