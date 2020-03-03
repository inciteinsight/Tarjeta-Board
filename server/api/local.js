const router = require('express').Router()
const {Local, Schedule} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const locals = await Local.findAll({
      include: [{model: Schedule}]
    })
    res.status(200).json(locals)
  } catch (error) {
    next(error)
  }
})

module.exports = router
