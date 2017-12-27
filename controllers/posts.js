const Post = require('../models/post');

exports.index = function(req, res, next) {
  console.log('get posts');
  // Post.find({order: {$in: orders}})
  Post.find()
    .then((posts) => {
      console.log(posts);
      res.json(posts)
    })
    .catch((err) => { console.err(err) })
}

exports.new = function(req, res, next) {
  console.log('get posts');
  let alert = ''
  if(!res.locals.isAuthenticate) {
    alert = 'Only authenticated person can add post'
  }
  res.render('posts/new', { alert })
}

exports.create = function(req, res, next) {
  console.log('exports.create')
  if(!res.locals.isAuthenticate) {
    let alert = 'Only authenticated person can add post'
    return res.json({result: 'fail', error: 'Only authenticated person can add post'})
  }
  const {text, title} = req.body
  let post = {
    text,
    title,
    user: req.user
  }
  console.log(post)
  Post
    .create(post)
    .then(post => {
      if (!post) {
        return res.json({result: 'fail'})
      }
      res.json({
        result: 'success',
        info: {
          type: 'info',
          message: 'message added'
        }
      })
    })
    .catch((err)=>{
      next(err)
    })
}

exports.delete = function(req, res, next) {
  if(!res.isAuthenticate) {
    let alert = 'Only authenticated person can add post'
    res.render('posts/new', { alert })
  }
  let params = req.body
  Post.findByIdAndRemove(params.id).exec()
    .catch(err=>next(err))
}

