const router = require('express').Router()
const {Attendance, ReportingPeriod} = require('../db/models')

const GetTimeZoneAccounted = date => {
  return new Date(
    new Date(date).getTime() + new Date(Date.now()).getTimezoneOffset() * 60000
  )
}

router.post('/create', async (req, res, next) => {
  try {
    const {localId, weekNumber, serviceType, currentDate} = req.body
    const reportingPeriod = await ReportingPeriod.findOrCreate({
      where: {
        localId: localId,
        year: new Date(currentDate).getFullYear(),
        weekNumber: weekNumber,
        serviceType: serviceType
      }
    })
    console.log(reportingPeriod)
    req.session.ws.local = localId
    req.session.ws.currentDate = currentDate
    req.session.ws.serviceType = serviceType
    req.session.ws.weekNumber = weekNumber
    res.status(200).json(req.body)
  } catch (error) {
    next(error)
  }
})

module.exports = router
