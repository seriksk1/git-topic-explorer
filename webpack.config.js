/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptomizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = !isDevelopment;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProduction) {
    config.minimizer = [
      new OptomizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const cssLoaders = (loader) => {
  const loaders = [
    isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        importLoaders: 1,
      },
    },
  ];

  if (loader) {
    loaders.push(loader);
  }

  return loaders;
};

module.exports = {
  mode: isProduction ? "production" : isDevelopment && "development",
  context: path.resolve(__dirname, "src"),
  entry: {
    main: ["@babel/polyfill", "./index.tsx"],
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: isProduction
      ? "static/js/[name].[contenthash].js"
      : "static/js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js|tsx|jsx)$/,
        exclude: "/node_modules/",
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        exclude: "/node_modules/",
        use: cssLoaders(""),
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: "/node_modules/",
        use: cssLoaders("sass-loader"),
      },
      {
        test: /\.pcss$/,
        exclude: "/node_modules/",
        use: cssLoaders("postcss-loader"),
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[contenthash][ext]",
        },
      },
      {
        test: /\.(ttf|woff|woff2|eof)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[contenthash][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx", ".png", ".jpg", ".jpeg"],
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "../public/index.html",
      minify: {
        collapseWhitespace: isProduction,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isProduction
        ? "static/css/[name].[contenthash].css"
        : "static/css/[name].css",
    }),
  ],
  optimization: optimization(),
  devServer: {
    port: 3000,
    hot: isDevelopment,
    historyApiFallback: true,
  },
  devtool: isDevelopment && "source-map",
};
