const Sequelize = require('sequelize')
const Schedule = require('./Schedule')
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
    const {id, name, extensionOfId, schedule} = d
    await Local.create({id, name, extensionOfId})
    const wsSchedules = await schedule.map(s => {
      const {serviceType, day, time} = s
      Schedule.create({localId: id, serviceType, day, time})
    })
    console.log(`Created ${wsSchedules.length} ws schedules for ${name}`)
  })
}

module.exports = Local
