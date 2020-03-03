const Sequelize = require('sequelize')
const db = require('../db.js')

const Local = db.define('local', {
  id: {
    type: Sequelize.STRING(7),
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(80),
    allowNull: false
  }
})

Local.loadData = data => {
  return data.map(async d => {
    const {id, name, extensionOfId} = d
    await Local.create({id, name, extensionOfId})
  })
}

module.exports = Local
