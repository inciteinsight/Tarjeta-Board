const Sequelize = require('sequelize')
const db = require('../db.js')

const WorshipService = db.define('worshipservice', {
  // FK to ReportingPeriod
  // FK to Member
  dateTime: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      min: 1914
    }
  },
  hasAttended: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = WorshipService
