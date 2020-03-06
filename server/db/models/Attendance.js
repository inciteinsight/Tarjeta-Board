const Sequelize = require('sequelize')
const db = require('../db.js')

const Attendance = db.define('attendance', {
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

module.exports = Attendance
