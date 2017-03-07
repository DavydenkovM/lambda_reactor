/* eslint key-spacing:0 spaced-comment:0 */
const path = require('path')
const debug = require('debug')('app:config')
const argv = require('yargs').argv
const ip = require('ip')

debug('Creating default configuration.')
// ========================================================
// Default Configuration
// ========================================================

const config = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '.'),
  dir_client : 'web/static/js',
  dir_dist   : 'dist',
  dir_public : 'priv/static',
  dir_server : 'server',
  dir_test   : 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : ip.address(), // use string 'localhost' to prevent exposure on local network
  server_port : process.env.PORT || 3000,
}

/************************************************
 -------------------------------------------------
 All Internal Configuration Below
 Edit at Your Own Risk
 -------------------------------------------------
 ************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__TEST__'     : config.env === 'test',
  '__COVERAGE__' : !argv.watch && config.env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

module.exports = config
