const path = require('path')
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
require('dotenv').config()

module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './src/app.tsx',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css'],
  },
  devServer: {
    contentBase: 'dist',
    port: 8080,
    historyApiFallback: true,
    inline: true,
    hot: true,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:5]',
            }
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css', chunkFilename: '[id].css'}),
    new webpack.DefinePlugin({
      'process.env': {
        'FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'FIREBASE_AUTH_ADMIN': JSON.stringify(process.env.FIREBASE_AUTH_ADMIN),
        'FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_API_KEY),
        'FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
}
