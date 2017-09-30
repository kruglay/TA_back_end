module.exports = (req, res, next) => {
  // console.log('indexPage', res)
  res.render('index', { title: 'index'})
}