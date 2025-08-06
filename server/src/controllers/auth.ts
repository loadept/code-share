import { Request, Response } from 'express'
import { userValidation } from '../schemas/user'
import { generateUUID } from '../utils/uuid'
import { authJwt } from '../config/authJwt'

export default class AuthController {
  auth(req: Request, res: Response) {
    const result = userValidation(req.body || {})
    if (result.error) {
      const errMessage =  result.error.issues.flatMap(err => err.message)
      return res.status(400).json({ error: 'Validation error', details: errMessage })
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
