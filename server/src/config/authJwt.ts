import { AuthPayload } from '../models/jwt'
import { SECRET_KEY } from './environments'
import jwt from 'jsonwebtoken'

class AuthJwt {
  private static instance: AuthJwt
  private jwtSecret: string
  // private readonly jwtExpiredIn = '1y'

  private constructor() {
    this.jwtSecret = SECRET_KEY!
  }

  signToken(payload: AuthPayload) {
    return jwt.sign(payload, this.jwtSecret)
  }

  verifyToken(token: string) {
    try {
      const decodedToken = jwt.verify(token, this.jwtSecret) as AuthPayload
      return decodedToken
    } catch {
      return null
    }
  }

  public static getInstance() {
    if (!AuthJwt.instance) {
      return AuthJwt.instance = new AuthJwt()
    }

    return AuthJwt.instance
  }
}

export const authJwt = AuthJwt.getInstance()
