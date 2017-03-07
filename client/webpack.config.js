const Webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Autoprefixer = require("autoprefixer");
const postcssCssnext = require("postcss-cssnext");

const env = process.env.MIX_ENV === "prod" ? "production" : "development";
const {resolve} = require('path')

const config = require('./config');

const __DEV__ = config.globals.__DEV__;
const __PROD__ = config.globals.__PROD__;
const __TEST__ = config.globals.__TEST__;

const plugins = {
  production: [
    new Webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    })
  ],
  development: []
}

module.exports = {
  devtool: 'eval',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        plugins: ["transform-decorators-legacy"],
        presets: ["react", "es2015", "stage-2"],
      }
    }, {
      test: /\.sass/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[hash:base64]"
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: () => [
                postcssCssnext({
                  browsers: ['last 2 versions', 'ie >= 9'],
                  compress: true,
                })
              ],
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      })
    }, {
      test: /\.png$/,
      loader: "url-loader?" + [
        "limit=100000",
        "mimetype=image/png"
      ].join("&"),
    }, {
      test: /\.gif$/,
      loader: "url-loader?" + [
        "limit=100000",
        "mimetype=image/gif"
      ].join("&"),
    }, {
      test: /\.jpg$/,
      loader: "file-loader?name=images/[name].[ext]",
    }, {
      test: /\.(woff|woff2)$/,
      loader: "url-loader?" + [
        "limit=10000",
        "mimetype=application/font-woff",
        "name=fonts/[name].[ext]"
      ].join("&"),
    }, {
      test: /\.ttf$/,
      loader: "url-loader?" + [
        "limit=10000",
        "mimetype=application/octet-stream",
        "name=fonts/[name].[ext]"
      ].join("&"),
    }, {
      test: /\.eot$/,
      loader: "url-loader?" + [
        "limit=10000",
        "name=fonts/[name].[ext]"
      ].join("&"),
    }, {
      test: /\.svg$/,
      loader: "url-loader?" + [
        "limit=10000",
        "mimetype=image/svg+xml",
        "name=images/[name].[ext]"
      ].join("&"),
    }],
  },
  resolve: {
    extensions: [".js", ".sass", ".css"],
    modules: [
      __dirname + "/js",
      "node_modules"
    ],
    alias: {
      styles: __dirname + "/styles"
    }
  },
  plugins: [
    // Important to keep React file size down
    new Webpack.DefinePlugin(Object.assign({
      "process.env": {
        "NODE_ENV": JSON.stringify(env),
      },
    }, config.globals)),
    new ExtractTextPlugin("css/app.css"),
    new Webpack.optimize.CommonsChunkPlugin({
      names: [],
    }),

    new CopyPlugin([{from: resolve(__dirname, "./assets")}])
  ].concat(plugins[env])
}
