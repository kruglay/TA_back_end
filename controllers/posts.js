const Post = require('../models/post');

exports.index = function(req, res, next) {
  console.log('get posts');
  Post.find({})
    .then((docs) => {
      console.log(docs);
      res.render('posts/index', { title: 'test posts', posts: docs })
    })
    .catch((err) => { console.err(err) })
}

exports.new = function(req, res, next) {
  console.log('get posts');
  let alert = ''
  if(!res.isAuthenticate) {
    alert = 'Only authenticated person can add post'
  }
  res.render('posts/new', { alert })
}

exports.create = function(req, res, next) {
  if(!res.isAuthenticate) {
    let alert = 'Only authenticated person can add post'
    res.render('/posts/new', { alert })
  }
  const {text, title, user} = req.body
  let post = {
    text,
    title,
    user
  }
  Post
    .create(post)
    .then(res.redirect('/posts/index'))
    .catch((err)=>{
      next(err)
    })
}

exports.delete = function(req, res, next) {
  if(!res.isAuthenticate) {
    let alert = 'Only authenticated person can add post'
    res.render('/posts/new', { alert })
  }
  let params = req.body
  Post.findByIdAndRemove(params.id).exec()
    .catch(err=>next(err))
}

