const express = require('express');
const router = express.Router();
const posts = require('./posts')
const users = require('./users')
const Post = require('../models/post');
const index = require('../controllers/index')

router.get('/', index)
router.use('/users', users)



// router.use('/posts', posts)

/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log('123');
//   Post.find({})
//     .then((docs) => {
//       console.log(docs);
//       res.render('index', { title: 'test posts', posts: docs })
//     })
//     .catch((err) => { console.err(err) })
// });

module.exports = router
