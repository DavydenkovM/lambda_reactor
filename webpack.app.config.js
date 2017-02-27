const webpackConfig = require('./webpack.config')

webpackConfig.entry =
  {
    app: [
        "./web/static/js/app.js",
        "./web/static/styles/app.sass"
    ]
  }

webpackConfig.output =
  {
      path: "./priv/static/js",
      filename: "[name].js",
      publicPath: "/",
  }

module.exports = webpackConfig

