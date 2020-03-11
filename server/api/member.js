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

// router.get('/active', async (req, res, next) => {
//   try {
//     const members = await Member.findAll({
//       where: {
//         isActive: true
//       }
//     })
//     res.status(200).send(members)
//   } catch (error) {
//     next(error)
//   }
// })

router.put('/active/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    let member = await Member.findByPk(id)
    member.isActive = !member.isActive
    await member.save()
    res.status(200).send(member)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    let member = await Member.findByPk(id)
    res.status(200).send(member)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const {body} = req
    const {id} = body
    const member = await Member.findByPk(id)
    const updatedMember = await member.update(body)
    res.status(200).send(updatedMember)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {body} = req
    const {id} = body
    let member = await Member.findByPk(id)
    if (!member) {
      member = await Member.create(body)
      res.status(200).send(member)
    } else {
      res.status(409).send(member)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
