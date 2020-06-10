const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const modes = {
  DEV: 'development',
  PROD: 'production'
};

const paths = {
  DEV: 'src',
  PROD: 'dist',
  ASSETS: 'assets'
};

module.exports = (env = {}) => {
  const { mode = modes.DEV } = env;
  const isDevelopment = mode === modes.DEV;
  const isProduction = mode === modes.PROD;

  const getPlugins = () => {
    const plugins = [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: Path.join(paths.DEV, 'index.html')
      })
    ];

    if (isProduction) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: Path.join(paths.ASSETS, 'css', 'style-[hash:5].css')
        })
      );
    }

    return plugins;
  };

  const getStyleLoaders = () => {
    return [
      isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
      'cache-loader',
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ];
  };

  return {
    mode: isDevelopment ? modes.DEV : modes.PROD,
    devtool: isDevelopment ? 'inline-source-map' : 'source-map',
    entry: Path.join(__dirname, paths.DEV, 'index.js'),
    output: {
      path: Path.join(__dirname, paths.PROD),
      filename: Path.join(paths.ASSETS, 'js', 'script-[hash:5].js')
    },

    devServer: {
      contentBase: Path.join(__dirname, paths.PROD),
      port: 9000,
      open: true,
      compress: true
    },

    plugins: getPlugins(),

    module: {
      rules: [

        // Loading JS
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'cache-loader',
            'babel-loader'
          ]
        },

        // Loading styles
        {
          test: /\.(scss|sass)$/,
          use: getStyleLoaders()
        },

        // Loading fonts
        {
          test: /\.(woff2|woff|ttf)$/,
          loader: 'file-loader',
          options: {
            outputPath: `./${paths.ASSETS}/fonts`,
            name: '[name]-[hash:5].[ext]'
          }
        }
      ]
    }
  };
};
