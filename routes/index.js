const express = require('express');
const router = express.Router();
const posts = require('./posts')
const users = require('./users')
const sessions = require('./sessions')
const index = require('../controllers/index')

router.get('/', index)
router.use('/users', users)
router.use('/posts', posts)
router.use('/sessions', sessions)

module.exports = router
