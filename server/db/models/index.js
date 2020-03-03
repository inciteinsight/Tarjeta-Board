const User = require('./user')
const Local = require('./Local')
const Member = require('./Member')
const ReportingPeriod = require('./ReportingPeriod')
const Schedule = require('./WSSchedule')
const WorshipService = require('./WorshipService')

Member.belongsTo(Local)
Local.hasMany(Member)

Schedule.belongsTo(Local)
Local.hasMany(Schedule)

ReportingPeriod.belongsTo(Local)
Local.hasMany(ReportingPeriod)

Local.belongsTo(Local, {as: 'extensionOf'})

Member.belongsToMany(ReportingPeriod, {through: WorshipService})
ReportingPeriod.belongsToMany(Member, {through: WorshipService})

module.exports = {
  User,
  Local,
  Member,
  ReportingPeriod,
  WorshipService,
  Schedule
}
