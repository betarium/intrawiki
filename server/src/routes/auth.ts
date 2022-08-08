import ServerContext from 'common/ServerContext'
import { UserEntity } from 'databases/entities/UserEntity'
import express from 'express'
import { } from 'express-session'

const router = express.Router()

interface LoginRequest {
  account: string
  password: string
}

export interface LoginResponse {
  success: boolean
  redirectUrl?: string
}

interface AuthInfoResponse {
  loggedIn: boolean
  userId?: number
  account?: string
}

export interface SessionModel {
  loggedIn?: boolean
  userId?: number
  account?: string
}

declare module 'express-session' {
  interface SessionData extends SessionModel {
  }
}

router.post('/login', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const input = req.body as LoginRequest
  console.log("login request. account=" + input.account)

  const user = await ServerContext.dataSource.manager.findOneBy<UserEntity>(UserEntity, { account: input.account })
  if (user !== undefined && user !== null) {
    if ((user.password?.length ?? 0) > 0 && user?.password === input.password) {
      req.session.userId = user.id
      req.session.account = user.account
      const output = { success: true, redirectUrl: "/" } as LoginResponse
      console.log("login success. account=" + input.account + " ip=" + req.ip)
      res.json(output)
      return
    }
  }

  const output = { success: false, redirectUrl: undefined } as LoginResponse
  res.json(output)
});

router.get('/info', async function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const output = { loggedIn: req.session?.loggedIn ?? false, userId: req.session?.userId, account: req.session?.account } as AuthInfoResponse
  res.json(output)
});

module.exports = router;
