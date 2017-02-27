const webpackConfig = require('./webpack.config')
webpackConfig.externals = {}
webpackConfig.target = 'node'

webpackConfig.entry =
  {
    app: "./web/static/js/containers/AppContainer.js"
  }

webpackConfig.output =
  {
    path: "./priv/static/server/js",
    filename: "[name].js",
    library: "app",
    libraryTarget: "commonjs2"
  }

module.exports = webpackConfig
