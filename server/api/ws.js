const router = require('express').Router()

module.exports = router

// router.get('/cache', (req, res, next) => {
//   try {
//     const ws = req.session.ws
//     res.json(ws)
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/cache/members', (req, res, next) => {
//   try {
//     const updateWs = req.body
//     req.session.ws.members = updateWs
//     res.json(req.session.ws)
//   } catch (error) {
//     next(error)
//   }
// })

// router.post('/cache/members', (req, res, next) => {
//   try {
//     const updateWs = req.body
//     req.session.ws.members = updateWs
//     res.json(req.session.ws)
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/cache/members', (req, res, next) => {
//   try {
//     req.session.ws.members = []
//     res.send()
//   } catch (error) {
//     next(error)
//   }
// })

// router.get('/cache/reset', (req, res, next) => {
//   try {
//     req.session.ws = {
//       currentDate: new Date(Date.now()).toISOString(),
//       members: []
//     }
//     res.json(req.session.ws)
//   } catch (error) {
//     next(error)
//   }
// })
