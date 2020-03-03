const Sequelize = require('sequelize')
const db = require('../db.js')

const Member = db.define('member', {
  id: {
    type: Sequelize.STRING(7),
    primaryKey: true
  },
  areaGroup: {
    type: Sequelize.STRING(7),
    allowNull: false
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
    allowNull: false
  },
  officer: {
    type: Sequelize.STRING(20),
    defaultValue: ''
  },
  gender: {
    type: Sequelize.ENUM('M', 'F', 'O')
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

Member.getFromManSecExcel = name => {
  switch (name) {
    case 'Manhattan':
      return 'MANNY'
    case 'B. Beach Ext':
      return 'BBMANNY'
    default:
      return 'MANNY'
  }
}

Member.loadData = data => {
  return data.map(async d => {
    const localId = Member.getFromManSecExcel(d.local)
    const gender = d.gender[0].toUpperCase()
    const {id, areaGroup, lastName, firstName, cfo, officer} = d
    await Member.create({
      id,
      localId,
      areaGroup,
      lastName,
      firstName,
      cfo,
      officer,
      gender
    })
  })
}

module.exports = Member
