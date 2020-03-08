const Sequelize = require('sequelize')
const db = require('../db.js')

const Attendance = db.define('attendance', {
  hasAttended: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  code: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  notes: {
    type: Sequelize.TEXT
  }
})

module.exports = Attendance
