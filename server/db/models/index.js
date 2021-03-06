const User = require('./user')
const Local = require('./Local')
const Member = require('./Member')
const ReportingPeriod = require('./ReportingPeriod')
const Schedule = require('./Schedule')
const Attendance = require('./Attendance')
const WorshipService = require('./WorshipService')
const LocalAccess = require('./LocalAccess')

User.belongsToMany(Local, {through: LocalAccess})
Local.belongsToMany(User, {through: LocalAccess})

Member.belongsTo(Local)
Local.hasMany(Member)

Schedule.belongsTo(Local)
Local.hasMany(Schedule)

ReportingPeriod.belongsTo(Local)
Local.hasMany(ReportingPeriod)

Local.hasMany(Local, {as: 'Extensions', foreignKey: 'extensionOfId'})

Attendance.belongsTo(Member)
Member.hasMany(Attendance)

WorshipService.belongsTo(ReportingPeriod)
ReportingPeriod.hasMany(WorshipService)

Attendance.belongsTo(WorshipService)
WorshipService.hasMany(Attendance)

module.exports = {
  User,
  Local,
  Member,
  ReportingPeriod,
  Attendance,
  Schedule,
  WorshipService,
  LocalAccess
}
