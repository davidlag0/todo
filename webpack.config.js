const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
// const ImageminWebP = require('imagemin-webp');
// const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ["./src/js/app.js"],
  output: {
    path: `${__dirname}/dist`,
    publicPath: "/",
    filename: "bundle.js",
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules: [
      // This piece seems to break CSS files importation. No idea why yet.
      /*
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'script-loader',
        },
      }, */
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        removeAttributeQuotes: true,
      },
      // hash: true,
      template: "./src/html/index.html",
      filename: "index.html",
    }),
    new FaviconsWebpackPlugin({
      logo: "./src/assets/logo/javascript.svg",
      prefix: "assets/",
      inject: "true",
      favicons: {
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),
  ],
};
