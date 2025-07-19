import { Request, Response } from 'express'
import { userValidation } from '../models/user'
import { v4 } from 'uuid'

export default class AuthController {
  static auth(req: Request, res: Response) {
    const result = userValidation(req.body || {})
    if (result.error) {
      return res.status(400).json({ detail: JSON.parse(result.error.message) })
    }

    const uuid = v4()
    const response = {
      userId: uuid,
      username: result.data.username
    }

    return res.json({ status: 'ok', data: response })
  }
}
