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

router.put('/', (req, res, next) => {
  try {
    const updateWs = req.body
    req.session.ws = updateWs
    res.json(req.session.ws)
  } catch (error) {
    next(error)
  }
})

router.post('/', (req, res, next) => {
  try {
    const updateWs = req.body
    req.session.ws = updateWs
    res.json(req.session.ws)
  } catch (error) {
    next(error)
  }
})

router.delete('/', (req, res, next) => {
  try {
    req.session.ws = []
    res.send()
  } catch (error) {
    next(error)
  }
})
