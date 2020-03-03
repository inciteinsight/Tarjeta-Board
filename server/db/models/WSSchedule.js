const Sequelize = require('sequelize')
const db = require('../db.js')

const Schedule = db.define('schedule', {
  serviceType: {
    type: Sequelize.ENUM('Midweek', 'Weekend', 'CWS', 'Special'),
    defaultValue: 'Special'
  },
  day: {
    type: Sequelize.ENUM(
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ),
    defaultValue: 'Saturday'
  },
  time: {
    type: Sequelize.TIME,
    default: '09:00:00'
  }
})

module.exports = Schedule
