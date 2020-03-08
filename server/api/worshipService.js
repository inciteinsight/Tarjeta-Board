const router = require('express').Router()
const {Attendance, ReportingPeriod, WorshipService} = require('../db/models')

router.post('/attendance/save', async (req, res, next) => {
  try {
    const attendees = req.body
    await attendees.forEach(async a => {
      const {worshipserviceId, memberId, hasAttended} = a
      const attendance = await Attendance.findOrBuild({
        where: {worshipserviceId, memberId}
      })
      attendance[0].hasAttended = hasAttended
      await attendance[0].save()
    })
    res.status(200).send()
  } catch (error) {
    next(error)
  }
})

module.exports = router
