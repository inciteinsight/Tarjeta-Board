const router = require('express').Router()
const {
  Attendance,
  ReportingPeriod,
  WorshipService,
  Local
} = require('../db/models')

router.put('/', async (req, res, next) => {
  try {
    const {id} = req.params
    const attendance = await Attendance.findByPk(id)
    const updatedAttendance = attendance.update(req.body)
    res.status(200).send(updatedAttendance)
  } catch (error) {
    next(error)
  }
})

router.get('/ws/:worshipserviceId', async (req, res, next) => {
  try {
    const {worshipserviceId} = req.params
    const attendanceInWS = await Attendance.findAll({
      where: {
        worshipserviceId
      }
    })
    res.status(200).send(attendanceInWS)
  } catch (error) {
    next(error)
  }
})

router.post('/save/:user', async (req, res, next) => {
  try {
    const attendees = req.body
    const {user} = req.params
    await attendees.forEach(async a => {
      const {hasAttended} = a
      const attendance = await Attendance.findOrBuild({
        where: a
      })
      if (hasAttended) {
        attendance[0].hasAttended = hasAttended
        attendance[0].notes = `Confirmed by ${user} on ${new Date(
          Date.now()
        ).toLocaleString()}`
      }
      await attendance[0].save()
    })
    res.status(200).send()
  } catch (error) {
    next(error)
  }
})

module.exports = router
