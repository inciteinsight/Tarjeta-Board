const User = require('./user')
const Local = require('./Local')
const Member = require('./Member')
const ReportingPeriod = require('./ReportingPeriod')
const WorshipService = require('./WorshipService')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Member.belongsTo(Local)
Local.hasMany(Member)

ReportingPeriod.belongsTo(Local)
Local.hasMany(ReportingPeriod)

//  Local.hasMany(Local, as Extensions)

Member.belongsToMany(ReportingPeriod, {through: WorshipService})
ReportingPeriod.belongsToMany(Member, {through: WorshipService})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Local,
  Member,
  ReportingPeriod,
  WorshipService
}
