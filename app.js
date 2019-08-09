// TODO inclure statistiques d'utilisation
// (Savoir quelles oeuvres sont les plus populaires, dimensions, etc)

require('dotenv').config()
var Promise = require("bluebird");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
//var winston = require('winston'); TODO : utiliser

// TODO Activer seulement en production
//const Sentry = require('@sentry/node');
//Sentry.init({ dsn: 'https://cbd37e3223d8414a93121911083d1190@sentry.io/1505617'  });

var indexRouter = require('./routes/index');

var app = express();
// TODO Activer seulement en production
//app.use(Sentry.Handlers.requestHandler());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// TODO Activer seulement en production
//app.use(Sentry.Handlers.errorHandler());

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
