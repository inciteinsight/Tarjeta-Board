const User = require('./user')
const Local = require('./Local')
const Member = require('./Member')
const ReportingPeriod = require('./ReportingPeriod')
const Schedule = require('./WSSchedule')
const Attendance = require('./Attendance')

Member.belongsTo(Local)
Local.hasMany(Member)

Schedule.belongsTo(Local)
Local.hasMany(Schedule)

ReportingPeriod.belongsTo(Local)
Local.hasMany(ReportingPeriod)

Local.belongsTo(Local, {as: 'extensionOf'})

// Reporting period may have multiple services
Attendance.belongsTo(Member)
Member.hasMany(Attendance)

Attendance.belongsTo(ReportingPeriod)
ReportingPeriod.hasMany(Attendance)

module.exports = {
  User,
  Local,
  Member,
  ReportingPeriod,
  Attendance,
  Schedule
}
