const webpackConfig = require('./webpack.config')
const {resolve} = require('path')

webpackConfig.entry = {
  DashboardEntry: [
    resolve(__dirname, "./js/entries/DashboardEntry.js"),
    resolve(__dirname, "./styles/app.sass")
  ]
}

webpackConfig.output = {
  path: resolve(__dirname, "../priv/static/"),
  filename: "js/[name].js",
  publicPath: "/",
  pathinfo: true,
}

module.exports = webpackConfig
