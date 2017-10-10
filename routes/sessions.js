const router = require('express').Router()
const controller = require('controllers/sessions')

router.get('/new', controller.new)

router.post('/new', controller.create)

router.post('/destroy', controller.delete)

module.exports = router