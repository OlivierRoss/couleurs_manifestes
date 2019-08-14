// TODO inclure statistiques d'utilisation
// (Savoir quelles oeuvres sont les plus populaires, dimensions, etc)
// Ajouter Sentry
// Creer un objet vue qui pourra etre appele directement de l'app ou par l'api /p/....
// Ajouter un favicone

if(process.env.NODE_ENV != 'production'){
  require('dotenv').config()
}
var Promise = require("bluebird");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
