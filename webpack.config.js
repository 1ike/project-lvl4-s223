const path = require('path');
// const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: ['./src'],
    // vendors: ['jquery', 'popper.js', 'bootstrap'],
  },
  devtool: 'inline-source-map',
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    filename: '[name].js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      },
    ],
  },
  // plugins: [
  // new webpack.ProvidePlugin({
  //   $: 'jquery',
  //   jQuery: 'jquery',
  //   'window.jQuery': 'jquery',
  // }),
  // ],
  /* optimization: {
    splitChunks: {
      cacheGroups: {
          commons: {
              // test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all"
          }
      }
    }
  } */
};
