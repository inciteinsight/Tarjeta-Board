const router = require('express').Router()
const {Attendance, ReportingPeriod, WorshipService} = require('../db/models')

const GetTimeZoneAccounted = date => {
  return new Date(
    new Date(date).getTime() - new Date(Date.now()).getTimezoneOffset() * 60000
  )
}

router.get('/attendance/verify/:dateTime', async (req, res, next) => {
  try {
    const {dateTime} = req.params
    const verification = await Attendance.findOne({
      where: {
        dateTime
      }
    })
    res.send(verification)
  } catch (error) {
    next(error)
  }
})

router.get('/attendance/:reportingId', async (req, res, next) => {
  try {
    const {reportingId} = req.params
    const attendanceInRep = await Attendance.findAll({
      where: {
        reportingId
      }
    })
    res.status(200).send(attendanceInRep)
  } catch (error) {
    next(error)
  }
})

router.post('/attendance', async (req, res, next) => {
  try {
    const attendees = req.body
    await attendees.forEach(async a => {
      const {reportingId, memberId, dateTime, hasAttended} = a
      const attendance = await Attendance.findOrBuild({
        where: {reportingId, memberId, dateTime: GetTimeZoneAccounted(dateTime)}
      })
      attendance[0].hasAttended = hasAttended
      await attendance[0].save()
    })
    res.status(200).send()
  } catch (error) {
    next(error)
  }
})

router.get('/local/:localId', async (req, res, next) => {
  try {
    const {localId} = req.params
    const reportingPeriods = await ReportingPeriod.findAll({
      where: {
        localId
      }
    })
    res.status(200).send(reportingPeriods)
  } catch (error) {
    next(error)
  }
})

router.post('/create', async (req, res, next) => {
  try {
    let reportingPeriod = req.body
    const {localId, weekNumber, serviceType, dateTime} = reportingPeriod
    console.log(GetTimeZoneAccounted(dateTime))
    const rpResult = await ReportingPeriod.findOrCreate({
      where: {
        localId: localId,
        year: new Date(dateTime).getFullYear(),
        weekNumber: weekNumber,
        serviceType: serviceType
      }
    })
    const newRP = rpResult[0].dataValues
    reportingPeriod.id = newRP.id

    // create worship service instance
    const wsResult = await WorshipService.findOrCreate({
      reportingId: reportingPeriod.id,
      dateTime
    })
    const worshipService = wsResult[0].dataValues

    req.session.ws.local = localId
    req.session.ws.worshipService = worshipService
    req.session.ws.reportingPeriod = {
      serviceType: serviceType,
      weekNumber: weekNumber,
      id: reportingPeriod.id
    }
    // req.session.ws.reportingPeriod.id = reportingPeriod.id
    // req.session.ws.reportingPeriod.serviceType = serviceType
    // req.session.ws.reportingPeriod.weekNumber = weekNumber

    // Send both reportingPeriod and result
    res.status(200).json({
      reportingPeriod,
      worshipService
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
