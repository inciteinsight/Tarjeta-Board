const Sequelize = require('sequelize')
const db = require('../db.js')

const Member = db.define('member', {
  // PK
  // FK to Local
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
    type: Sequelize.STRING(1),
    allowNull: false
  },
  officer: {
    type: Sequelize.STRING(20),
    defaultValue: ''
  },
  gender: {
    type: Sequelize.ENUM('M', 'F', 'O')
  }
})

module.exports = Member

// {
//     id: 148,
//     localId: 'B. Beach Ext',
//     areaGroup: '1-2',
//     lastName: 'Mercado',
//     firstName: 'Angel',
//     cfo: 'B',
//     officer: '',
//     gender: 'M'
//   },
