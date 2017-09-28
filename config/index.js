const nconf = require('nconf')
const path = require('path')

module.exports = nconf
  .env()
  .argv()
  .file({
    file: path.join(__dirname, 'config.json')
  })
