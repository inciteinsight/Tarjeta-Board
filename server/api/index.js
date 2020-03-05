const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/ws', require('./ws'))
router.use('/cache', require('./cache'))
router.use('/member', require('./member'))
router.use('/congregation', require('./local'))
router.use('/reporting', require('./reporting'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
