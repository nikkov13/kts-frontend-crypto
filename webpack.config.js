const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const TsCheckPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const srcPath = path.resolve(__dirname, "src");
const buildPath = path.resolve(__dirname, "build");

const isProd = process.env.NODE_ENV === "production";

const getStylesConfig = (withModules = false) => {
  return [
    isProd ? MiniCssExtractPlugin.loader : "style-loader",
    !withModules
      ? "css-loader"
      : {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: isProd
                ? "[hash:Base64]"
                : "[path][name]__[local]",
            },
          },
        },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"],
        },
      },
    },
    "sass-loader",
  ];
};

module.exports = {
  entry: path.join(srcPath, "index.tsx"),
  target: !isProd ? "web" : "browserslist",
  devtool: isProd ? "hidden-source-map" : "eval-source-map",
  output: {
    path: buildPath,
    publicPath: "/",
    filename: "bundle.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html"),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new TsCheckPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
    }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getStylesConfig(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getStylesConfig(),
      },
      {
        test: /\.[tj]sx?$/,
        use: "babel-loader",
      },
      {
        test: /\.(jpg|png|svg)$/,
        type: "asset",
        resourceQuery: /url/,
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: {
          loader: "@svgr/webpack",
          options: {
            typescript: true,
            ext: "tsx",
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@components": path.join(srcPath, "components"),
      "@config": path.join(srcPath, "config"),
      "@icons": path.join(srcPath, "icons"),
      "@store": path.join(srcPath, "store"),
      "@styles": path.join(srcPath, "styles"),
      "@utils": path.join(srcPath, "utils"),
    },
  },
  devServer: {
    host: "127.0.0.1",
    port: 8080,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
