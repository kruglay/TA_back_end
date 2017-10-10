const express = require('express')
const router = express.Router()
const controller = require('controllers/users')

// routes for users
router.get('/', controller.get)
router.post('/new', controller.create)
router.get('/new', controller.new)
router.get('/:username', controller.show)

module.exports = router;
