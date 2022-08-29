import ServerContext from 'web/ServerContext'
import UserEntity from 'databases/entities/UserEntity'
import express from 'express'
import { } from 'express-session'
import { SessionModel } from 'web/SessionModel'
import { LoginRequest } from 'api/models/LoginRequest'
import { LoginResponse } from 'api/models/LoginResponse'
import { AuthInfoResponse } from 'api/models/AuthInfoResponse'
import { ApiResultResponse } from 'api/models/ApiResultResponse'
import { ChangePasswordRequest, ErrorCode } from 'api/models'

const router = express.Router()

declare module 'express-session' {
  interface SessionData extends SessionModel {
  }
}

router.post('/login', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const input = req.body as LoginRequest
  console.log("login request. account=" + input.account)

  try {
    const errorOutput = { success: false, redirectUrl: undefined } as LoginResponse

    if (input.account === undefined || input.account.length <= 0) {
      res.statusCode = 401
      res.json(errorOutput)
      return
    }

    const user = await ServerContext.dataSource.manager.findOneBy<UserEntity>(UserEntity, { account: input.account })
    if (user === undefined || user === null || user.account !== input.account || user.disabled) {
      res.statusCode = 401
      res.json(errorOutput)
      return
    }

    if (user.password === undefined || user.password === null || (user.password?.length ?? 0) === 0 || user.password !== input.password) {
      res.statusCode = 401
      res.json(errorOutput)
      return
    }

    req.session.loggedIn = true
    req.session.userId = user.id
    req.session.account = user.account
    const output = {
      success: true,
      redirectUrl: "/",
      loggedIn: true,
      userId: user.id,
      account: user.account,
      userType: user.userType
    } as LoginResponse
    console.log("login success. account=" + input.account + " ip=" + req.ip)
    res.json(output)
  }
  catch (ex) {
    res.statusCode = 500
    res.json({ success: false, status: 500, code: ErrorCode.ServerError } as ApiResultResponse)
  }
});

router.get('/info', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const output = { loggedIn: req.session?.loggedIn ?? false, userId: req.session?.userId, account: req.session?.account } as AuthInfoResponse
  if (!output.loggedIn) {
    res.status(401)
    res.json({})
    return
  }
  res.json(output)
});

router.post('/logout', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  req.session.loggedIn = false
  req.session.destroy(() => { })
  if (req.session?.cookie !== undefined) {
    req.session.cookie.expires = new Date(1980, 1, 1)
  }
  res.json({ success: true, code: "SUCCESS" } as ApiResultResponse)
});

function getAuthInfo(req: express.Request) {
  return { loggedIn: req.session?.loggedIn ?? false, userId: req.session?.userId, account: req.session?.account } as AuthInfoResponse
}

router.post('/change-password', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const input = req.body as ChangePasswordRequest

  const authInfo = getAuthInfo(req)

  const errorOutput = { success: false, status: 401, code: ErrorCode.Unauthorized } as ApiResultResponse

  if (!authInfo.loggedIn) {
    res.status(401)
    errorOutput.message = "Login required."
    res.json(errorOutput)
    return
  }

  try {
    const user = await ServerContext.dataSource.manager.findOneBy<UserEntity>(UserEntity, { account: authInfo.account })
    if (user === undefined || user === null || user.account !== authInfo.account || user.disabled) {
      res.statusCode = 500
      errorOutput.status = 500
      errorOutput.code = ErrorCode.ServerError
      errorOutput.message = "Invalid user."
      res.json(errorOutput)
      return
    }

    if (input.newPassword === undefined || input.newPassword === null || input.newPassword.length < 8) {
      res.statusCode = 400
      errorOutput.status = 400
      errorOutput.code = ErrorCode.BadRequest
      errorOutput.message = "Invalid password."
      res.json(errorOutput)
      return
    }

    if (user?.password !== input.oldPassword) {
      res.statusCode = 403
      errorOutput.status = 403
      errorOutput.code = ErrorCode.Forbidden
      errorOutput.message = "Invalid password."
      res.json(errorOutput)
      return
    }

    user.password = input.newPassword

    await ServerContext.dataSource.manager.save(user)

    const successOutput = { success: true, status: 200, code: ErrorCode.Success } as ApiResultResponse
    res.json(successOutput)
  }
  catch (ex) {
    res.statusCode = 500
    res.json({ success: false, status: 500, code: ErrorCode.ServerError } as ApiResultResponse)
  }
});

module.exports = router;
