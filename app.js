require('./db');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var cors = require('cors')
// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/messages');
var app = express();



app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(express.static(path.join(__dirname, 'public')));

// app.use('/backend/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

app.use((req, res, next) => {
  //route not found
  debugger;
  next(createError(404, 'Page not found'));
})


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
