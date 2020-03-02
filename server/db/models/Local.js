const Sequelize = require('sequelize')
const db = require('../db.js')

const Local = db.define('local', {
  // PK
  // FK to parentLocalId
  name: {
    type: Sequelize.STRING(80),
    allowNull: false
  }
})

module.exports = Local
