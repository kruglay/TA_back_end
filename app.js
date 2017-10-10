var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config')
var ejs = require('ejs')
var mongoose = require('./lib/mongoose')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);

var index = require('./routes/index');
var users = require('./routes/users');
var sessions = require('./routes/sessions')
var helpers = require('./middleware/helpers')
var loadUser = require('./middleware/loadUser')
var router = require('./routes/index')


var app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(helpers.addAlertMessage)
app.use(loadUser)
app.use(router)
// app.use('/', index);
// app.use('/users', users);
// app.use('/sessions', sessions);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.error(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
