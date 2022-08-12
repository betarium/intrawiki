import { } from 'express-session'

export interface SessionModel {
  loggedIn?: boolean
  userId?: number
  account?: string
}

declare module 'express-session' {
  interface SessionData extends SessionModel {
  }
}
