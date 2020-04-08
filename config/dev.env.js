'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:3000"',
  OAUTH_SERVER: '"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"',
  CLIENT_ID: '"CORP-DDP-PORTAL-DEV"',
  CLIENT_SECRET: '"XXXXXXXXXXXXXX"',
  REDIRECT_URI: '"https://localhost:8080/login"'
})
