const Sequelize = require('sequelize')
const db = require('../db.js')

const ReportingPeriod = db.define('reporting', {
  // PK
  // FK to Local
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1914
    }
  },
  weekNumber: {
    type: Sequelize.SMALLINT,
    allowNull: false,
    validate: {
      min: 1,
      max: 52
    }
  },
  serviceType: {
    type: Sequelize.STRING,
    defaultValue: 'Special'
  }
})

module.exports = ReportingPeriod
