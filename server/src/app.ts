import createError from 'http-errors'
import CommonConfig from 'common/CommonConfig';
import express from 'express';
import session from 'express-session'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { SessionModel } from 'web/SessionModel';
import sessionFileStore from 'session-file-store'

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const pageRouter = require('./routes/page');
const publicRouter = require('./routes/public');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(CommonConfig.PUBLIC_DIR));
app.set('view engine', 'pug')
app.set('views', CommonConfig.PUBLIC_DIR)

const FileStore = sessionFileStore(session)

app.use(session({
  secret: CommonConfig.SESSION_SECRET ?? 'secret',
  store: new FileStore({ path: CommonConfig.SESSION_PATH }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: (CommonConfig.NODE_ENV === 'production'),
    maxAge: 1000 * 60 * 60 * 24,
    path: "/"
  },
}));

app.use(function (req, res, next) {
  if (req.path.startsWith("/static/")) {
    res.setHeader('cache-control', 'public, max-age=' + (60 * 60 * 24 * 7))
    return next()
  }

  res.setHeader('cache-control', 'no-store')
  return next()
})

function isIndexPage(path: string): boolean {
  const publicPage = [
    "/",
    "/index.html",
    "/intrawiki-manage/login",
    "/intrawiki-manage/logout",
    "/intrawiki-manage/error",
    "/intrawiki-manage/edit",
  ]

  if (publicPage.find(p => p === path) !== undefined) {
    return true
  }

  return false
}

function isPublicResource(path: string): boolean {
  const publicResource = [
    "/favicon.ico",
    "/asset-manifest.json",
    "/logo192.png",
    "/logo512.png",
    "/manifest.json",
    "/robots.txt",
  ]

  if (publicResource.find(p => p === path) !== undefined) {
    return true
  }

  return false
}

function isPublicUrl(path: string): boolean {
  if (isIndexPage(path)) {
    return true
  }

  if (isPublicResource(path)) {
    return true
  }

  const publicPath = [
    "/",
    "/intrawiki-manage/login",
    "/intrawiki-manage/logout",
    "/intrawiki-manage/api/auth/info",
    "/intrawiki-manage/api/auth/login",
    "/intrawiki-manage/api/auth/logout",
  ]

  const publicDir = [
    "/intrawiki-manage/api/public/",
    "/static/",
  ]

  if (publicPath.find(p => p === path) !== undefined) {
    return true
  }
  else if (publicDir.find(p => path.startsWith(p)) !== undefined) {
    return true
  }

  return false
}

declare module 'express-session' {
  interface SessionData extends SessionModel {
  }
}

app.use(function (req, res, next) {
  if (isIndexPage(req.path)) {
    res.setHeader('cache-control', 'no-store')
    res.sendFile(CommonConfig.PUBLIC_DIR + "/index.html");
  }
  else if (isPublicResource(req.path)) {
    res.sendFile(CommonConfig.PUBLIC_DIR + req.path);
  }
  else {
    return next()
  }
})

app.use(function (req, res, next) {
  console.debug("access. path=" + req.path + " ip=" + req.ip + " ua=" + req.headers["user-agent"])

  if (isPublicUrl(req.path)) {
    return next()
  }
  else if (req.session.userId === undefined) {
    console.info("Unauthorized access. path=" + req.path)
    if (req.path.startsWith("/intrawiki-manage/api/")) {
      res.statusMessage = "Unauthorized"
      res.sendStatus(401)
    }
    else {
      res.setHeader('cache-control', 'no-store')
      res.sendFile(CommonConfig.PUBLIC_DIR + "/index.html");
    }
  }
  else {
    return next()
  }
})

app.use('/', indexRouter);
app.use('/intrawiki-manage/api/users', usersRouter);
app.use('/intrawiki-manage/api/auth', authRouter);
app.use('/intrawiki-manage/api/pages', pageRouter);
app.use('/', publicRouter);

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

  if (req.path.startsWith("/intrawiki-manage/api/")) {
    res.send('"error"')
    return
  }

  if (res.statusCode === 404) {
    res.setHeader('cache-control', 'no-store')
    res.sendFile(CommonConfig.PUBLIC_DIR + "/index.html");
    return
  }
  else if (res.statusCode === 401) {
    res.setHeader('cache-control', 'no-store')
    res.sendFile(CommonConfig.PUBLIC_DIR + "/index.html");
    return
  }
  else {
    res.send('"error"')
    return
  }
});

module.exports = app;
