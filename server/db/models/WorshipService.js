const Sequelize = require('sequelize')
const db = require('../db.js')

const WorshipService = db.define('worshipservice', {
  dateTime: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      min: 1914
    }
  },
  notes: {
    type: Sequelize.TEXT
  }
})

module.exports = WorshipService
