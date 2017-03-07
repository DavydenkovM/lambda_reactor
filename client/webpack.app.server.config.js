const webpackConfig = require('./webpack.config')
const {resolve} = require('path')

webpackConfig.externals = {}
webpackConfig.target = 'node'

webpackConfig.entry =
  {
    app: resolve(__dirname, "./js/containers/AppContainer.js")
  }

webpackConfig.output =
  {
    path: "./priv/static/server/js",
    filename: "[name].js",
    library: "app",
    libraryTarget: "commonjs2"
  }

module.exports = webpackConfig
