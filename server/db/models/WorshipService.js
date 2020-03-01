const Sequelize = require('sequelize')
const db = '../db.js'

const ReportingPeriod = db.define('reporting', {
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
  ServiceType: {
    type: Sequelize.ENUM('Midweek', 'Weekend', 'Special'),
    defaultValue: 'Special'
  },
  localId: {
    type: Sequelize.INTEGER,
    defaultValue: 'Manhattan'
  },
  extension: {
    type: Sequelize.STRING,
    defaultValue: 'Main'
  }
})
