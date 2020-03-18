const router = require('express').Router()
const {Local, Schedule, User} = require('../db/models')

router.get('/user/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const {locals} = await User.findOne({
      where: {id},
      include: [
        {
          model: Local,
          include: [Schedule]
        }
      ]
    })
    res.status(200).send(locals)
  } catch (error) {
    next(error)
  }
})

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

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const locals = await Local.findOne({
      where: {id},
      include: [{model: Schedule}]
    })
    res.status(200).json(locals)
  } catch (error) {
    next(error)
  }
})

module.exports = router
