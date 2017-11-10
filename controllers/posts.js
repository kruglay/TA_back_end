const Post = require('../models/post');

exports.index = function(req, res, next) {
  console.log('get posts');
  let orders = req.query.orders.split(',').map(Number)
  console.log(orders)
  Post.find({order: {$in: orders}})
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
  if(!res.locals.isAuthenticate) {
    let alert = 'Only authenticated person can add post'
    return res.render('posts/new', { alert })
  }
  const {text, title} = req.body
  let post = {
    text,
    title,
    user: req.user
  }
  Post
    .create(post)
    .then(res.redirect('/posts'))
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

