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

router.delete('/members', (req, res, next) => {
  try {
    req.session.ws.members = []
    res.send()
  } catch (error) {
    next(error)
  }
})

router.get('/reset', (req, res, next) => {
  try {
    req.session.ws = {
      currentDate: new Date(Date.now()).toISOString(),
      members: []
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
