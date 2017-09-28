const express = require('express');
const router = express.Router();
const Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('123');
  Post.find({})
    .then((docs) => {
      console.log(docs);
      res.render('index', { title: 'test posts', posts: docs })
    })
    .catch((err) => { console.err(err) })
});

module.exports = router;
