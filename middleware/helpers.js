module.exports = {
  addAlertMessage(req, res, next) {
    res.locals.alert = ''
    next()
  }
}