const Sequelize = require('sequelize')
const db = require('../db.js')

// Attendance Properties are optional incase we want to record guest attendances

const Attendance = db.define('attendance', {
  hasAttended: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  localId: {
    type: Sequelize.STRING(7),
    allowNull: true
  },
  areaGroup: {
    type: Sequelize.STRING(7),
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  cfo: {
    type: Sequelize.STRING(2),
    allowNull: true
  },
  officer: {
    type: Sequelize.STRING(20),
    defaultValue: ''
  },
  gender: {
    type: Sequelize.ENUM('M', 'F', 'O')
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
