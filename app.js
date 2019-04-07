var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/messages');


var app = express();
require('./db');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/backend/', indexRouter);
app.use('/backend/users', usersRouter);
app.use('/backend/messages', messagesRouter);

app.use((req, res, next) => {
  //route not found
  next(createError(404, 'Page not found'));
})


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
