var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var middleware = require('./config/middleware.js');
var passportConfig = require('./config/passport.js')(passport);
var flash = require('connect-flash');
var locals_variables = middleware.locals_variables;

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var preguntas = require('./routes/preguntas');
var logout = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//required for passport
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', locals_variables,index);
app.use('/users',  locals_variables, users);
app.use('/login',  middleware.isNotLoggedIn,   locals_variables, login);
app.use('/preguntas',  locals_variables, preguntas);
app.use('/logout', middleware.isLoggedIn, locals_variables, logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
