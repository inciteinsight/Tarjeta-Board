const router = require('express').Router()
const {Member, Local} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const members = await Member.findAll()
    res.status(200).send(members)
  } catch (error) {
    next(error)
  }
})

router.get('/active', async (req, res, next) => {
  try {
    const members = await Member.findAll({
      where: {
        isActive: true
      }
    })
    res.status(200).send(members)
  } catch (error) {
    next(error)
  }
})

router.get('/local/:localId', async (req, res, next) => {
  try {
    const {localId} = req.params
    const members = await Member.findAll({
      where: {localId}
    })
    res.status(200).send(members)
  } catch (error) {
    next(error)
  }
})

router.get('/local/:localId/ext', async (req, res, next) => {
  try {
    const {localId} = req.params
    const parentLocal = await Local.findOne({
      where: {
        id: localId
      },
      include: [
        {model: Member},
        {
          model: Local,
          as: 'Extensions',
          include: [Member]
        }
      ]
    })
    const {Extensions} = parentLocal
    let {members} = parentLocal
    Extensions.forEach(e => {
      members = members.concat(e.members)
    })
    res.status(200).send(members)
  } catch (error) {
    next(error)
  }
})

router.get('/local/:localId/ext&active', async (req, res, next) => {
  try {
    const {localId} = req.params
    const parentLocal = await Local.findOne({
      where: {
        id: localId
      },
      include: [
        {model: Member},
        {
          model: Local,
          as: 'Extensions',
          include: [Member]
        }
      ]
    })
    const {Extensions} = parentLocal
    let {members} = parentLocal
    Extensions.forEach(e => {
      members = members.concat(e.members)
    })
    members = members.filter(m => m.isActive)
    res.status(200).send(members)
  } catch (error) {
    next(error)
  }
})

router.get('/local/:localId/active', async (req, res, next) => {
  try {
    const {localId} = req.params
    const members = await Member.findAll({
      where: {
        isActive: true,
        localId
      }
    })
    res.status(200).send(members)
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

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    let member = await Member.findByPk(id)
    await member.destroy()
    res.status(200)
  } catch (error) {
    next(error)
  }
})

module.exports = router
