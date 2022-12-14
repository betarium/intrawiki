import { UserType } from 'api'
import { } from 'express-session'

export interface SessionModel {
  loggedIn?: boolean
  userId?: number
  account?: string
  userName?: string
  userType?: UserType
}

declare module 'express-session' {
  interface SessionData extends SessionModel {
  }
}
