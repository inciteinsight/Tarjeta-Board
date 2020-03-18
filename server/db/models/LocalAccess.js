const Sequelize = require('sequelize')
const db = require('../db.js')

const LocalAccess = db.define('localaccess', {
  canWrite: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  notes: {
    type: Sequelize.TEXT
  }
})

module.exports = LocalAccess
