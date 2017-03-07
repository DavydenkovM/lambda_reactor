const webpackConfig = require('./webpack.config')
const {resolve} = require('path')

webpackConfig.externals = {}
webpackConfig.target = 'node'

webpackConfig.entry = {
  DashboardEntry: resolve(__dirname, "./js/entries/DashboardServerEntry.js")
}

webpackConfig.output = {
  path: resolve(__dirname, "../priv/static/server"),
  filename: "js/[name].js",
  library: "app",
  libraryTarget: "commonjs2"
}

module.exports = webpackConfig
