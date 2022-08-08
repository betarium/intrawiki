var createError = require('http-errors');
import CommonConfig from 'common/CommonConfig';
import express from 'express';
import session from 'express-session'
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const pageRouter = require('./routes/page');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(CommonConfig.PUBLIC_DIR));
app.use(session({
  secret: process.env.SESSION_SECRET ?? 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: (CommonConfig.NODE_ENV === 'production'),
    maxAge: 1000 * 60 * 60 * 24,
    path: "/"
  },
}));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/pages', pageRouter);

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
