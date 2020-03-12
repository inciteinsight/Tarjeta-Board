const router = require('express').Router()

module.exports = router

router.get('/', (req, res, next) => {
  try {
    const ws = req.session.ws
    res.json(ws)
  } catch (error) {
    next(error)
  }
})

router.put('/members', (req, res, next) => {
  try {
    const updateWs = req.body
    req.session.ws.members = updateWs
    res.json(req.session.ws)
  } catch (error) {
    next(error)
  }
})

router.post('/members', (req, res, next) => {
  try {
    const updateWs = req.body
    req.session.ws.members = updateWs
    res.json(req.session.ws)
  } catch (error) {
    next(error)
  }
})

// For Resetting Attendanace - without ws or rp rest
// Unused as of 03-12-2020
router.delete('/members', (req, res, next) => {
  try {
    req.session.ws.members = []
    res.send(req.session.ws)
  } catch (error) {
    next(error)
  }
})

router.get('/reset', (req, res, next) => {
  try {
    req.session.ws = {
      members: [],
      worshipService: {
        id: 0,
        dateTime: new Date(Date.now()).toISOString()
      },
      reportingPeriod: {
        weekNumber: 1,
        serviceType: 'Special',
        id: 0
      }
    }
    res.json(req.session.ws)
  } catch (error) {
    next(error)
  }
})

router.get('/secAccess', (req, res, next) => {
  try {
    const access = req.session.access
    res.json(access)
  } catch (error) {
    next(error)
  }
})

router.put('/secAccess', (req, res, next) => {
  try {
    req.session.access.isSecretary = !req.session.access.isSecretary
    res.json(req.session.access)
  } catch (error) {
    next(error)
  }
})
