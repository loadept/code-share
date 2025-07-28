import { Request, Response } from 'express'
import { userValidation } from '../models/user'
import { generateUUID } from '../utils/uuid'
import { authJwt } from '../config/authJwt'

export default class AuthController {
  auth(req: Request, res: Response) {
    const result = userValidation(req.body || {})
    if (result.error) {
      return res.status(400).json({ detail: JSON.parse(result.error.message) })
    }

    const uuid = generateUUID()
    const authPayload = {
      userId: uuid,
      username: result.data.username
    }
    const jwt = authJwt.signToken(authPayload)

    return res.json({
      status: 'ok',
      message: 'Complete authentication',
      data: {
        userId: uuid,
        username: result.data.username
      },
      accessToken: jwt
    })
  }
}
