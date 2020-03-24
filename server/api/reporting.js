const router = require('express').Router()
const {Attendance, ReportingPeriod, WorshipService} = require('../db/models')
const moment = require('moment')

const GetTimeZoneAccounted = date => {
  return new Date(
    new Date(date).getTime() - new Date(Date.now()).getTimezoneOffset() * 60000
  )
}

router.get('/ws/propBased', async (req, res, next) => {
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

// router.get('/local/:localId/ext', async (req, res, next) => {
//   try {
//     const {localId} = req.params
//     const reportingPeriods = await ReportingPeriod.findAll({
//       where: {
//         localId
//       }
//     })
//     res.status(200).send(reportingPeriods)
//   } catch (error) {
//     next(error)
//   }
// })

router.post('/create', async (req, res, next) => {
  try {
    let reportingPeriod = req.body
    let {localId, weekNumber, serviceType, dateTime} = reportingPeriod

    dateTime = GetTimeZoneAccounted(dateTime)
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

    const wsResult = await WorshipService.findOrCreate({
      where: {
        reportingId: reportingPeriod.id,
        dateTime
      }
    })
    const worshipService = wsResult[0].dataValues

    req.session.ws.local = localId
    req.session.ws.worshipService = worshipService
    req.session.ws.reportingPeriod = {
      serviceType: serviceType,
      weekNumber: weekNumber,
      id: reportingPeriod.id
    }

    res.status(200).json({
      reportingPeriod,
      worshipService
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
