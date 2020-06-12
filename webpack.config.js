const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const modes = {
  DEV: 'development',
  PROD: 'production'
};

const paths = {
  DEV: 'src',
  PROD: 'dist',
  SERVER: 'server',
  CLIENT: 'client',
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
        template: Path.join(paths.DEV, paths.CLIENT, 'index.html'),
        favicon: Path.join(paths.DEV, paths.CLIENT, paths.ASSETS, 'favicon', 'favicon.png')
      })
    ];

    if (isProduction) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: Path.join(paths.ASSETS, 'css', 'style-[hash:5].css')
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: `./${paths.DEV}/${paths.SERVER}`,
              to: Path.join(process.cwd(), paths.PROD)
            }
          ]
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
    entry: Path.join(process.cwd(), paths.DEV, paths.CLIENT, 'index.js'),
    output: {
      path: Path.join(process.cwd(), paths.PROD, paths.CLIENT),
      filename: Path.join(paths.ASSETS, 'js', 'script-[hash:5].js')
    },

    devServer: {
      contentBase: Path.join(__dirname, paths.PROD, paths.CLIENT),
      port: 9000,
      open: true,
      compress: true,
      historyApiFallback: true,
      proxy: {
        '/api': 'http://localhost:8080'
      }
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
            publicPath: isProduction
              ? '../fonts'
              : `./${paths.ASSETS}/fonts`,
            name: '[name]-[hash:5].[ext]'
          }
        },

        // Loading images
        {
          test: /\.(jpg|png|svg)$/,
          loader: 'file-loader',
          options: {
            outputPath: `./${paths.ASSETS}/images`,
            name: '[name]-[hash:5].[ext]',
            esModule: false
          }
        }
      ]
    }
  };
};
