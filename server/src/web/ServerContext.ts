import { DefaultDataSource } from "databases/DefaultDataSource"
import { DataSource } from "typeorm"
import { SessionModel } from "./SessionModel"
import express from 'express'

declare module 'express-session' {
  interface SessionData extends SessionModel {
  }
}

class ServerContextImpl {
  public get dataSource(): DataSource {
    return DefaultDataSource
  }

  public getSession(req: express.Request): SessionModel {
    const loggedIn = req.session?.loggedIn ?? false
    if (!loggedIn) {
      return {
        loggedIn: loggedIn,
      } as SessionModel
    }

    return {
      loggedIn: loggedIn,
      userId: req.session?.userId,
      account: req.session?.account,
      userName: req.session?.userName,
      userType: req.session?.userType,
    } as SessionModel
  }
}

const ServerContext = new ServerContextImpl()

export default ServerContext
