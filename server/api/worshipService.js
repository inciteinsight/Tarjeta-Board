const router = require('express').Router()
const {
  Attendance,
  ReportingPeriod,
  WorshipService,
  Local
} = require('../db/models')

router.get('/', async (req, res, next) => {
  const worshipServices = await WorshipService.findAll()
  res.send(worshipServices)
})

router.get(
  '/:localId/:weekNumber/:serviceType/:dateTime/',
  async (req, res, next) => {
    try {
      console.log('entering propbased')
      console.info(req.params)
      const {localId, weekNumber, serviceType, dateTime} = req.params

      let worshipService = await WorshipService.findOne({
        where: {dateTime: `${dateTime}Z`},
        include: [{model: Attendance}]
      })

      if (worshipService) {
        const reportingPeriodOfWS = await ReportingPeriod.findOne({
          where: {localId, weekNumber, serviceType}
        })
        worshipService = !reportingPeriodOfWS ? null : worshipService
      }

      res.send(worshipService)
    } catch (error) {
      next(error)
    }
  }
)

router.get('/reporting/:reportingId', async (req, res, next) => {
  try {
    const {reportingId} = req.params
    const attendanceInRep = await WorshipService.findAll({
      where: {
        reportingId
      }
    })
    res.status(200).send(attendanceInRep)
  } catch (error) {
    next(error)
  }
})

router.get('/reporting/:reportingId/includeExt', async (req, res, next) => {
  try {
    const {reportingId} = req.params

    const parentReportingPeriod = await ReportingPeriod.findOne({
      where: {
        id: reportingId
      },
      include: [
        {
          model: WorshipService,
          include: [Attendance]
        }
      ]
    })
    const localOfRep = await Local.findOne({
      where: {
        id: parentReportingPeriod.localId
      },
      include: [
        {
          model: Local,
          as: 'Extensions'
        }
      ]
    })

    const childrenReportingPeriods = await Promise.all(
      localOfRep.Extensions.map(e =>
        ReportingPeriod.findOne({
          where: {
            localId: e.id,
            year: parentReportingPeriod.year,
            weekNumber: parentReportingPeriod.weekNumber,
            serviceType: parentReportingPeriod.serviceType
          },
          include: [
            {
              model: WorshipService,
              include: [Attendance]
            }
          ]
        })
      )
    )

    let services = parentReportingPeriod.worshipservices

    if (childrenReportingPeriods[0]) {
      services = services.concat(
        childrenReportingPeriods.reduce((accum, crp) => {
          accum = accum.concat(crp.worshipservices)
          return accum
        }, [])
      )
    }

    res.status(200).send(services)
  } catch (error) {
    next(error)
  }
})

router.get('/attendance/:worshipserviceId', async (req, res, next) => {
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
