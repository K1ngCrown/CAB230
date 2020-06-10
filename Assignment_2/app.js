var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var stockRouter = require('./routes/stocks');
var userRouter = require('./routes/user');

var app = express();

// Swagger
const swaggerUI = require('swagger-ui-express');
yaml = require('yamljs');
swaggerDocument = yaml.load('./swagger.yaml');

// CORS / Helmet
const helmet = require('helmet');
const cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use(logger('common'));
app.use(helmet());
app.use(cors());

// Logger
// ADD THIS

logger.token('req', (req, res) => JSON.stringify(req.headers))
logger.token('res', (req, res) => {
  const headers = {}
  res.getHeaderNames().map(h => headers[h] = res.getHeader(h))
  return JSON.stringify(headers)
})

// Knex
const options = require('./knexfile.js');
const knex = require('knex')(options);
app.use((req, res, next) => {
  req.db = knex
  next()
})

app.use('/', indexRouter);
app.use('/stocks', stockRouter);
app.use('/user', userRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
