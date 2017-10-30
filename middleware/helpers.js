module.exports = {
  addAlertMessage(req, res, next) {
    res.locals.alert = ''
    next()
  },
  methodOptions(req, res, next) {
    if (req.method === 'OPTIONS') {
      res.set({
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': 86400
      })
      res.status(200)
      res.send()
    }
    next()
  },
  anyRequest(req, res, next) {
    let origin = req.get('Origin')
    if(req.get('Origin') !== undefined) {
      res.set('Access-Control-Allow-Origin',origin)
    }
    next()
  }
}