const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
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
      // allows the importing of pictures and other files
      {
        test: /\.(png|svg|jpg|jpeg|gif|pptx|ppsx)$/,
        type: 'asset/resource',
        generator: {
          filename: 'build-output/media/[name]-[contenthash][ext]'
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
      template: './public/index-template.html',
      title: 'City Temple of Baltimore (Baptist)',
      favicon: './src/assets/favicons/favicon.png'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  // Where files should be sent once they are bundled
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'build-output/js/[name].[contenthash].js',
    chunkFilename: 'build-output/js/[id].[chunkhash].js',
    // specifies that "/" is the base path for all assets
    // refresh from other pages doesn't work if this is not '/'
    publicPath: '/',
    // empties dist folder before build
    clean: true,
    assetModuleFilename: 'build-output/js/[name][ext]'
  }
};
