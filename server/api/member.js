const router = require('express').Router()
const {Member} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const members = await Member.findAll()
    res.status(200).send(members)
  } catch (error) {
    next(error)
  }
})

module.exports = router
