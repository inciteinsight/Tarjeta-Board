const Sequelize = require('sequelize')
const db = require('../db.js')

const Attendance = db.define('attendance', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  dateTime: {
    type: Sequelize.DATE,
    allowNull: false,
    validate: {
      min: 1914
    }
  }
})

module.exports = Attendance
