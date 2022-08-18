import ServerContext from 'web/ServerContext'
import UserEntity from 'databases/entities/UserEntity'
import express from 'express'
import { } from 'express-session'
import { SessionModel } from 'web/SessionModel'
import { LoginRequest } from 'api/models/LoginRequest'
import { LoginResponse } from 'api/models/LoginResponse'
import { AuthInfoResponse } from 'api/models/AuthInfoResponse'
import { ApiResultResponse } from 'api/models/ApiResultResponse'

const router = express.Router()

/*
interface LoginRequest {
  account: string
  password: string
}

interface AuthInfoResponse {
  loggedIn: boolean
  userId?: number
  account?: string
}

export interface LoginResponse extends AuthInfoResponse {
  success: boolean
  redirectUrl?: string
}
*/

declare module 'express-session' {
  interface SessionData extends SessionModel {
  }
}

router.post('/login', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const input = req.body as LoginRequest
  console.log("login request. account=" + input.account)

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

  if ((user.password?.length ?? 0) > 0 && user?.password === input.password) {
    req.session.loggedIn = true
    req.session.userId = user.id
    req.session.account = user.account
    const output = { success: true, redirectUrl: "/", loggedIn: true, userId: user.id, account: user.account } as LoginResponse
    console.log("login success. account=" + input.account + " ip=" + req.ip)
    res.json(output)
    return
  }

  res.statusCode = 401
  res.json(errorOutput)
});

router.get('/info', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const output = { loggedIn: req.session?.loggedIn ?? false, userId: req.session?.userId, account: req.session?.account } as AuthInfoResponse
  if (!output.loggedIn) {
    res.status(204)
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

module.exports = router;
