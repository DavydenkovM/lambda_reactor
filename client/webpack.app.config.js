const webpackConfig = require('./webpack.config')
const {resolve} = require('path')

webpackConfig.entry =
  {
    app: [
        resolve(__dirname, "./js/app.js"),
        resolve(__dirname, "./styles/app.sass")
    ]
  }

webpackConfig.output =
  {
      path: "./priv/static/js",
      filename: "[name].js",
      publicPath: "/",
      pathinfo: true,
  }

module.exports = webpackConfig

